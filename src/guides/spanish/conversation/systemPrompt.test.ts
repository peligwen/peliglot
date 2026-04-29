/**
 * Tests for the system prompt builder.
 */

import { describe, it, expect } from 'vitest';
import { systemPromptFor, ENGLISH_HELP_REQUEST } from './systemPrompt';
import type { ConversationLevel } from './systemPrompt';

describe('systemPromptFor', () => {
  const levels: ConversationLevel[] = ['beginner', 'intermediate', 'advanced'];

  it('returns a non-empty string for every level', () => {
    for (const level of levels) {
      expect(systemPromptFor(level).length).toBeGreaterThan(0);
    }
  });

  it('all prompts mention Spanish', () => {
    for (const level of levels) {
      expect(systemPromptFor(level).toLowerCase()).toContain('spanish');
    }
  });

  it('all prompts mention Mexican Spanish', () => {
    for (const level of levels) {
      expect(systemPromptFor(level).toLowerCase()).toContain('mexican');
    }
  });

  it('all prompts mention the [help]: nudge mechanism', () => {
    for (const level of levels) {
      expect(systemPromptFor(level)).toContain('[help]:');
    }
  });

  it('beginner prompt mentions simple vocabulary', () => {
    expect(systemPromptFor('beginner').toLowerCase()).toContain('simple');
  });

  it('advanced prompt differs from beginner prompt', () => {
    expect(systemPromptFor('advanced')).not.toBe(systemPromptFor('beginner'));
  });

  it('produces different prompts for each level', () => {
    const prompts = levels.map(l => systemPromptFor(l));
    const unique = new Set(prompts);
    expect(unique.size).toBe(levels.length);
  });
});

describe('ENGLISH_HELP_REQUEST', () => {
  it('is a non-empty string', () => {
    expect(typeof ENGLISH_HELP_REQUEST).toBe('string');
    expect(ENGLISH_HELP_REQUEST.length).toBeGreaterThan(0);
  });

  it('mentions English', () => {
    expect(ENGLISH_HELP_REQUEST.toLowerCase()).toContain('english');
  });

  it('mentions Spanish', () => {
    expect(ENGLISH_HELP_REQUEST.toLowerCase()).toContain('spanish');
  });
});
