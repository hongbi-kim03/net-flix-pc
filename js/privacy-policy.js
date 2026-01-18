/* ==============================
1) 아코디언(토글 섹션) - 부드럽게 열고 닫기
============================== */
const toggleTitles = document.querySelectorAll('.toggle-title');

toggleTitles.forEach(title => {
    const content = title.nextElementSibling;

    // 초기 스타일 세팅
    content.style.height = '0px';
    content.style.overflow = 'hidden';
    content.style.transition = 'height 0.6s cubic-bezier(0.4, 0, 0.2, 1)'; // 느리고 부드럽게

    title.addEventListener('click', () => {
        if (!content.classList.contains('open')) {
            // 열기
            content.classList.add('open');
            const scrollHeight = content.scrollHeight;
            content.style.height = scrollHeight + 'px';
        } else {
            // 닫기
            const scrollHeight = content.scrollHeight;
            content.style.height = scrollHeight + 'px';
            requestAnimationFrame(() => {
                content.style.height = '0px';
            });

            content.addEventListener('transitionend', function handler() {
                content.classList.remove('open');
                content.removeEventListener('transitionend', handler);
            });
        }
    });

    // 열린 상태 끝나면 높이 auto
    content.addEventListener('transitionend', () => {
        if (content.classList.contains('open')) {
            content.style.height = 'auto';
        }
    });
});