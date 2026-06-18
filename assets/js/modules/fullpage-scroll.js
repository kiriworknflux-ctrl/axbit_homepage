import {
  canUseMotionEffects,
  getPageSections,
  getCurrentSectionIndex,
} from "./section-utils.js";

const SCROLL_LOCK_TIME = 900;

export function initFullpageScroll() {
  const sections = getPageSections();
  if (sections.length < 2) return;

  let isScrolling = false;

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
    if (!canUseMotionEffects()) return;
    if (document.body.classList.contains("is-modal-open")) return;

    if (isScrolling) {
      event.preventDefault();
      return;
    }

    const direction = event.deltaY > 0 ? 1 : -1;
    const currentIndex = getCurrentSectionIndex(sections);
    let targetIndex = currentIndex + direction;

    if (targetIndex < 0 || targetIndex >= sections.length) return;

    event.preventDefault();
    moveToSection(targetIndex);
  };

  window.addEventListener("wheel", handleWheel, { passive: false });
}
