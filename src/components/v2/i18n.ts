import { useEffect, useSyncExternalStore } from "react";
import type { Lang, TerminalContent } from "~/data/v2/types";
import { terminalContent } from "~/data/v2/content";

const STORAGE_KEY = "dl-lang";

const detectLang = (): Lang => {
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

const notify = () => listeners.forEach((fn) => fn());

const initIfNeeded = () => {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  const detected = detectLang();
  if (detected !== current) {
    current = detected;
    document.documentElement.setAttribute("lang", current);
    notify();
  } else {
    document.documentElement.setAttribute("lang", current);
  }
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
  notify();
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
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  useEffect(() => {
    initIfNeeded();
  }, []);
  return [terminalContent[lang], lang, setLang];
};
