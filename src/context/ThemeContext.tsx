import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────
export type Appearance = 'light' | 'dark' | 'system';

export interface ThemePreset {
  id: string;
  name: string;
  color: string;
}

export const THEME_PRESETS: ThemePreset[] = [
  { id: 'violet',  name: 'Violet',        color: '#6C63FF' },
  { id: 'blue',    name: 'Electric Blue',  color: '#2563EB' },
  { id: 'emerald', name: 'Emerald Green',  color: '#059669' },
  { id: 'orange',  name: 'Sunset Orange',  color: '#EA580C' },
  { id: 'rose',    name: 'Rose Pink',      color: '#E11D6B' },
  { id: 'cyan',    name: 'Cyan / Teal',    color: '#0891B2' },
];

const DEFAULT_ACCENT = '#6C63FF';
const DEFAULT_APPEARANCE: Appearance = 'light';
const STORAGE_ACCENT = 'ds-portfolio-accent';
const STORAGE_APPEARANCE = 'ds-portfolio-appearance';

interface ThemeContextValue {
  accent: string;
  appearance: Appearance;
  resolvedAppearance: 'light' | 'dark';
  setAccent: (color: string) => void;
  setAppearance: (a: Appearance) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// ── Helpers ───────────────────────────────────────────────────────────────────
function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  const hs = s / 100, hl = l / 100;
  const a = hs * Math.min(hl, 1 - hl);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const c = hl - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(255 * c).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function applyTheme(accent: string, dark: boolean) {
  const root = document.documentElement;
  const [h, s, l] = hexToHsl(accent);

  // Accent scale
  root.style.setProperty('--color-accent', accent);
  root.style.setProperty('--color-accent-hover', hslToHex(h, s, Math.max(l - 8, 5)));
  root.style.setProperty('--color-accent-muted', hslToHex(h, Math.max(s - 20, 10), Math.min(l + 36, 95)));
  root.style.setProperty('--color-accent-subtle', hslToHex(h, Math.max(s - 30, 5), dark ? 20 : 96));

  if (dark) {
    root.style.setProperty('--color-background', '#0F1117');
    root.style.setProperty('--color-surface',    '#181C25');
    root.style.setProperty('--color-surface-2',  '#1E2330');
    root.style.setProperty('--color-text',        '#EFF1F8');
    root.style.setProperty('--color-muted',       '#7B82A0');
    root.style.setProperty('--color-border',      '#2A2F42');
    root.style.setProperty('--color-shadow',      'rgba(0,0,0,0.4)');
    root.classList.add('dark');
  } else {
    root.style.setProperty('--color-background', '#F8F9FC');
    root.style.setProperty('--color-surface',    '#FFFFFF');
    root.style.setProperty('--color-surface-2',  '#F2F4F9');
    root.style.setProperty('--color-text',        '#172033');
    root.style.setProperty('--color-muted',       '#657087');
    root.style.setProperty('--color-border',      '#E7E9F0');
    root.style.setProperty('--color-shadow',      'rgba(23,32,51,0.06)');
    root.classList.remove('dark');
  }
}

// ── Provider ──────────────────────────────────────────────────────────────────
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState<string>(
    () => localStorage.getItem(STORAGE_ACCENT) || DEFAULT_ACCENT
  );
  const [appearance, setAppearanceState] = useState<Appearance>(
    () => (localStorage.getItem(STORAGE_APPEARANCE) as Appearance) || DEFAULT_APPEARANCE
  );
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const resolvedAppearance: 'light' | 'dark' =
    appearance === 'system' ? (systemDark ? 'dark' : 'light') : appearance;

  useEffect(() => {
    applyTheme(accent, resolvedAppearance === 'dark');
  }, [accent, resolvedAppearance]);

  const setAccent = useCallback((color: string) => {
    setAccentState(color);
    localStorage.setItem(STORAGE_ACCENT, color);
  }, []);

  const setAppearance = useCallback((a: Appearance) => {
    setAppearanceState(a);
    localStorage.setItem(STORAGE_APPEARANCE, a);
  }, []);

  const resetTheme = useCallback(() => {
    setAccent(DEFAULT_ACCENT);
    setAppearance(DEFAULT_APPEARANCE);
  }, [setAccent, setAppearance]);

  return (
    <ThemeContext.Provider value={{ accent, appearance, resolvedAppearance, setAccent, setAppearance, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
