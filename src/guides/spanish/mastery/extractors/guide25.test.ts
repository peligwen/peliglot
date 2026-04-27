import { describe, it, expect } from 'vitest';
import { extract } from './guide25';

describe('guide25 extractor (false-cognate + sentence-correction)', () => {
  const cards = extract();

  it('(a) returns a non-empty array', () => {
    expect(cards.length).toBeGreaterThan(0);
  });

  it('(b) card count is 22 (15 false-cognate + 7 sentence-correction)', () => {
    expect(cards.length).toBe(22);
  });

  it('(c) all cardIds are unique within the extractor', () => {
    const ids = cards.map(c => c.cardId);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('(d) prompt.kind matches card.kind for every card', () => {
    for (const card of cards) {
      expect(card.prompt.kind).toBe(card.kind);
    }
  });

  it('(e) 15 cards have kind "false-cognate"', () => {
    const cogCards = cards.filter(c => c.kind === 'false-cognate');
    expect(cogCards.length).toBe(15);
    for (const card of cogCards) {
      expect(card.kind).toBe('false-cognate');
    }
  });

  it('(f) answer is non-empty for every card', () => {
    for (const card of cards) {
      expect(card.answer.length).toBeGreaterThan(0);
    }
  });

  it('(g) guideSlug is "spanish" and guideId is 25 for all cards', () => {
    for (const card of cards) {
      expect(card.guideSlug).toBe('spanish');
      expect(card.guideId).toBe(25);
    }
  });

  it('(h) spot-check: "embarazada" → "pregnant"', () => {
    const card = cards.find(c => c.cardId === 'spanish-25-embarazada');
    expect(card).toBeDefined();
    expect(card?.answer).toBe('pregnant');
    expect((card?.prompt as { falseFriend: string }).falseFriend).toBe('embarrassed');
  });

  it('(i) spot-check: "molestar" → "to bother/annoy" with alternates', () => {
    const card = cards.find(c => c.cardId === 'spanish-25-molestar');
    expect(card).toBeDefined();
    expect(card?.answer).toBe('to bother/annoy');
    expect(card?.acceptableAnswers).toContain('to bother');
    expect(card?.acceptableAnswers).toContain('to annoy');
  });

  it('(j) spot-check: "realizar" → has alternates for slash-separated meaning', () => {
    const card = cards.find(c => c.cardId === 'spanish-25-realizar');
    expect(card).toBeDefined();
    expect(card?.acceptableAnswers).toBeDefined();
    expect(card?.acceptableAnswers!.length).toBeGreaterThan(0);
  });

  it('(k) spot-check: "éxito" → "success"', () => {
    const card = cards.find(c => c.cardId === 'spanish-25-exito');
    expect(card).toBeDefined();
    expect(card?.answer).toBe('success');
  });

  it('(l) every false-cognate prompt has non-empty spanish and falseFriend fields', () => {
    const cogCards = cards.filter(c => c.kind === 'false-cognate');
    for (const card of cogCards) {
      const prompt = card.prompt as { spanish: string; falseFriend: string };
      expect(prompt.spanish.length).toBeGreaterThan(0);
      expect(prompt.falseFriend.length).toBeGreaterThan(0);
    }
  });

  it('(m) sentence-correction card count is 7', () => {
    const trapCards = cards.filter(c => c.kind === 'sentence-correction');
    expect(trapCards.length).toBe(7);
  });

  it('(n) sentence-correction cardIds use "trap-" prefix and are unique', () => {
    const trapCards = cards.filter(c => c.kind === 'sentence-correction');
    for (const card of trapCards) {
      expect(card.cardId).toMatch(/^spanish-25-trap-/);
    }
    const ids = trapCards.map(c => c.cardId);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('(o) spot-check: "Yo soy 25 años" trap → "Tengo 25 años"', () => {
    const card = cards.find(
      c => c.kind === 'sentence-correction' && (c.prompt as { wrong: string }).wrong === 'Yo soy 25 años',
    );
    expect(card).toBeDefined();
    expect(card?.answer).toBe('Tengo 25 años');
    expect((card?.prompt as { explanation?: string }).explanation).toBeTruthy();
  });

  it('(p) all sentence-correction cards have a non-empty answer and wrong prompt field', () => {
    const trapCards = cards.filter(c => c.kind === 'sentence-correction');
    for (const card of trapCards) {
      expect(card.answer.length).toBeGreaterThan(0);
      const prompt = card.prompt as { wrong: string };
      expect(prompt.wrong.length).toBeGreaterThan(0);
    }
  });
});
