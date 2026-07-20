
(() => {
  "use strict";

  const form = document.getElementById("search-form");
  const input = document.getElementById("member-number");
  const message = document.getElementById("result-message");
  const panel = document.getElementById("result-panel");

  const fields = {
    number: document.getElementById("result-number"),
    shop: document.getElementById("result-shop"),
    name: document.getElementById("result-name"),
    role: document.getElementById("result-role"),
    date: document.getElementById("result-date"),
    note: document.getElementById("result-note")
  };

  const shops = [
    "山吹文具店",
    "本町時計店",
    "みどり茶舗",
    "田代洋品店",
    "中央クリーニング",
    "小林履物店",
    "喫茶こまち",
    "本町精肉店"
  ];

  const surnames = ["田中", "山本", "小林", "佐々木", "渡辺", "中村", "加藤", "吉田"];
  const givenNames = ["和夫", "正明", "恵子", "隆", "美智子", "修", "弘美", "一郎"];

  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "").slice(0, 5);
    message.textContent = "";
    panel.hidden = true;
  });

  const createDummyMember = (number) => {
    const value = Number(number);
    const index = value % shops.length;
    const year = 1994 + (value % 24);
    const month = (value % 12) + 1;
    const day = (value % 25) + 1;

    return {
      number,
      shop: shops[index],
      name: `${surnames[index]} ${givenNames[(index + 3) % givenNames.length]}`,
      role: "一般会員",
      date: `${year}年${month}月${day}日`,
      note: "特記事項なし"
    };
  };

  const render = (member) => {
    fields.number.textContent = member.number;
    fields.shop.textContent = member.shop;
    fields.name.textContent = member.name;
    fields.role.textContent = member.role;
    fields.date.textContent = member.date;
    fields.note.textContent = member.note;
    message.textContent = "";
    panel.hidden = false;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    panel.hidden = true;
    message.textContent = "";

    const number = input.value;

    if (!/^\d{5}$/.test(number)) {
      message.textContent = "会員番号は半角数字5桁で入力してください。";
      return;
    }

    if (number === "00000" || Number(number) < 10001 || Number(number) > 10999) {
      message.textContent = "該当する会員は存在しません。";
      return;
    }

    if (number === "10001") {
      render({
        number: "10001",
        shop: "本町中央薬局",
        name: "長谷川 正一",
        role: "商店街会長",
        date: "1998年4月1日",
        note: "会長就任時に前任者より会員番号を継承"
      });
      return;
    }

    render(createDummyMember(number));
  });
})();
