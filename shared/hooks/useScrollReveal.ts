"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = ".scroll-reveal";
const VISIBLE_CLASS = "is-visible";

export function useScrollReveal(): void {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const revealAll = () => {
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((node) => {
        node.classList.add(VISIBLE_CLASS);
      });
    };

    if (prefersReducedMotion) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(VISIBLE_CLASS);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    const observeAll = () => {
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((node) => {
        if (node.classList.contains(VISIBLE_CLASS)) return;
        observer.observe(node);
      });
    };

    observeAll();

    const mutationObserver = new MutationObserver(observeAll);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}
