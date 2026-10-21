import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
  };
}

function getHash() {
  return window.location.hash;
}

function getServerHash() {
  return null;
}

export function useHash() {
  return useSyncExternalStore(subscribe, getHash, getServerHash);
}
