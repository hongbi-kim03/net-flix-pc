// 아코디언 기능
const accordionBtns = document.querySelectorAll(".accordion-btn");

accordionBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const content = btn.nextElementSibling;
        const isOpen = btn.getAttribute("aria-expanded") === "true";

        // 다른 아코디언 닫기
        accordionBtns.forEach(otherBtn => {
            if (otherBtn !== btn) {
                otherBtn.setAttribute("aria-expanded", "false");
                const otherContent = otherBtn.nextElementSibling;
                otherContent.style.maxHeight = null;
            }
        });

        if (isOpen) {
            // 닫기
            btn.setAttribute("aria-expanded", "false");
            content.style.maxHeight = null;
        } else {
            // 열기 (항상 새로 계산)
            btn.setAttribute("aria-expanded", "true");
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});


// # 링크 기본 동작 차단
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
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


