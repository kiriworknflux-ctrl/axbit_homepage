export const FULLPAGE_SECTION_SELECTORS = [
  "#hero",
  "#about",
  "#technology",
  "#application",
];

const DESKTOP_QUERY = "(min-width: 769px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function canUseMotionEffects() {
  return (
    window.matchMedia(DESKTOP_QUERY).matches &&
    !window.matchMedia(REDUCED_MOTION_QUERY).matches
  );
}

export function getPageSections() {
  return FULLPAGE_SECTION_SELECTORS.map((selector) =>
    document.querySelector(selector),
  ).filter(Boolean);
}

export function getCurrentSectionIndex(sections) {
  const viewportMiddle = window.scrollY + window.innerHeight / 2;

  return sections.reduce((closestIndex, section, index) => {
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const sectionMiddle = sectionTop + section.offsetHeight / 2;

    const closestSection = sections[closestIndex];
    const closestTop =
      closestSection.getBoundingClientRect().top + window.scrollY;
    const closestMiddle = closestTop + closestSection.offsetHeight / 2;

    return Math.abs(sectionMiddle - viewportMiddle) <
      Math.abs(closestMiddle - viewportMiddle)
      ? index
      : closestIndex;
  }, 0);
}

export function getCurrentSection(sections) {
  return sections[getCurrentSectionIndex(sections)];
}
