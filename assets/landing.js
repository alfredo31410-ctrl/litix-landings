(function () {
  const config = window.LITIX_LANDING_CONFIG || {};
  const modal = document.querySelector("[data-registration-modal]");
  const openButtons = document.querySelectorAll("[data-open-registration]");
  const closeButtons = document.querySelectorAll("[data-close-registration]");
  const continueLinks = document.querySelectorAll("[data-thanks-link]");
  const whatsappLinks = document.querySelectorAll("[data-whatsapp-link]");

  const thanksUrl = config.thanksUrl || "/gracias-litigio-mercantil/";

  continueLinks.forEach((link) => {
    link.href = thanksUrl;
  });

  whatsappLinks.forEach((link) => {
    link.href = config.whatsappGroupUrl || "#";
  });

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
      window.location.href = thanksUrl;
    }
  });
})();
