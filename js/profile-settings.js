// ================================
// 1. 프로필 드롭다운 메뉴
// ================================
const profileBtn = document.getElementById("profile-btn");
const dropdown = document.getElementById("dropdown");

profileBtn.addEventListener("click", () => {
    profileBtn.classList.toggle("active");
    dropdown.classList.toggle("active");
});

// 화면 클릭 시 드롭다운 닫기
document.addEventListener("click", (e) => {
    if (!profileBtn.contains(e.target) && !dropdown.contains(e.target)) {
        profileBtn.classList.remove("active");
        dropdown.classList.remove("active");
    }
});
