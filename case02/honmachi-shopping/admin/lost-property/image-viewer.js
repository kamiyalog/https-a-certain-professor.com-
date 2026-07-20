(() => {
  const buttons = Array.from(document.querySelectorAll("[data-lightbox]"));
  const modal = document.getElementById("image-modal");

  if (!buttons.length || !modal) return;

  const modalImage = document.getElementById("image-modal-image");
  const modalTitle = document.getElementById("image-modal-title");
  const closeButton = document.getElementById("image-modal-close");
  const prevButton = document.getElementById("image-modal-prev");
  const nextButton = document.getElementById("image-modal-next");

  let currentIndex = 0;
  let lastFocusedElement = null;

  const updateModal = () => {
    const button = buttons[currentIndex];
    const image = button.querySelector("img");

    modalImage.src = button.dataset.full || image.src;
    modalImage.alt = image.alt;
    modalTitle.textContent =
      `証拠写真 ${currentIndex + 1}/${buttons.length}　${button.dataset.title || ""}`;

    const hideNavigation = buttons.length < 2;
    prevButton.hidden = hideNavigation;
    nextButton.hidden = hideNavigation;
  };

  const openModal = (index) => {
    currentIndex = index;
    lastFocusedElement = document.activeElement;
    updateModal();

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    closeButton.focus();
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    modalImage.removeAttribute("src");

    if (lastFocusedElement) lastFocusedElement.focus();
  };

  const showPrevious = () => {
    currentIndex = (currentIndex - 1 + buttons.length) % buttons.length;
    updateModal();
  };

  const showNext = () => {
    currentIndex = (currentIndex + 1) % buttons.length;
    updateModal();
  };

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => openModal(index));
  });

  closeButton.addEventListener("click", closeModal);
  prevButton.addEventListener("click", showPrevious);
  nextButton.addEventListener("click", showNext);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("is-open")) return;

    if (event.key === "Escape") closeModal();
    if (event.key === "ArrowLeft") showPrevious();
    if (event.key === "ArrowRight") showNext();
  });
})();
