document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("directory-search");
  const input = document.getElementById("employee-id");
  const message = document.getElementById("search-message");
  const resultSection = document.getElementById("result-section");

  const targetEmployeeId = "1012";
  const hiddenKeyword = "soulshallwither";

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = input.value.trim();

    resultSection.hidden = true;
    message.textContent = "";

    if (!query) {
      message.textContent = "職員IDを入力してください。";
      input.focus();
      return;
    }

    if (query.toLowerCase() === hiddenKeyword) {
      window.location.href = "soulshallwither.html";
      return;
    }

    if (query === targetEmployeeId) {
      resultSection.hidden = false;
      resultSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      return;
    }

    message.textContent = "該当する職員情報は見つかりませんでした。";
  });

  document.querySelectorAll(".sidebar-link-disabled").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
    });
  });
});
