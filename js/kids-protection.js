// ===============================
// 1. 유저 드롭다운 토글
// ===============================
const userDropdown = document.querySelector(".user-dropdown");
const dropdownMenu = document.querySelector(".dropdown-menu");

if (userDropdown) {
    userDropdown.addEventListener("click", (e) => {
        e.stopPropagation(); // 외부 클릭시 닫기 위해
        userDropdown.classList.toggle("active");
    });

    // 페이지 어디든 클릭하면 드롭다운 닫기
    document.addEventListener("click", () => {
        userDropdown.classList.remove("active");
    });
}

// ===============================
// 2. 사이드바 메뉴 active 상태
// ===============================
const sidebarLinks = document.querySelectorAll(".sidebar .menu a");
sidebarLinks.forEach(link => {
    link.addEventListener("click", () => {
        // 기존 active 제거
        sidebarLinks.forEach(l => l.classList.remove("active"));
        // 클릭한 메뉴만 active
        link.classList.add("active");
    });
});

// ===============================
// 3. Optional: 스크롤 시 헤더 고정/효과
// ===============================
const header = document.querySelector("header");
let lastScroll = 0;
window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = "translateY(-100%)"; // 스크롤 다운 시 숨기기
    } else {
        header.style.transform = "translateY(0)"; // 스크롤 업 시 보이기
    }
    lastScroll = currentScroll;
});