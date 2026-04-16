document.addEventListener('DOMContentLoaded', () => {
    if (typeof initHoverVideo === 'function') initHoverVideo();
    
});

/* ================================
🚀 메인 랜딩 페이지: 서비스 진입 로직
================================ */
const heroForm = document.querySelector('.hero-form');

if (heroForm) {
    heroForm.addEventListener('submit', function (e) {
        e.preventDefault(); // 기본 제출 동작 방지

        const emailInput = this.querySelector('input[type="email"]');
        const emailValue = emailInput.value.trim();

        if (emailValue) {
            // 1. 사용자 이메일 로컬 스토리지 저장 (개인화 준비)
            localStorage.setItem('userEmail', emailValue);

            // 2. 부드러운 전환 효과를 위해 버튼 텍스트 변경 (옵션)
            const submitBtn = this.querySelector('button');
            submitBtn.textContent = '로그인 중...';

            // 3. 메인 콘텐츠 페이지로 이동
            // 실제 작업하신 메인 파일명(예: series.html)으로 수정하세요.
            setTimeout(() => {
                window.location.href = 'series.html'; 
            }, 800);
        }
    });
}

/* ================================
📩 YouTube iframe 제어
================================ */
function postMessageToIframe(iframe, command) {
    if (!iframe || !iframe.contentWindow) return;
    iframe.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command, args: [] }),
        '*'
    );
}

/* ================================
🎬 넷플릭스 스타일 hover 비디오
================================ */
function initHoverVideo() {
    const videoItems = document.querySelectorAll('[data-video-id]');
    let activeItem = null;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    videoItems.forEach(item => {
        const iframe = item.querySelector('iframe');
        const thumbnail = item.querySelector('.thumbnail');
        const videoId = item.dataset.videoId;
        if (!iframe || !thumbnail) return;

        thumbnail.style.backgroundImage = `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`;

        const playVideo = (target) => {
            if (activeItem && activeItem !== target) stopVideo(activeItem);
            target.classList.add('playing');
            postMessageToIframe(target.querySelector('iframe'), 'playVideo');
            activeItem = target;
        };

        const stopVideo = (target) => {
            target.classList.remove('playing');
            postMessageToIframe(target.querySelector('iframe'), 'pauseVideo');
            if (activeItem === target) activeItem = null;
        };

        if (isTouchDevice) {
            item.addEventListener('click', (e) => {
                e.stopPropagation(); 
                item.classList.contains('playing') ? stopVideo(item) : playVideo(item);
            });
        } else {
            item.addEventListener('mouseenter', () => playVideo(item));
            item.addEventListener('mouseleave', () => stopVideo(item));
        }
    });

    if (isTouchDevice) {
        document.addEventListener('touchstart', (e) => {
            if (activeItem && !activeItem.contains(e.target)) stopVideo(activeItem);
        });
    }
}