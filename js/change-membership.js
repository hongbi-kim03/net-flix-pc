// 아코디언 기능
const accordions = document.querySelectorAll('.accordion-btn');
accordions.forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        if (content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        }
    });
});

// ================================
// 2) 유저 드롭다운
// ================================
const userDropdown = document.querySelector('.user-dropdown');
const dropdownMenu = userDropdown.querySelector('.dropdown-menu');
const arrow = userDropdown.querySelector('.arrow');

userDropdown.addEventListener('click', (e) => {
    e.stopPropagation(); // 클릭 이벤트 버블링 방지
    userDropdown.classList.toggle('active');
    // 메뉴 표시 토글
    if (dropdownMenu.style.display === 'block') {
        dropdownMenu.style.display = 'none';
    } else {
        dropdownMenu.style.display = 'block';
    }
});

document.addEventListener('click', () => {
    userDropdown.classList.remove('active');
    dropdownMenu.style.display = 'none';
});

// ================================
// 3) ESC 키로 닫기
// ================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        userDropdown.classList.remove('active');
        dropdownMenu.style.display = 'none';
    }
});

document.querySelector(".toggle-title").addEventListener("click", function () {
    const content = document.querySelector(".toggle-content");
    content.classList.toggle("open");
});
