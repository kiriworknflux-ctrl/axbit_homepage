import { getPageSections, getCurrentSectionIndex } from "./section-utils.js";

const DESKTOP_QUERY = "(min-width: 769px)";
const SCROLL_LOCK_TIME = 900;

export function initFullpageScroll() {
  const desktopMedia = window.matchMedia(DESKTOP_QUERY);
  const reducedMotionMedia = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  const sections = getPageSections();
  if (sections.length < 2) return;

  let isScrolling = false;

  const canUseFullpageScroll = () =>
    desktopMedia.matches && !reducedMotionMedia.matches;

  const moveToSection = (targetIndex) => {
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    isScrolling = true;
    sections[targetIndex].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // 부드러운 스크롤 중 휠 입력이 누적되어 섹션을 건너뛰는 것을 막습니다.
    window.setTimeout(() => {
      isScrolling = false;
    }, SCROLL_LOCK_TIME);
  };
  const handleWheel = (event) => {
    if (!canUseFullpageScroll()) return;
    if (document.body.classList.contains("is-modal-open")) return;

    if (isScrolling) {
      event.preventDefault();
      return;
    }

    const direction = event.deltaY > 0 ? 1 : -1;
    const currentIndex = getCurrentSectionIndex(sections);
    const targetIndex = currentIndex + direction;

    if (targetIndex < 0 || targetIndex >= sections.length) return;

    event.preventDefault();
    moveToSection(targetIndex);
  };
  window.addEventListener("wheel", handleWheel, { passive: false });
}
