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


