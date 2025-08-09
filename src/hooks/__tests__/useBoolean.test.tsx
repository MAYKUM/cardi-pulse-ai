/// <reference types="vitest" />
import { renderHook, act } from '@testing-library/react';
import { test, expect } from 'vitest';
import { useBoolean } from '../useBoolean';

test('useBoolean toggles and sets correctly', () => {
  const { result } = renderHook(() => useBoolean(false));

  expect(result.current.value).toBe(false);

  act(() => result.current.on());
  expect(result.current.value).toBe(true);

  act(() => result.current.off());
  expect(result.current.value).toBe(false);

  act(() => result.current.toggle());
  expect(result.current.value).toBe(true);

  act(() => result.current.set(false));
  expect(result.current.value).toBe(false);
});
