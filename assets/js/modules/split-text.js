const SPLIT_TEXT_SELECTOR = "[data-split-text]";

export function initSplitText() {
  const splitTargets = document.querySelectorAll(SPLIT_TEXT_SELECTOR);
  if (splitTargets.length === 0) return;

  splitTargets.forEach((target) => {
    const text = target.textContent.trim();
    target.textContent = "";

    // 글자별 지연 효과를 주기 위해 각 문자를 span으로 감쌉니다.
    Array.from(text).forEach((char, index) => {
      const charElement = document.createElement("span");
      charElement.className = "split-char";
      charElement.style.setProperty("--char-index", index);
      charElement.textContent = char;
      target.appendChild(charElement);
    });
  });
}
