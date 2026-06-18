import { getCurrentSection, getPageSections } from "./section-utils.js";

const header = document.querySelector(".site-header");
const logo = document.querySelector(".header-logo");
const sections = getPageSections();
let currentTheme = "";

export function applyHeaderTheme() {
  const currentSection = getCurrentSection(sections);
  if (!currentSection) return;
  const nextTheme = currentSection.id === "about" ? "light" : "dark";

  if (currentTheme === nextTheme) return;

  currentTheme = nextTheme;
  header.classList.toggle("is-light", nextTheme === "light");
}

export function initHeaderTheme() {
  if (!header || !logo || sections.length === 0) return;

  applyHeaderTheme();
  window.addEventListener("scroll", applyHeaderTheme, { passive: true });
  window.addEventListener("resize", applyHeaderTheme);
}
