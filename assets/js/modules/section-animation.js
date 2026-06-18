import { canUseMotionEffects } from "./section-utils.js";

const REVEAL_SELECTOR = "[data-reveal]";
const REVEALED_CLASS = "is-revealed";

export function initSectionAnimation() {
  const revealItems = document.querySelectorAll(REVEAL_SELECTOR);
  if (revealItems.length === 0) return;

  document.documentElement.classList.add("has-reveal-ready");

  if (!canUseMotionEffects()) {
    revealItems.forEach((item) => item.classList.add(REVEALED_CLASS));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add(REVEALED_CLASS);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.22,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  revealItems.forEach((item) => observer.observe(item));
}
