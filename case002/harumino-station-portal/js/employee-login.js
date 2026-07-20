document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("staff-login");
  const idInput = document.getElementById("staff-id");
  const passwordInput = document.getElementById("staff-password");
  const message = document.getElementById("login-message");

  const validId = "1012";
  const validPassword = "9876";

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const enteredId = idInput.value.trim();
    const enteredPassword = passwordInput.value.trim();

    message.classList.remove("is-success");

    if (!enteredId || !enteredPassword) {
      message.textContent = "職員IDとパスワードを入力してください。";
      return;
    }

    if (enteredId === validId && enteredPassword === validPassword) {
      message.textContent = "認証しました。職員用ページへ移動します。";
      message.classList.add("is-success");

      window.setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 500);

      return;
    }

    message.textContent = "職員IDまたはパスワードが正しくありません。";
    passwordInput.value = "";
    passwordInput.focus();
  });
});
