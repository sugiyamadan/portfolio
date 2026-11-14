async function loadSidebar() {
  const target = document.querySelector("#common-sidebar");

  if (!target) return;

  try {
    const response = await fetch("https://daiki-sugiyama.com/common/js/sidebar.html");

    if (!response.ok) {
      throw new Error("サイドバーの読み込みに失敗しました");
    }

    target.innerHTML = await response.text();

    // 読み込み完了を通知
    document.dispatchEvent(new Event("sidebarLoaded"));

  } catch (error) {
    console.error(error);
  }
}

loadSidebar();