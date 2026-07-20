
(() => {
  "use strict";

  const form = document.getElementById("login-form");
  const memberId = document.getElementById("member-id");
  const password = document.getElementById("password");
  const button = document.getElementById("login-button");
  const status = document.getElementById("status");

  const expectedDigest =
    "d0c1d36ecfa2ad1a4843ec7e415c4d4511ee3c98ff763f19e93dbd555f1a484d";

  const toHex = (buffer) =>
    Array.from(new Uint8Array(buffer))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

  const digest = async (value) => {
    const data = new TextEncoder().encode(value);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return toHex(hash);
  };

  const clearStatus = () => {
    status.textContent = "";
    status.classList.remove("success");
  };

  memberId.addEventListener("input", () => {
    memberId.value = memberId.value.replace(/\D/g, "").slice(0, 5);
    clearStatus();
  });

  password.addEventListener("input", () => {
    password.value = password.value.replace(/\D/g, "").slice(0, 4);
    clearStatus();
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearStatus();

    if (memberId.value.length !== 5 || password.value.length !== 4) {
      status.textContent = "会員番号またはパスワードの入力形式を確認してください。";
      return;
    }

    button.disabled = true;
    button.textContent = "認証中...";
    status.textContent = "認証しています。";
    status.classList.add("success");

    try {
      const enteredDigest = await digest(`${memberId.value}:${password.value}`);

      await new Promise((resolve) => setTimeout(resolve, 800));

      if (enteredDigest === expectedDigest) {
        status.textContent = "認証しました。管理画面へ移動します。";
        window.location.href = "member-search.html";
        return;
      }

      status.classList.remove("success");
      status.textContent = "会員番号またはパスワードが正しくありません。";
    } catch (error) {
      status.classList.remove("success");
      status.textContent = "認証処理に失敗しました。もう一度お試しください。";
    } finally {
      button.disabled = false;
      button.textContent = "ログイン";
    }
  });
})();
