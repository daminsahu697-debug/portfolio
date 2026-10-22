import { useEffect, useRef, useState } from 'react';

// Intersection Observer based reveal animation hook
export function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// Active section tracking for nav highlight
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const map = new Map<string, number>();

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          map.set(id, entry.intersectionRatio);
          // Pick section with highest visibility
          let best = '';
          let bestRatio = 0;
          map.forEach((ratio, sectionId) => {
            if (ratio > bestRatio) { bestRatio = ratio; best = sectionId; }
          });
          if (best) setActive(best);
        },
        { threshold: [0, 0.1, 0.25, 0.5] }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);

  return active;
}

// Typing / role cycling hook
export function useRoleCycler(roles: string[], interval = 3000) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pause' | 'deleting'>('typing');
  const prefersReduced = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    if (prefersReduced.current) {
      setDisplayed(roles[0]);
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;
    const current = roles[index];

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 55);
      } else {
        timeout = setTimeout(() => setPhase('pause'), interval);
      }
    } else if (phase === 'pause') {
      timeout = setTimeout(() => setPhase('deleting'), 400);
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 32);
      } else {
        setIndex((i) => (i + 1) % roles.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, phase, index, roles, interval]);

  return displayed;
}
