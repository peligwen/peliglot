import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProgress, readVisited } from './useProgress';

const KEY = 'peliglot-test-progress';

describe('useProgress', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initialises with page 0 and empty visited set when storage is empty', () => {
    const { result } = renderHook(() => useProgress(KEY));
    expect(result.current.state.page).toBe(0);
    expect(result.current.state.visited.size).toBe(0);
  });

  it('setPage persists page to localStorage and updates state', () => {
    const { result } = renderHook(() => useProgress(KEY));
    act(() => { result.current.setPage(3); });
    expect(result.current.state.page).toBe(3);
    expect(localStorage.getItem(KEY)).toBe('3');
  });

  it('markVisited adds the index to visited set and persists it', () => {
    const { result } = renderHook(() => useProgress(KEY));
    act(() => { result.current.markVisited(2); });
    expect(result.current.state.visited.has(2)).toBe(true);
    const raw = localStorage.getItem(KEY + '-visited');
    expect(raw).not.toBeNull();
    expect(JSON.parse(raw!)).toContain(2);
  });

  it('markVisited does not duplicate indices', () => {
    const { result } = renderHook(() => useProgress(KEY));
    act(() => { result.current.markVisited(5); });
    act(() => { result.current.markVisited(5); });
    expect(result.current.state.visited.size).toBe(1);
  });

  it('markVisited accumulates multiple distinct indices', () => {
    const { result } = renderHook(() => useProgress(KEY));
    act(() => { result.current.markVisited(0); });
    act(() => { result.current.markVisited(1); });
    act(() => { result.current.markVisited(4); });
    expect(result.current.state.visited.size).toBe(3);
    expect(result.current.state.visited.has(0)).toBe(true);
    expect(result.current.state.visited.has(1)).toBe(true);
    expect(result.current.state.visited.has(4)).toBe(true);
  });

  it('reset clears both localStorage keys and resets state to page 0', () => {
    const { result } = renderHook(() => useProgress(KEY));
    act(() => { result.current.setPage(7); });
    act(() => { result.current.markVisited(2); });
    act(() => { result.current.reset(); });
    expect(result.current.state.page).toBe(0);
    expect(result.current.state.visited.size).toBe(0);
    expect(localStorage.getItem(KEY)).toBeNull();
    expect(localStorage.getItem(KEY + '-visited')).toBeNull();
  });

  it('initialises page from localStorage on remount', () => {
    localStorage.setItem(KEY, '5');
    const { result } = renderHook(() => useProgress(KEY));
    expect(result.current.state.page).toBe(5);
  });

  it('initialises visited from localStorage on remount', () => {
    localStorage.setItem(KEY + '-visited', JSON.stringify([0, 2, 3]));
    const { result } = renderHook(() => useProgress(KEY));
    expect(result.current.state.visited.has(0)).toBe(true);
    expect(result.current.state.visited.has(2)).toBe(true);
    expect(result.current.state.visited.has(3)).toBe(true);
    expect(result.current.state.visited.size).toBe(3);
  });
});

describe('readVisited', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns empty set when nothing stored', () => {
    expect(readVisited(KEY).size).toBe(0);
  });

  it('returns a Set of the stored indices', () => {
    localStorage.setItem(KEY + '-visited', JSON.stringify([1, 3, 5]));
    const s = readVisited(KEY);
    expect(s.has(1)).toBe(true);
    expect(s.has(3)).toBe(true);
    expect(s.has(5)).toBe(true);
    expect(s.size).toBe(3);
  });

  it('returns empty set on malformed JSON', () => {
    localStorage.setItem(KEY + '-visited', 'not-json{{{');
    expect(readVisited(KEY).size).toBe(0);
  });
});
