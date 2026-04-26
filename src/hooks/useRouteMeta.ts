import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL } from '../config/site';

export interface RouteMetaProps {
  title: string;
  description: string;
  /** og:image URL. Phase 1.3 fills this; leave undefined in Phase 1.2. */
  ogImage?: string;
  /** Canonical URL path (no origin). Defaults to current pathname. */
  canonical?: string;
  /**
   * JSON-LD structured data. One or many objects — each emits its own <script>.
   *
   * Caller contract: pass a stable reference (memoize with `useMemo` if the
   * value is computed inside the component). The hook compares by identity,
   * not by content, to avoid re-stringifying large payloads on every render.
   */
  jsonLd?: object | object[];
  /** og:type. Defaults to 'website'. */
  type?: 'website' | 'article';
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getMeta(selector: string): HTMLMetaElement | null {
  return document.querySelector<HTMLMetaElement>(selector);
}

function ensureMeta(selector: string, attrName: string, attrValue: string): HTMLMetaElement {
  let el = getMeta(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  return el;
}

function setMetaContent(selector: string, attrName: string, attrValue: string, content: string): void {
  ensureMeta(selector, attrName, attrValue).setAttribute('content', content);
}

function setCanonical(href: string): void {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Imperatively updates document <head> meta for the current route.
 *
 * - Sets <title>, description, OG tags, Twitter card tags, and canonical link.
 * - Injects JSON-LD <script> tags tagged with data-route-meta-jsonld="1".
 *
 * Cleanup contract: only the JSON-LD scripts this effect inserted are removed
 * on unmount or dep change. Title and meta values are NOT restored — they're
 * overwritten by the next route's effect. Every route is therefore expected
 * to call useRouteMeta; the catch-all 404 route fulfills this for unmatched
 * paths. (We deliberately dropped restore-on-cleanup to avoid the snapshot
 * race that occurs if two consumers ever mount simultaneously, e.g. a route +
 * a portal modal.)
 */
export function useRouteMeta({
  title,
  description,
  ogImage,
  canonical,
  jsonLd,
  type = 'website',
}: RouteMetaProps): void {
  const { pathname } = useLocation();
  const canonicalHref = canonical
    ? `${SITE_URL}${canonical}`
    : `${SITE_URL}${pathname}`;

  useEffect(() => {
    document.title = title;

    setMetaContent('meta[name="description"]', 'name', 'description', description);

    setMetaContent('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaContent('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaContent('meta[property="og:type"]', 'property', 'og:type', type);
    setMetaContent('meta[property="og:url"]', 'property', 'og:url', canonicalHref);

    const twitterCardType = ogImage ? 'summary_large_image' : 'summary';
    setMetaContent('meta[name="twitter:card"]', 'name', 'twitter:card', twitterCardType);
    setMetaContent('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaContent('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    if (ogImage) {
      setMetaContent('meta[property="og:image"]', 'property', 'og:image', ogImage);
      setMetaContent('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);
    }

    setCanonical(canonicalHref);

    // -----------------------------------------------------------------------
    // JSON-LD: inject one <script> per item, tagged for cleanup.
    //
    // SECURITY: must use textContent (NOT innerHTML). With textContent the
    // browser stores the JSON as character data, so any "</script>" inside a
    // string value cannot terminate the script tag. If you switch to
    // innerHTML, also add a sanitizer like
    //   .replace(/<\/script/gi, '<\\/script')
    // before assignment, otherwise JSON-LD becomes an XSS vector the moment
    // any string field is sourced from user input.
    // -----------------------------------------------------------------------
    const insertedScripts: HTMLScriptElement[] = [];
    if (jsonLd != null) {
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      for (const item of items) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-route-meta-jsonld', '1');
        script.textContent = JSON.stringify(item);
        document.head.appendChild(script);
        insertedScripts.push(script);
      }
    }

    return () => {
      // Only clean up JSON-LD scripts we added — meta tags persist until the
      // next route overwrites them. See cleanup contract above.
      for (const script of insertedScripts) {
        script.parentNode?.removeChild(script);
      }
    };
  }, [title, description, ogImage, canonicalHref, type, jsonLd]);
}
