export const FULLPAGE_SECTION_SELECTORS = [
  "#hero",
  "#about",
  "#technology",
  "#application",
];

export function getPageSections() {
  return FULLPAGE_SECTION_SELECTORS.map((selector) =>
    document.querySelector(selector),
  ).filter(Boolean);
}

export function getCurrentSectionIndex(sections) {
  const viewportMiddle = window.scrollY + window.innerHeight / 2;

  return sections.reduce((closestIndex, section, index) => {
    const sectionMiddle = section.offsetTop + section.offsetHeight / 2;
    const closestSection = sections[closestIndex];
    const closestMiddle =
      closestSection.offsetTop + closestSection.offsetHeight / 2;

    return Math.abs(sectionMiddle - viewportMiddle) <
      Math.abs(closestMiddle - viewportMiddle)
      ? index
      : closestIndex;
  }, 0);
}

export function getCurrentSection(sections) {
  return sections[getCurrentSectionIndex(sections)];
}
