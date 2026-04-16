/* ================================
🔔 알림 드롭다운 스크롤 방지
================================ */
const dropdowns = document.querySelectorAll('.dropdown-menu');

dropdowns.forEach(menu => {
    menu.addEventListener('wheel', function (e) {
        const delta = e.deltaY;
        const up = delta < 0;
        const down = delta > 0;

        const scrollTop = menu.scrollTop;
        const scrollHeight = menu.scrollHeight;
        const offsetHeight = menu.offsetHeight;

        const atTop = scrollTop === 0;
        const atBottom = scrollTop + offsetHeight >= scrollHeight - 1;

        if ((up && atTop) || (down && atBottom)) {
            e.preventDefault(); // 외부 스크롤 방지
        }
    }, { passive: false });
});

/* ================================
❤️ 찜한 콘텐츠 페이지로 이동
================================ */
const wishlistLink = document.querySelector('.dropdown-menu li a[href="wishlist.html"]');

if (wishlistLink) {
    wishlistLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'wishlist.html';
    });
}



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
🎞️ TOP 10 슬라이더
================================ */
const slider = document.querySelector('.slider');
const wrapper = document.querySelector('.slider-wrapper');
const dots = document.querySelectorAll('.dot');

const gap = 16;
const card = document.querySelector('.card');
const cardWidth = card.offsetWidth; // ⭐ 실제 카드 폭 사용
const cardsPerPage = 4;

const totalCards = document.querySelectorAll('.card').length;
const totalPages = Math.ceil(totalCards / cardsPerPage);

let currentPage = 0;

/* ⭐ 최대 이동 가능 거리 */
function getMaxTranslateX() {
    return slider.scrollWidth - wrapper.clientWidth;
}

function moveSlider(pageIndex) {
    const moveX =
        (cardWidth + gap) * cardsPerPage * pageIndex;

    const maxX = getMaxTranslateX();
    const finalX = Math.min(moveX, maxX); // ⭐ 핵심

    slider.style.transform = `translateX(-${finalX}px)`;
}

function updateDots(activeIndex) {
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[activeIndex]) {
        dots[activeIndex].classList.add('active');
    }
}

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const index = Number(dot.dataset.index);
        currentPage = index;
        moveSlider(index);
        updateDots(index);
    });
});

/* 자동 슬라이드 */
setInterval(() => {
    currentPage = (currentPage + 1) % totalPages;
    moveSlider(currentPage);
    updateDots(currentPage);
}, 5000);

/* 리사이즈 대응 (반응형 대비) */
window.addEventListener('resize', () => {
    moveSlider(currentPage);
});

/* ================================
🎬 숏폼 콘텐츠 자동재생
================================ */
    function postMessageToIframe(iframe, command) {
    if (!iframe || !iframe.contentWindow) return;

    iframe.contentWindow.postMessage(
        JSON.stringify({
        event: 'command',
        func: command,
        args: []
        }),
        '*'
    );
    }

    const slides = document.querySelectorAll('.slide');
    let activeSlide = null;

    slides.forEach(slide => {
    const iframe = slide.querySelector('iframe');
    const thumbnail = slide.querySelector('.thumbnail');
    const videoId = slide.dataset.videoId;

    /* 썸네일 자동 설정 */
    thumbnail.style.backgroundImage =
        `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`;

    slide.addEventListener('mouseenter', () => {
        if (activeSlide && activeSlide !== slide) {
        activeSlide.classList.remove('playing');
        postMessageToIframe(
            activeSlide.querySelector('iframe'),
            'pauseVideo'
        );
        }

        slide.classList.add('playing');
        postMessageToIframe(iframe, 'playVideo');
        activeSlide = slide;
    });

    slide.addEventListener('mouseleave', () => {
        slide.classList.remove('playing');
        postMessageToIframe(iframe, 'pauseVideo');
        activeSlide = null;
    });
});


/* ================================
💖 넷플릭스 소사이어티 찜하기 기능
================================ */
document.querySelectorAll('.btn.ticket').forEach(button => {
    button.addEventListener('click', () => {
        let title = '';
        let img = '';
        let description = '';

        const card = button.closest('.card');
        if (card) {
            const modalTrigger = card.querySelector('.modal-trigger');
            title = modalTrigger.dataset.title;
            img = modalTrigger.dataset.img;
            description = modalTrigger.dataset.description;
        } else {
            title = button.dataset.title;
            img = button.dataset.img;
            description = button.dataset.description;
        }

        const isLiked = button.classList.toggle('active');
        button.innerHTML = isLiked ? '❤️' : '🤍';

        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

        if (isLiked) {
            if (!wishlist.some(item => item.title === title)) {
                wishlist.push({ title, img, description });
            }
        } else {
            wishlist = wishlist.filter(item => item.title !== title);
        }

        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    });
});



/* ================================
🪟 모달 제어
================================ */
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalCast = document.getElementById("modal-cast");
    const modalGenre = document.getElementById("modal-genre");
    const modalFeature = document.getElementById("modal-feature");
    const closeBtn = document.querySelector(".close");
    const modalContent = document.querySelector(".modal-content.wide");
    const detailButtons = document.querySelectorAll(".btn.like");
    const episodesContainer = document.getElementById("modal-episodes-container");

    let lastFocusedElement;
    let isDragging = false;
    let startY;
    let scrollTop;

    function openModal(btn) {
        if (!modal.classList.contains("show")) {
            lastFocusedElement = document.activeElement;

            const imgSrc = btn.dataset.img;
            const title = btn.dataset.title;
            const description = btn.dataset.description;
            const cast = btn.dataset.cast;
            const genre = btn.dataset.genre;
            const feature = btn.dataset.feature;

            modalImg.src = imgSrc || "#";
            modalTitle.textContent = title || "";
            modalDescription.innerHTML = description || "";
            modalCast.textContent = cast?.trim() ? cast : "-";
            modalGenre.textContent = genre || "";
            modalFeature.textContent = feature || "";

            // 회차 템플릿 로드
            let templateId = null;
            switch (title) {
                case "폭군의 셰프": templateId = "episodes-chef"; break;
                case "에스콰이어": templateId = "episodes-esquire"; break;
                case "애마": templateId = "episodes-aema"; break;
                case "웬즈데이 시즌 2": templateId = "episodes-wednesday-s2"; break;
                case "귀멸의 칼날 합동강화훈련편": templateId = "episodes-demon-slayer"; break;
                case "한탕프로젝트 마이턴": templateId = "episodes-myturn"; break;
                case "섬총각 영웅": templateId = "episodes-island-hero"; break;
                case "트리거": templateId = "episodes-trigger"; break;
                case "트라이": templateId = "episodes-try"; break;
                case "나는 생존자다": templateId = "episodes-survivor"; break;
            }

            episodesContainer.innerHTML = "";
            if (templateId) {
                const template = document.getElementById(templateId);
                if (template) {
                    const clone = template.content.cloneNode(true);
                    episodesContainer.appendChild(clone);
                }
            }

            modal.classList.add("show");
            document.body.style.overflow = "hidden";
            closeBtn.focus();
        }
    }

    function closeModal() {
        modal.classList.remove("show");
        document.body.style.overflow = "auto";
        episodesContainer.innerHTML = "";
        if (lastFocusedElement) lastFocusedElement.focus();
    }

    detailButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            openModal(btn);
        });
    });

    closeBtn.addEventListener("click", closeModal);
    window.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

    // 드래그 스크롤 기능
    modalContent.addEventListener("mousedown", (e) => {
        isDragging = true;
        startY = e.pageY - modalContent.offsetTop;
        scrollTop = modalContent.scrollTop;
        modalContent.style.cursor = "grabbing";
    });
    modalContent.addEventListener("mouseleave", () => { isDragging = false; modalContent.style.cursor = "default"; });
    modalContent.addEventListener("mouseup", () => { isDragging = false; modalContent.style.cursor = "default"; });
    modalContent.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const y = e.pageY - modalContent.offsetTop;
        const walk = (y - startY) * 1.5;
        modalContent.scrollTop = scrollTop - walk;
    });

    /* ================================
    🧾 '폭군의 셰프' 알림 클릭 시 모달 열기
    ================================= */
    const noticeItem = document.querySelector('.notice-item[data-title="폭군의 셰프"]');
    if (noticeItem) {
        noticeItem.addEventListener('click', () => {
            const chefButton = document.querySelector('.btn.like.modal-trigger[data-title="폭군의 셰프"]');
            if (chefButton) {
                openModal(chefButton); // 기존 모달 직접 실행
            }
        });
    }

});