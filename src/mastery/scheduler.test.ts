import { describe, it, expect } from 'vitest';
import { createCard, rateCard, Rating } from './scheduler';

const DAY = 24 * 60 * 60 * 1000; // ms per day
const NOW = Date.now();

describe('createCard', () => {
  it('returns a card with zero reps and lapses', () => {
    const card = createCard();
    expect(card.reps).toBe(0);
    expect(card.lapses).toBe(0);
  });

  it('returns a card with null lastReview', () => {
    const card = createCard();
    expect(card.lastReview).toBeNull();
  });

  it('returns a card due immediately (or very recently)', () => {
    const card = createCard();
    // New cards are due at creation time; allow a 1-second tolerance.
    expect(card.due).toBeLessThanOrEqual(NOW + 1000);
  });
});

describe('rateCard — Good / Easy advance due monotonically', () => {
  it('Good rating advances due beyond now', () => {
    const card = createCard();
    const rated = rateCard(card, Rating.Good, NOW);
    expect(rated.due).toBeGreaterThan(NOW);
  });

  it('Easy rating advances due further than Good', () => {
    const card = createCard();
    const good = rateCard(card, Rating.Good, NOW);
    const easy = rateCard(card, Rating.Easy, NOW);
    expect(easy.due).toBeGreaterThan(good.due);
  });

  it('successive Good ratings advance due monotonically', () => {
    let card = createCard();
    let prevDue = card.due;
    // Step through several Good ratings, advancing time each review.
    let t = NOW;
    for (let i = 0; i < 5; i++) {
      card = rateCard(card, Rating.Good, t);
      expect(card.due).toBeGreaterThan(prevDue);
      prevDue = card.due;
      t = card.due; // next review happens exactly when the card is due
    }
  });

  it('rateCard does not mutate the original card', () => {
    const original = createCard();
    const originalDue = original.due;
    rateCard(original, Rating.Good, NOW);
    expect(original.due).toBe(originalDue);
  });
});

describe('rateCard — Again resets or shortens interval', () => {
  it('Again on a new card keeps due within the near future (step-based)', () => {
    const card = createCard();
    const rated = rateCard(card, Rating.Again, NOW);
    // In FSRS step-based learning, Again on a New card schedules a short retry
    // (typically 1 minute). Due should be < 1 day away.
    expect(rated.due - NOW).toBeLessThan(DAY);
  });

  it('Again on a graduated card schedules a much shorter next interval than Good', () => {
    // Advance card to Review state through a sequence of Good ratings.
    let card = createCard();
    let t = NOW;
    // Need enough Goods to graduate past Learning into Review state (fsrsState === 2).
    for (let i = 0; i < 6; i++) {
      card = rateCard(card, Rating.Good, t);
      t = card.due;
    }
    expect(card.fsrsState).toBe(2); // Review state

    // Rate the same card with Again and Good from the same review time t.
    const withAgain = rateCard(card, Rating.Again, t);
    const withGood  = rateCard(card, Rating.Good,  t);

    // Again must schedule a shorter retry than Good — the whole point of Again
    // is a fast re-study loop, not a multi-day interval.
    expect(withAgain.due).toBeLessThan(withGood.due);

    // Specifically: Again on a graduated card should be within 1 day.
    expect(withAgain.due - t).toBeLessThan(DAY);
  });

  it('Again increments lapses only after the card has graduated to Review', () => {
    // New cards in Learning state do NOT increment lapses on Again.
    const newCard = createCard();
    const againNew = rateCard(newCard, Rating.Again, NOW);
    expect(againNew.lapses).toBe(0);

    // Graduate to Review state.
    let card = createCard();
    let t = NOW;
    for (let i = 0; i < 6; i++) {
      card = rateCard(card, Rating.Good, t);
      t = card.due;
    }
    expect(card.fsrsState).toBe(2); // Review state

    // Again on a Review card increments lapses.
    const lapsed = rateCard(card, Rating.Again, t);
    expect(lapsed.lapses).toBe(card.lapses + 1);
  });
});

describe('rateCard — rating consistency', () => {
  it('Hard rating produces a due date between Again and Good', () => {
    const card = createCard();
    const again = rateCard(card, Rating.Again, NOW);
    const hard  = rateCard(card, Rating.Hard,  NOW);
    const good  = rateCard(card, Rating.Good,  NOW);
    expect(hard.due).toBeGreaterThanOrEqual(again.due);
    expect(hard.due).toBeLessThanOrEqual(good.due);
  });

  it('reps counter increases with each successful review', () => {
    let card = createCard();
    let t = NOW;
    for (let i = 1; i <= 3; i++) {
      card = rateCard(card, Rating.Good, t);
      t = card.due;
      expect(card.reps).toBe(i);
    }
  });
});
