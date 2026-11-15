async function loadSidebar() {
  const target = document.querySelector("#common-sidebar");
  if (!target) return;

  try {
    const response = await fetch("/common/sidebar.html");

    if (!response.ok) {
      throw new Error(`読み込み失敗: ${response.status}`);
    }

    target.innerHTML = await response.text();

    // 詳細ページの場合のみTOPへ遷移
    const isTopPage =
      window.location.pathname === "/" ||
      window.location.pathname === "/index.html";

    if (!isTopPage) {
      const buttons = target.querySelectorAll(
        ".sidebar__filter-btn"
      );

      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          const category = button.dataset.category;

          window.location.href =
            `/?category=${encodeURIComponent(category)}`;
        });
      });
    }

    document.dispatchEvent(new Event("sidebarLoaded"));

  } catch (error) {
    console.error("サイドバー読み込みエラー:", error);
    throw error;
  }
}

window.sidebarReady = loadSidebar();
