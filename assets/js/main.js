import { initContactForm } from "./modules/contact-form.js";
import { initFullpageScroll } from "./modules/fullpage-scroll.js";
import { initHeaderTheme } from "./modules/header-theme.js";
import { initSectionAnimation } from "./modules/section-animation.js";
import { initSplitText } from "./modules/split-text.js";

// 각 기능 모듈은 main.js에서 한 번씩 초기화합니다.
initSplitText();
initContactForm();
initFullpageScroll();
initHeaderTheme();
initSectionAnimation();
