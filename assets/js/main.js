import { initContactForm } from "./modules/contact-form.js";
import { initFullpageScroll } from "./modules/fullpage-scroll.js";
import { initHeaderTheme } from "./modules/header-theme.js";

// 각 기능 모듈은 main.js에서 한 번씩 초기화합니다.
initContactForm();
initFullpageScroll();
initHeaderTheme();
