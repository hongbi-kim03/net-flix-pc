// iframe 제어 함수
function postMessageToIframe(iframe, command) {
    if (!iframe || !iframe.contentWindow) return;
    iframe.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: command,
        args: []
    }), '*');
}

// 슬라이더 hover 시 video play/pause 적용
function setupIframeHover(selector) {
    const slides = document.querySelectorAll(selector);
    slides.forEach(slide => {
        const iframe = slide.querySelector('iframe');
        slide.addEventListener('mouseenter', () => postMessageToIframe(iframe, 'playVideo'));
        slide.addEventListener('mouseleave', () => postMessageToIframe(iframe, 'pauseVideo'));
    });

    window.addEventListener('load', () => {
        slides.forEach(slide => {
            const iframe = slide.querySelector('iframe');
            postMessageToIframe(iframe, 'pauseVideo');
        });
    });
}

// 마우스 드래그 슬라이더
function setupDragSlider(selector) {
    const slider = document.querySelector(selector);
    if (!slider) return;

    let isDragging = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        slider.classList.add('active');
        startX = e.pageX - slider.getBoundingClientRect().left;
        scrollLeft = slider.scrollLeft;

        // iframe 클릭 방지
        slider.querySelectorAll('iframe').forEach(iframe => {
            iframe.style.pointerEvents = 'none';
        });
    });

    slider.addEventListener('mouseleave', () => {
        isDragging = false;
        slider.classList.remove('active');
        slider.querySelectorAll('iframe').forEach(iframe => {
            iframe.style.pointerEvents = 'auto';
        });
    });

    slider.addEventListener('mouseup', () => {
        isDragging = false;
        slider.classList.remove('active');
        slider.querySelectorAll('iframe').forEach(iframe => {
            iframe.style.pointerEvents = 'auto';
        });
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - slider.getBoundingClientRect().left;
        const walk = (x - startX) * 2; // 감도
        slider.scrollLeft = scrollLeft - walk;
    });
}

document.addEventListener('DOMContentLoaded', () => {

    // 🔔 알림 드롭다운 스크롤 방지
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach(menu => {
        menu.addEventListener('wheel', function (e) {
            const delta = e.deltaY;
            const up = delta < 0;
            const down = delta > 0;

            const atTop = menu.scrollTop === 0;
            const atBottom = menu.scrollTop + menu.offsetHeight >= menu.scrollHeight - 1;

            if ((up && atTop) || (down && atBottom)) {
                e.preventDefault();
            }
        }, { passive: false });
    });

    // 🎞️ TOP 10 슬라이더 + 자동 슬라이드
    const slider = document.querySelector('.slider');
    const dots = document.querySelectorAll('.dot');
    const cardsPerPage = 4;
    const cardWidth = 284;
    const gap = 16;
    const totalCards = document.querySelectorAll('.card').length;
    const totalPages = Math.ceil(totalCards / cardsPerPage);
    let currentPage = 0;

    function moveSlider(pageIndex) {
        const moveX = (cardWidth + gap) * cardsPerPage * pageIndex;
        if (slider) {
            slider.style.transform = `translateX(-${moveX}px)`;
        }
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
            moveSlider(index);
            updateDots(index);
            currentPage = index;
        });
    });

    setInterval(() => {
        currentPage = (currentPage + 1) % totalPages;
        moveSlider(currentPage);
        updateDots(currentPage);
    }, 5000);

    // ❤️ 찜하기 애니메이션
    const ticketButtons = document.querySelectorAll('.btn.ticket');
    ticketButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            btn.innerHTML = btn.classList.contains('active')
                ? '<span class="heart">❤️</span> 찜했어요'
                : '<span class="heart">🤍</span> 찜하기';

            const heartIcon = btn.querySelector('.heart');
            heartIcon.style.animation = 'none';
            requestAnimationFrame(() => {
                heartIcon.style.animation = '';
            });
        });
    });

    // 📦 모달
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

    function openModal(btn) {
        if (!modal.classList.contains("show")) {
            lastFocusedElement = document.activeElement;

            const imgSrc = btn.getAttribute("data-img");
            const title = btn.getAttribute("data-title");
            const description = btn.getAttribute("data-description");
            const cast = btn.getAttribute("data-cast");
            const genre = btn.getAttribute("data-genre");
            const feature = btn.getAttribute("data-feature");

            modalImg.src = imgSrc || "#";
            modalImg.alt = title || "모달 이미지";
            modalTitle.textContent = title || "";
            modalDescription.innerHTML = description || "";
            modalCast.textContent = cast?.trim() ? cast : "-";
            modalGenre.textContent = genre || "";
            modalFeature.textContent = feature || "";

            // 회차 템플릿
            const templates = {
                "폭군의 셰프": "episodes-chef",
                "에스콰이어": "episodes-esquire",
                "애마": "episodes-aema",
                "웬즈데이 시즌 2": "episodes-wednesday",
                "귀멸의 갈날 합동강화훈련편": "episodes-demon-slayer",
                "한탕프로젝트 마이턴": "episodes-myturn",
                "섬총각 영웅": "episodes-island-hero",
                "트리거": "episodes-trigger",
                "트라이": "episodes-try",
                "나는 생존자다": "episodes-survivor",
            };

            const templateId = templates[title];
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

    detailButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            openModal(btn);
        });
    });

    closeBtn?.addEventListener("click", closeModal);
    window.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });

    // 모달 드래그 스크롤
    let isDraggingModal = false;
    let startY, scrollTop;

    modalContent.addEventListener("mousedown", (e) => {
        isDraggingModal = true;
        startY = e.pageY - modalContent.offsetTop;
        scrollTop = modalContent.scrollTop;
        modalContent.style.cursor = "grabbing";
    });

    modalContent.addEventListener("mouseleave", () => {
        isDraggingModal = false;
        modalContent.style.cursor = "default";
    });

    modalContent.addEventListener("mouseup", () => {
        isDraggingModal = false;
        modalContent.style.cursor = "default";
    });

    modalContent.addEventListener("mousemove", (e) => {
        if (!isDraggingModal) return;
        e.preventDefault();
        const y = e.pageY - modalContent.offsetTop;
        const walk = (y - startY) * 1.5;
        modalContent.scrollTop = scrollTop - walk;
    });

    // 🎬 각 슬라이드 hover 시 iframe 재생
    setupIframeHover('.slide');
    setupIframeHover('.top10-slide');
    setupIframeHover('.drama.slide');

    // 🖱️ 슬라이더 드래그 기능
    setupDragSlider('.watching-content');
    setupDragSlider('.top10-slider');
    setupDragSlider('.movies-content');
});

