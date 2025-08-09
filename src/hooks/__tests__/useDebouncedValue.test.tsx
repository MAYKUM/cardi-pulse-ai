/// <reference types="vitest" />
import { renderHook, act } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import { useDebouncedValue } from '../useDebouncedValue';

vi.useFakeTimers();

test('useDebouncedValue updates after the delay', () => {
  const { result, rerender } = renderHook((props: { value: number; delay: number }) =>
    useDebouncedValue(props.value, props.delay)
  , { initialProps: { value: 0, delay: 200 } });

  expect(result.current).toBe(0);

  rerender({ value: 1, delay: 200 });
  expect(result.current).toBe(0);

  act(() => {
    vi.advanceTimersByTime(199);
  });
  expect(result.current).toBe(0);

  act(() => {
    vi.advanceTimersByTime(1);
  });
  expect(result.current).toBe(1);
});
