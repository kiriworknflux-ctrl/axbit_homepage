const CONTACT_FORM_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyFLX6itCEuWoMaDxTEyVvL8QHwEr9DVODYFOG9cm0eojhe3IHnVZyIc7d63cFSnwdE/exec";

export function initContactForm() {
  const modal = document.querySelector("[data-contact-modal]");
  const openButtons = document.querySelectorAll("[data-contact-modal-open]");
  const closeButtons = document.querySelectorAll("[data-contact-modal-close]");
  const form = document.querySelector("[data-contact-form]");
  const message = document.querySelector("[data-contact-form-message]");
  const submitButton = document.querySelector("[data-contact-submit]");

  if (!modal || !form || !submitButton) return;

  let lastFocusedElement = null;

  const setMessage = (text, isError = false) => {
    if (!message) return;
    message.textContent = text;
    message.classList.toggle("is-error", isError);
  };

  const openModal = (event) => {
    lastFocusedElement = event.currentTarget;
    modal.hidden = false;
    document.body.classList.add("is-modal-open");
    setMessage("");

    const firstInput = form.querySelector("input, textarea");
    if (firstInput) {
      firstInput.focus();
    }
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove("is-modal-open");
    setMessage("");

    // 모달을 닫은 뒤 사용자가 눌렀던 버튼으로 포커스를 되돌립니다.
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  };

  const getFormPayload = () => {
    const formData = new FormData(form);

    // Apps Script에서 바로 저장/메일 발송할 수 있도록 필요한 값만 정리합니다.
    return {
      name: String(formData.get("name") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      privacyAgreement: formData.get("privacyAgreement") === "on",
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    if (!CONTACT_FORM_ENDPOINT) {
      setMessage("문의 접수 주소가 아직 설정되지 않았습니다.", true);
      return;
    }

    const payload = getFormPayload();

    if (!payload.privacyAgreement) {
      setMessage("개인정보 수집 및 이용에 동의해 주세요.", true);
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "제출 중...";
    setMessage("");

    try {
      await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: {
          // Apps Script는 CORS 응답 제어가 제한적이므로 응답 본문을 읽지 않습니다.
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      form.reset();
      closeModal();
      window.alert("문의가 접수되었습니다.");
    } catch (error) {
      setMessage(
        error.message ||
          "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
        true,
      );
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "제출";
    }
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  modal.addEventListener("click", (event) => {
    if (event.target.matches("[data-contact-modal-close]")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });

  form.addEventListener("submit", handleSubmit);
}
