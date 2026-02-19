/* ==============================
1) 아코디언(토글 섹션) 기능 - 자연스러운 슬라이드
============================== */
const toggleTitles = document.querySelectorAll('.toggle-title');

toggleTitles.forEach(title => {
    const content = title.nextElementSibling;

    // 초기 높이 세팅
    content.style.height = '0px';
    content.style.overflow = 'hidden';
    content.style.transition = 'height 0.35s ease';

    title.addEventListener('click', () => {
        const isOpen = content.classList.toggle('open');

        if (isOpen) {
            // 열기: 실제 콘텐츠 높이 적용
            content.style.height = content.scrollHeight + 'px';
        } else {
            // 닫기: 현재 높이를 읽어서 0으로 변경
            content.style.height = content.scrollHeight + 'px'; // 현재 높이 설정
            requestAnimationFrame(() => {
                content.style.height = '0px';
            });
        }
    });

    // transition 끝나면 열린 상태에서는 height를 auto로 설정
    content.addEventListener('transitionend', () => {
        if (content.classList.contains('open')) {
            content.style.height = 'auto';
        }
    });
});

/* ==============================
2) 유저 드롭다운
============================== */
const userDropdown = document.querySelector('.user-dropdown');
const dropdownMenu = userDropdown.querySelector('.dropdown-menu');

userDropdown.addEventListener('click', (e) => {
    e.stopPropagation(); // 클릭 이벤트 버블링 방지
    userDropdown.classList.toggle('active');
});

/* ==============================
3) 문서 클릭 시 드롭다운 닫기
============================== */
document.addEventListener('click', () => {
    userDropdown.classList.remove('active');
});

/* ==============================
4) ESC 키로 드롭다운 닫기
============================== */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        userDropdown.classList.remove('active');
    }
});
