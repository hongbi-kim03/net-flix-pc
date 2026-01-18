document.addEventListener("DOMContentLoaded", () => {
    /* ===============================
        1. 지도 영역 스크롤 이동
    =============================== */
    const scrollMapBtn = document.getElementById("scrollMap");
    const mapSection = document.getElementById("map");

    if (scrollMapBtn && mapSection) {
        scrollMapBtn.addEventListener("click", () => {
            mapSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }

    /* ===============================
        2. 뒤로가기 버튼 (히스토리 기반)
    =============================== */
    const backBtn = document.querySelector(".back-btn");

    if (backBtn) {
        backBtn.addEventListener("click", (e) => {
            // 이전 페이지가 있으면 뒤로가기
            if (window.history.length > 1) {
                e.preventDefault();
                history.back();
            }
            // 없으면 index.html로 이동 (기본 href)
        });
    }

    /* ===============================
        3. 스크롤 시 헤더 스타일 변경
        (Netflix 스타일 트렌드)
    =============================== */
    const header = document.querySelector(".location-header");

    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 30) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }
});
