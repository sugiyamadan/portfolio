
async function loadSidebar() {
  const target = document.querySelector("#common-profile");
  if (!target) return;

  try {
    const response = await fetch("https://daiki-sugiyama.com/common/html/profile.html");

    if (!response.ok) {
      throw new Error(`読み込み失敗: ${response.status}`);
    }

    target.innerHTML = await response.text();

    console.log("サイドバー読み込み完了");

  } catch (error) {
    console.error("サイドバー読み込みエラー:", error);
    throw error;
  }
}

// 読み込み完了を他のJSから待てるようにする
window.sidebarReady = loadSidebar();
