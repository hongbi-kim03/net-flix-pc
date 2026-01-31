/* ==================================================
📩 YouTube iframe 공통 제어
================================================== */
function postMessageToIframe(iframe, command) {
    if (!iframe || !iframe.contentWindow) return;

    iframe.contentWindow.postMessage(
        JSON.stringify({
            event: "command",
            func: command,
            args: []
        }),
        "*"
    );
}

/* ==================================================
🎬 넷플릭스 배너 비디오 (사운드 + 스크롤 제어)
================================================== */
function initBannerVideo() {
    const banner = document.querySelector(".yt-background");
    const iframe = banner?.querySelector("iframe");
    const thumbnail = banner.querySelector(".thumbnail");
    const soundBtn = document.querySelector(".sound-toggle");
    const videoId = banner.dataset.videoId;

    if (!banner || !iframe || !soundBtn) return;

    let isMuted = true;

    /* =========================
        1️⃣ 썸네일 먼저 표시
    ========================= */
    thumbnail.style.backgroundImage =
        `url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)`;

    iframe.style.opacity = "0";
    iframe.style.pointerEvents = "none";

    /* =========================
        2️⃣ iframe 로딩 후 교체
    ========================= */
    iframe.addEventListener("load", () => {
        iframe.style.opacity = "1";
        thumbnail.style.opacity = "0";
        thumbnail.style.pointerEvents = "none";
    });

    /* =========================
        3️⃣ 초기 재생 (무음)
    ========================= */
    postMessageToIframe(iframe, "mute");
    postMessageToIframe(iframe, "playVideo");
    soundBtn.textContent = "🔇";

    /* =========================
        4️⃣ 사운드 토글
    ========================= */
    soundBtn.addEventListener("click", () => {
        if (isMuted) {
            postMessageToIframe(iframe, "unMute");
            soundBtn.textContent = "🔊";
        } else {
            postMessageToIframe(iframe, "mute");
            soundBtn.textContent = "🔇";
        }
        isMuted = !isMuted;
    });

    /* =========================
        5️⃣ 넷플릭스식 가시성 제어
    ========================= */
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                postMessageToIframe(iframe, "playVideo");
                postMessageToIframe(iframe, "mute");
                isMuted = true;
                soundBtn.textContent = "🔇";
            } else {
                postMessageToIframe(iframe, "pauseVideo");
            }
        },
        { threshold: 0.3 }
    );

    observer.observe(banner);
}

/* ==================================================
🎬 넷플릭스 스타일 Hover 비디오
================================================== */
function initHoverVideo() {
    const videoItems = document.querySelectorAll("[data-video-id]");
    let activeItem = null;

    videoItems.forEach(item => {
        const iframe = item.querySelector("iframe");
        const thumbnail = item.querySelector(".thumbnail");
        const videoId = item.dataset.videoId;

        if (!iframe || !thumbnail) return;

        thumbnail.style.backgroundImage =
            `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`;

        item.addEventListener("mouseenter", () => {
            if (activeItem && activeItem !== item) {
                activeItem.classList.remove("playing");
                postMessageToIframe(
                    activeItem.querySelector("iframe"),
                    "pauseVideo"
                );
            }

            item.classList.add("playing");
            postMessageToIframe(iframe, "playVideo");
            activeItem = item;
        });

        item.addEventListener("mouseleave", () => {
            if (activeItem === item) {
                item.classList.remove("playing");
                postMessageToIframe(iframe, "pauseVideo");
                activeItem = null;
            }
        });
    });
}

/* ==================================================
🔔 알림 드롭다운 스크롤 방지
================================================== */
function initDropdownScroll() {
    document.querySelectorAll(".dropdown-menu").forEach(menu => {
        menu.addEventListener(
            "wheel",
            e => {
                const atTop = menu.scrollTop === 0;
                const atBottom =
                    menu.scrollTop + menu.offsetHeight >=
                    menu.scrollHeight - 1;

                if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
                    e.preventDefault();
                }
            },
            { passive: false }
        );
    });
}

/* ==================================================
❤️ 찜 페이지 이동
================================================== */
function initWishlistLink() {
    const link = document.querySelector(
        '.dropdown-menu a[href="wishlist.html"]'
    );

    if (!link) return;

    link.addEventListener("click", e => {
        e.preventDefault();
        location.href = "wishlist.html";
    });
}

/* ==================================================
💖 찜하기 기능
================================================== */
function initWishlist() {
    document.querySelectorAll(".btn.ticket").forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".card");
            const source =
                card?.querySelector(".modal-trigger") || button;

            const { title, img, description } = source.dataset;

            const isLiked = button.classList.toggle("active");
            button.innerHTML = isLiked ? "❤️" : "🤍";

            let wishlist =
                JSON.parse(localStorage.getItem("wishlist")) || [];

            if (isLiked) {
                if (!wishlist.some(item => item.title === title)) {
                    wishlist.push({ title, img, description });
                }
            } else {
                wishlist = wishlist.filter(item => item.title !== title);
            }

            localStorage.setItem(
                "wishlist",
                JSON.stringify(wishlist)
            );
        });
    });
}

/* ==================================================
✅ 모달 기능 + 드래그 스크롤
================================================== */
function initModal() {
    const modal = document.getElementById("image-modal");
    if (!modal) return;

    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalCast = document.getElementById("modal-cast");
    const modalGenre = document.getElementById("modal-genre");
    const modalFeature = document.getElementById("modal-feature");
    const modalEpisodesContainer =
        document.getElementById("modal-episodes-container");
    const modalContent = modal.querySelector(".modal-content.wide");
    const closeBtn = modal.querySelector(".close");

    const chefTemplate =
        document.getElementById("episodes-chef")?.content;
    const noticeItem =
        document.querySelector('.notice-item[data-title="폭군의 셰프"]');

    if (!noticeItem || !chefTemplate) return;

    /* 📌 모달 열기 */
    noticeItem.addEventListener("click", () => {
        modalImg.src = "images/tyrant-chef-thumbnail.webp";
        modalTitle.textContent = "폭군의 셰프";
        modalDescription.innerHTML = `
            시간을 거슬러 과거로 가게 된 현대의 셰프가
            폭군으로 악명 높은 왕을 만난다.<br>
            그녀는 요리로 왕의 마음을 사로잡을 수 있을까?
        `;
        modalCast.textContent = "임윤아, 이세민, 강한나";
        modalGenre.textContent = "로맨틱한 드라마, 시대물";
        modalFeature.textContent = "유쾌 발랄, 로맨틱";

        modalEpisodesContainer.innerHTML = "";
        modalEpisodesContainer.appendChild(
            document.importNode(chefTemplate, true)
        );

        modal.classList.add("show");
        document.body.style.overflow = "hidden";

        modalEpisodesContainer
            .querySelectorAll("iframe")
            .forEach(iframe =>
                postMessageToIframe(iframe, "playVideo")
            );

        initEpisodeDrag();
    });

    /* ↔ 회차 가로 드래그 */
    function initEpisodeDrag() {
        const scroll =
            modalEpisodesContainer.querySelector(".episode-scroll");
        if (!scroll) return;

        let dragging = false;
        let startX = 0;
        let scrollLeft = 0;

        const start = x => {
            dragging = true;
            startX = x - scroll.offsetLeft;
            scrollLeft = scroll.scrollLeft;
            scroll.style.cursor = "grabbing";
        };

        const end = () => {
            dragging = false;
            scroll.style.cursor = "grab";
        };

        scroll.addEventListener("mousedown", e => start(e.pageX));
        scroll.addEventListener("mouseup", end);
        scroll.addEventListener("mouseleave", end);
        scroll.addEventListener("mousemove", e => {
            if (!dragging) return;
            const x = e.pageX - scroll.offsetLeft;
            scroll.scrollLeft =
                scrollLeft - (x - startX) * 2;
        });

        scroll.addEventListener("touchstart", e =>
            start(e.touches[0].pageX)
        );
        scroll.addEventListener("touchend", end);
        scroll.addEventListener("touchmove", e => {
            if (!dragging) return;
            const x = e.touches[0].pageX - scroll.offsetLeft;
            scroll.scrollLeft =
                scrollLeft - (x - startX) * 2;
        });
    }

    /* ❌ 모달 닫기 */
    function closeModal() {
        modalEpisodesContainer
            .querySelectorAll("iframe")
            .forEach(iframe =>
                postMessageToIframe(iframe, "pauseVideo")
            );

        modalEpisodesContainer.innerHTML = "";
        modal.classList.remove("show");
        document.body.style.overflow = "auto";
    }

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", e => {
        if (e.target === modal) closeModal();
    });
    window.addEventListener("keydown", e => {
        if (e.key === "Escape") closeModal();
    });
}

/* ==================================================
🚀 실행
================================================== */
document.addEventListener("DOMContentLoaded", () => {
    initBannerVideo();
    initHoverVideo();
    initDropdownScroll();
    initWishlistLink();
    initWishlist();
    initModal();
});
