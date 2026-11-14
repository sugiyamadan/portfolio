
// 共通で利用するhtml情報を読み込ませる

fetch("/common/html/head.html")
  .then(response => {
    if (!response.ok) {
      throw new Error("head.htmlの読み込みに失敗しました");
    }
    return response.text();
  })
  .then(html => {
    document.head.insertAdjacentHTML("beforeend", html);
  })
  .catch(console.error);



fetch("/common/html/gtm.html")
  .then(response => {
    if (!response.ok) {
      throw new Error("gtm.htmlの読み込みに失敗しました");
    }
    return response.text();
  })
  .then(html => {
    document.head.insertAdjacentHTML("beforeend", html);
  })
  .catch(console.error);
