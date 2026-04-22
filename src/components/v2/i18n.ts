import { useEffect, useSyncExternalStore } from "react";
import type { Lang, TerminalContent } from "~/data/v2/types";
import { terminalContent } from "~/data/v2/content";

const STORAGE_KEY = "dl-lang";

const getInitialLang = (): Lang => {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "es") return stored;
  } catch {
    /* ignore */
  }
  const nav = (window.navigator.language || "en").toLowerCase();
  return nav.startsWith("es") ? "es" : "en";
};

type Listener = () => void;
const listeners = new Set<Listener>();
let current: Lang = "en";
let initialized = false;

const ensureInit = () => {
  if (initialized || typeof window === "undefined") return;
  current = getInitialLang();
  document.documentElement.setAttribute("lang", current);
  initialized = true;
};

export const setLang = (l: Lang) => {
  if (l !== "en" && l !== "es") return;
  current = l;
  try {
    window.localStorage.setItem(STORAGE_KEY, l);
  } catch {
    /* ignore */
  }
  document.documentElement.setAttribute("lang", l);
  listeners.forEach((fn) => fn());
};

const subscribe = (fn: Listener) => {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
};

const getSnapshot = (): Lang => current;
const getServerSnapshot = (): Lang => "en";

export const useI18n = (): [TerminalContent, Lang, (l: Lang) => void] => {
  ensureInit();
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  useEffect(() => {
    ensureInit();
  }, []);
  return [terminalContent[lang], lang, setLang];
};
