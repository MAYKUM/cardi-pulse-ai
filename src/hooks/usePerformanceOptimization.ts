import { useCallback, useMemo, useRef } from 'react';

/**
 * Hook for debouncing expensive operations
 */
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    }) as T,
    [callback, delay]
  );
}

/**
 * Hook for throttling expensive operations
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastCallRef = useRef<number>(0);

  return useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now();
      
      if (now - lastCallRef.current >= delay) {
        lastCallRef.current = now;
        return callback(...args);
      }
    }) as T,
    [callback, delay]
  );
}

/**
 * Hook for memoizing expensive computations with cache invalidation
 */
export function useMemoizedComputation<T>(
  computation: () => T,
  dependencies: React.DependencyList,
  cacheSize: number = 10
): T {
  const cacheRef = useRef<Map<string, T>>(new Map());

  return useMemo(() => {
    const key = JSON.stringify(dependencies);
    
    if (cacheRef.current.has(key)) {
      return cacheRef.current.get(key)!;
    }

    const result = computation();
    
    // Simple LRU cache management
    if (cacheRef.current.size >= cacheSize) {
      const firstKey = cacheRef.current.keys().next().value;
      cacheRef.current.delete(firstKey);
    }
    
    cacheRef.current.set(key, result);
    return result;
  }, dependencies);
}

/**
 * Hook for managing component visibility to prevent rendering off-screen components
 */
export function useVirtualization<T>(
  items: T[],
  containerHeight: number,
  itemHeight: number,
  scrollTop: number = 0
): { visibleItems: T[]; startIndex: number; endIndex: number } {
  return useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );

    return {
      visibleItems: items.slice(startIndex, endIndex),
      startIndex,
      endIndex
    };
  }, [items, containerHeight, itemHeight, scrollTop]);
}

/**
 * Hook for managing expensive side effects with debouncing
 */
export function useOptimizedEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList,
  delay: number = 0
): void {
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  useMemo(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        const cleanup = effect();
        return cleanup;
      }, delay);
    } else {
      const cleanup = effect();
      return cleanup;
    }
  }, deps);
}