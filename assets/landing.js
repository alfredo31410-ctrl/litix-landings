(function () {
  const config = window.LITIX_LANDING_CONFIG || {};
  const modal = document.querySelector("[data-registration-modal]");
  const openButtons = document.querySelectorAll("[data-open-registration]");
  const closeButtons = document.querySelectorAll("[data-close-registration]");
  const continueLinks = document.querySelectorAll("[data-thanks-link]");
  const whatsappLinks = document.querySelectorAll("[data-whatsapp-link]");

  const thanksUrl = config.thanksUrl || "/universidad-no-enseno/gracias";
  let registrationSubmitted = false;
  let redirectTimer = null;

  continueLinks.forEach((link) => {
    link.href = thanksUrl;
  });

  whatsappLinks.forEach((link) => {
    link.href = config.whatsappGroupUrl || "#";
  });

  function goToThanks() {
    window.location.href = thanksUrl;
  }

  function hasVisibleFormError() {
    const errorSelectors = [
      "._error",
      "._form_error",
      "._error-inner",
      ".error",
      "[aria-invalid='true']"
    ];

    return errorSelectors.some((selector) => {
      return Array.from(document.querySelectorAll(selector)).some((node) => {
        const text = String(node.textContent || "").trim();
        const style = window.getComputedStyle(node);
        return text && style.display !== "none" && style.visibility !== "hidden";
      });
    });
  }

  function looksLikeSuccess() {
    const formArea = document.querySelector(".active-campaign-form");
    if (!formArea) return false;

    const text = String(formArea.textContent || "").toLowerCase();
    const successText =
      text.includes("gracias") ||
      text.includes("thank") ||
      text.includes("confirm") ||
      text.includes("recibido") ||
      text.includes("success");

    return Boolean(
      successText ||
      formArea.querySelector("._form-thank-you") ||
      formArea.querySelector("._form-thank-you-message") ||
      formArea.querySelector("[class*='thank']")
    );
  }

  function scheduleSubmitRedirect() {
    registrationSubmitted = true;
    window.clearTimeout(redirectTimer);

    redirectTimer = window.setTimeout(() => {
      if (!hasVisibleFormError()) {
        goToThanks();
      }
    }, 5500);
  }

  document.addEventListener(
    "submit",
    (event) => {
      const form = event.target;
      if (form instanceof HTMLFormElement && form.closest(".active-campaign-form")) {
        scheduleSubmitRedirect();
      }
    },
    true
  );

  const activeCampaignObserver = new MutationObserver(() => {
    if (registrationSubmitted && looksLikeSuccess()) {
      window.clearTimeout(redirectTimer);
      goToThanks();
    }
  });

  const activeCampaignContainer = document.querySelector(".active-campaign-form");
  if (activeCampaignContainer) {
    activeCampaignObserver.observe(activeCampaignContainer, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  function openModal() {
    if (!modal) return;
    modal.classList.add("is-open");
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
  }

  openButtons.forEach((button) => {
    button.addEventListener("click", openModal);
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  window.addEventListener("message", (event) => {
    const origin = String(event.origin || "").toLowerCase();
    const payload = String(event.data || "").toLowerCase();
    const isActiveCampaign = origin.includes("activecampaign");
    const isSuccess = payload.includes("submitted") || payload.includes("success");

    if (isActiveCampaign && isSuccess) {
      goToThanks();
    }
  });
})();
