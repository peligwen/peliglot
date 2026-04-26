import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_ORIGIN = 'https://peliglot.com';

export interface RouteMetaProps {
  title: string;
  description: string;
  /** og:image URL. Phase 1.3 fills this; leave undefined in Phase 1.2. */
  ogImage?: string;
  /** Canonical URL path (no origin). Defaults to current pathname. */
  canonical?: string;
  /** JSON-LD structured data. One or many objects — each emits its own <script>. */
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

function getMetaContent(selector: string): string {
  return getMeta(selector)?.getAttribute('content') ?? '';
}

function setMetaContent(selector: string, attrName: string, attrValue: string, content: string): void {
  ensureMeta(selector, attrName, attrValue).setAttribute('content', content);
}

function getCanonicalHref(): string {
  return document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.getAttribute('href') ?? '';
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
 * - On unmount (or dep change), restores the previous values.
 * - Does NOT react to hash changes — only to prop changes.
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
    ? `${SITE_ORIGIN}${canonical}`
    : `${SITE_ORIGIN}${pathname}`;

  // Stable JSON-LD dep — avoids infinite re-run if callers pass fresh object literals.
  const jsonLdKey = jsonLd != null ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    // -----------------------------------------------------------------------
    // Capture previous values before mutating
    // -----------------------------------------------------------------------
    const prevTitle = document.title;
    const prevDesc = getMetaContent('meta[name="description"]');
    const prevOgTitle = getMetaContent('meta[property="og:title"]');
    const prevOgDesc = getMetaContent('meta[property="og:description"]');
    const prevOgType = getMetaContent('meta[property="og:type"]');
    const prevOgUrl = getMetaContent('meta[property="og:url"]');
    const prevOgImage = getMetaContent('meta[property="og:image"]');
    const prevTwCard = getMetaContent('meta[name="twitter:card"]');
    const prevTwTitle = getMetaContent('meta[name="twitter:title"]');
    const prevTwDesc = getMetaContent('meta[name="twitter:description"]');
    const prevTwImage = getMetaContent('meta[name="twitter:image"]');
    const prevCanonical = getCanonicalHref();

    // -----------------------------------------------------------------------
    // Apply new values
    // -----------------------------------------------------------------------
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
    // JSON-LD: inject one <script> per item, tagged for cleanup
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

    // -----------------------------------------------------------------------
    // Cleanup: restore previous values when deps change or component unmounts
    // -----------------------------------------------------------------------
    return () => {
      document.title = prevTitle;

      setMetaContent('meta[name="description"]', 'name', 'description', prevDesc);

      setMetaContent('meta[property="og:title"]', 'property', 'og:title', prevOgTitle);
      setMetaContent('meta[property="og:description"]', 'property', 'og:description', prevOgDesc);
      setMetaContent('meta[property="og:type"]', 'property', 'og:type', prevOgType);
      setMetaContent('meta[property="og:url"]', 'property', 'og:url', prevOgUrl);

      setMetaContent('meta[name="twitter:card"]', 'name', 'twitter:card', prevTwCard);
      setMetaContent('meta[name="twitter:title"]', 'name', 'twitter:title', prevTwTitle);
      setMetaContent('meta[name="twitter:description"]', 'name', 'twitter:description', prevTwDesc);

      if (prevOgImage) {
        setMetaContent('meta[property="og:image"]', 'property', 'og:image', prevOgImage);
      }
      if (prevTwImage) {
        setMetaContent('meta[name="twitter:image"]', 'name', 'twitter:image', prevTwImage);
      }

      if (prevCanonical) {
        setCanonical(prevCanonical);
      }

      // Remove only the scripts WE inserted — don't broad-sweep the DOM
      for (const script of insertedScripts) {
        script.parentNode?.removeChild(script);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, ogImage, canonicalHref, type, jsonLdKey]);
}
