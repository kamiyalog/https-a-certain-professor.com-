document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  const currentPage = body.dataset.page || "?";
  const totalPages = 66;
  const rootPath = body.dataset.root || "./";

  loadFooterStylesheet(rootPath);
  createFooter(currentPage, totalPages);
});

/**
 * 共通フッター用CSSを読み込む
 */
function loadFooterStylesheet(rootPath) {
  const existingStylesheet = document.querySelector(
    'link[data-fiction-footer-style]'
  );

  if (existingStylesheet) {
    return;
  }

  const stylesheet = document.createElement("link");

  stylesheet.rel = "stylesheet";
  stylesheet.href = `${rootPath}common/css/fiction-footer.css`;
  stylesheet.dataset.fictionFooterStyle = "true";

  document.head.appendChild(stylesheet);
}

/**
 * 共通フッターを生成する
 */
function createFooter(currentPage, totalPages) {
  const existingFooter = document.querySelector(".fiction-footer");

  if (existingFooter) {
    return;
  }

  const footer = document.createElement("footer");
  footer.className = "fiction-footer";

  const notice = document.createElement("p");
  notice.className = "fiction-footer__notice";
  notice.textContent =
    "このWebサイトの内容はフィクションです。実在の人物・団体とは関係ありません。";

  const pageNumber = document.createElement("span");
  pageNumber.className = "fiction-footer__page";
  pageNumber.textContent = `${currentPage}/66`;

  footer.append(notice, pageNumber);
  document.body.appendChild(footer);
}