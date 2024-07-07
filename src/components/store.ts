import { useSyncExternalStore } from "react";

type SetStore<T> = T | ((value: T) => void);

export default function createStore<T>(value: T) {
  const subscribers = new Set<(value?: T) => void>();
  return {
    get() {
      return value;
    },
    set(new_value: SetStore<T>) {
      value = structuredClone(value);
      if (typeof new_value === "function")
        (new_value as (value: T) => void)?.(value);
      else value = new_value;
      subscribers.forEach((callback) => callback(value));
    },
    subscribe(callback: (value?: T) => void) {
      subscribers.add(callback);
      return () => subscribers.delete(callback);
    },
  };
}

export function useStore<T>(
  store: ReturnType<typeof createStore<T>>
): [T, SetStore<T>] {
  return [useSyncExternalStore(store.subscribe, store.get), store.set];
}
