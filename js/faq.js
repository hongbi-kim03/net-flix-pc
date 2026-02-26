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

/* ================================
    1) 우측 상단 프로필 드롭다운
================================= */
const profileBtn = document.getElementById('profile-btn');
const dropdown = document.getElementById('dropdown');

if (profileBtn && dropdown) {
    const toggleDropdown = () => {
    dropdown.classList.toggle('active');
    profileBtn.classList.toggle('active'); 
    };

    profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown();
    });

    profileBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleDropdown();
    }
    });
}