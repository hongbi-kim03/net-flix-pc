// ================================
// 1) FAQ 아코디언 (완벽한 부드러운 애니메이션)
// ================================

const accordions = document.querySelectorAll('.accordion-btn');

accordions.forEach(btn => {
    const content = btn.nextElementSibling;

    // 초기 상태
    content.style.maxHeight = "0px";
    content.style.overflow = "hidden";
    content.style.transition = "max-height 0.35s ease";

    btn.addEventListener("click", () => {
        const isOpen = content.classList.toggle("open");

        if (isOpen) {
            // 열 때: scrollHeight 만큼 부드럽게 열기
            content.style.maxHeight = content.scrollHeight + "px";
        } else {
            // 닫기: 0px 로 부드럽게 닫기
            content.style.maxHeight = "0px";
        }
    });
});

// ================================
// 2) 유저 드롭다운
// ================================
const userDropdown = document.querySelector('.user-dropdown');
const dropdownMenu = userDropdown.querySelector('.dropdown-menu');

userDropdown.addEventListener('click', (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle('active');
});

// 페이지 클릭 시 닫기
document.addEventListener('click', () => {
    userDropdown.classList.remove('active');
});

// ESC 키로 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        userDropdown.classList.remove('active');

        // 아코디언도 닫기
        document.querySelectorAll('.content.open').forEach(content => {
            content.classList.remove("open");
            content.style.maxHeight = "0px";
        });
    }
});
