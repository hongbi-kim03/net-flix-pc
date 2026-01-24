document.addEventListener('DOMContentLoaded', () => {
    initHoverVideo();
    initDropdownScroll();
    initWishlistLink();
    initSlider();
    initWishlist();
    initModal();
});

/* ================================
📩 YouTube iframe 제어
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

/* ================================
🎬 넷플릭스 스타일 hover 비디오
================================ */
function initHoverVideo() {
    const videoItems = document.querySelectorAll('[data-video-id]');
    let activeItem = null;

    videoItems.forEach(item => {
        const iframe = item.querySelector('iframe');
        const thumbnail = item.querySelector('.thumbnail');
        const videoId = item.dataset.videoId;

        if (!iframe || !thumbnail) return;

        // 썸네일 자동 세팅
        thumbnail.style.backgroundImage =
            `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`;

        item.addEventListener('mouseenter', () => {
            if (activeItem && activeItem !== item) {
                activeItem.classList.remove('playing');
                postMessageToIframe(
                    activeItem.querySelector('iframe'),
                    'pauseVideo'
                );
            }

            item.classList.add('playing');
            postMessageToIframe(iframe, 'playVideo');
            activeItem = item;
        });

        item.addEventListener('mouseleave', () => {
            item.classList.remove('playing');
            postMessageToIframe(iframe, 'pauseVideo');
            activeItem = null;
        });
    });
}


/* ================================
🔔 알림 드롭다운 스크롤 방지
================================ */
function initDropdownScroll() {
    const dropdowns = document.querySelectorAll('.dropdown-menu');

    dropdowns.forEach(menu => {
        menu.addEventListener('wheel', e => {
            const atTop = menu.scrollTop === 0;
            const atBottom =
                menu.scrollTop + menu.offsetHeight >= menu.scrollHeight - 1;

            if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
                e.preventDefault();
            }
        }, { passive: false });
    });
}

/* ================================
❤️ 찜 페이지 이동
================================ */
function initWishlistLink() {
    const wishlistLink =
        document.querySelector('.dropdown-menu a[href="wishlist.html"]');

    if (wishlistLink) {
        wishlistLink.addEventListener('click', e => {
            e.preventDefault();
            location.href = 'wishlist.html';
        });
    }
}

/* ================================
🎞️ TOP 10 슬라이더
================================ */
function initSlider() {
    const slider = document.querySelector('.slider');
    const wrapper = document.querySelector('.slider-wrapper');
    const dots = document.querySelectorAll('.dot');
    const card = document.querySelector('.card');

    if (!slider || !wrapper || !card) return;

    const gap = 16;
    const cardsPerPage = 4;
    let currentPage = 0;

    function getMaxTranslateX() {
        return slider.scrollWidth - wrapper.clientWidth;
    }

    function moveSlider(pageIndex) {
        const cardWidth = card.offsetWidth;
        const moveX = (cardWidth + gap) * cardsPerPage * pageIndex;
        const finalX = Math.min(moveX, getMaxTranslateX());
        slider.style.transform = `translateX(-${finalX}px)`;
    }

    function updateDots(index) {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index]?.classList.add('active');
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentPage = Number(dot.dataset.index);
            moveSlider(currentPage);
            updateDots(currentPage);
        });
    });

    setInterval(() => {
        currentPage = (currentPage + 1) % dots.length;
        moveSlider(currentPage);
        updateDots(currentPage);
    }, 5000);

    window.addEventListener('resize', () => moveSlider(currentPage));
}

/* ================================
💖 찜하기 기능
================================ */
function initWishlist() {
    document.querySelectorAll('.btn.ticket').forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.card');
            const source = card?.querySelector('.modal-trigger') || button;

            const { title, img, description } = source.dataset;

            const isLiked = button.classList.toggle('active');
            button.innerHTML = isLiked ? '❤️찜했어요' : '🤍찜하기';

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
}

/* ================================
🪟 모달 제어
================================ */
function initModal() {
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
} // ✅ initModal 닫힘
