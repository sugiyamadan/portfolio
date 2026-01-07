
// デザインカテゴリーごとにクリックすると、クリックした内容が表示される + URLに反映
function categoryTab(){
    let category = "";
    const contents = Array.from(document.querySelectorAll('.contents'));
    const btns = Array.from(document.querySelectorAll('.sidebar__filter-btn'));

    // コンテンツの表示（必要ならURLも更新）
    function show(contentData, shouldUpdateUrl){
        category = contentData;

        //「コンテンツカテゴリー」と「クリックしたカテゴリーボタン」が同じカテゴリーの場合、表示。他は非表示
        contents.forEach((content) => {
            const isMatch = content.dataset.category === category;
            content.classList.toggle("active", isMatch); // isMatch が true なら表示
            content.classList.toggle("hidden", !isMatch); // isMatch が false なら非表示
        });

        //「クリックしたカテゴリーボタン」にクラスを追加
        btns.forEach((btn) => {
            const isMatch = btn.dataset.category === category;
            btn.classList.toggle("active-btn", isMatch);
            btn.classList.toggle("hidden-btn", !isMatch);
        });

        // URL を ?category=xxx に書き換え（ページリロードなし）
        if (shouldUpdateUrl) {
            const url = new URL(window.location);
            url.searchParams.set("category", category);
            history.pushState(null, "", url);
        }
    }

    // クリックイベント
    btns.forEach((btn) => {
        btn.addEventListener('click', () => {
            // クリックした内容と該当するコンテンツを表示 + URLにも反映
            show(btn.dataset.category, true);
        });
    });

    // --- 初期状態の表示を URL から決める ---

    // URL（?category=xxx）からカテゴリ取得
    const params = new URLSearchParams(window.location.search);
    const urlCategory = params.get("category");

    // URLのcategory がボタンのどれかと一致していればそれを優先
    let initialCategory = btns[0] ? btns[0].dataset.category : "";

    if (urlCategory && btns.some(btn => btn.dataset.category === urlCategory)) {
        initialCategory = urlCategory;
    }

    if (initialCategory) {
        // 初期表示では URL 更新は不要なので false
        show(initialCategory, false);
    }
}

categoryTab();


// 詳細ページに遷移した場合、そのリンク先のURLに「category = 〇〇」と語尾に付く
document.querySelectorAll(".product__card-link").forEach(a => {
a.addEventListener("click", (e) => {
    const current = new URLSearchParams(location.search).get("category");
    if (!current) return; // 何も選ばれてないならそのまま

    const url = new URL(a.href, location.origin);
    url.searchParams.set("category", current);
    a.href = url.toString();
});
});
