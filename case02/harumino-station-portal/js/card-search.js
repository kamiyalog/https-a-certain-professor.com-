(() => {
  "use strict";

  const form = document.getElementById("card-search-form");
  const input = document.getElementById("card-id");
  const message = document.getElementById("search-message");
  const oldCardResult = document.getElementById("old-card-result");
  const newCardResult = document.getElementById("new-card-result");

  const normalize = (value) => value.trim().toLowerCase();

  const hideResults = () => {
    oldCardResult.hidden = true;
    newCardResult.hidden = true;
  };

  const showMessage = (text) => {
    message.textContent = text;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const rawValue = input.value.trim();
    const value = normalize(rawValue);

    hideResults();
    showMessage("");

    if (!value) {
      showMessage("カード番号を入力してください。");
      input.focus();
      return;
    }

    if (value === "soulshallwither") {
      window.location.href = "soulshallwither.html";
      return;
    }

    if (value === "s147847") {
      oldCardResult.hidden = false;
      oldCardResult.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (value === "m547847") {
      newCardResult.hidden = false;
      newCardResult.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    showMessage("該当するカード情報はありません。カード番号を確認してください。");
  });

  document.querySelectorAll(".sidebar-link-disabled").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
    });
  });
})();
