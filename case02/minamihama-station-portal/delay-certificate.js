(() => {
  // ページ8などで提示する新しい交通系ICカード番号に置き換えてください。
  const VALID_IC_NUMBER = "M547847";

  const form = document.getElementById("certificateForm");
  const input = document.getElementById("icNumber");
  const error = document.getElementById("formError");
  const result = document.getElementById("resultPanel");
  const noResult = document.getElementById("noResult");

  input.addEventListener("input", () => {
    error.textContent = "";
    result.hidden = true;
    noResult.hidden = true;
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    const value = input.value.trim();

    error.textContent = "";
    result.hidden = true;
    noResult.hidden = true;

 

    if (value === VALID_IC_NUMBER) {
      result.hidden = false;
      result.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      noResult.hidden = false;
      noResult.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
})();
