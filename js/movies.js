/* ==============================
   ✅ iframe 제어 함수
============================== */
function postMessageToIframe(iframe, command) {
    if (!iframe || !iframe.contentWindow) return;
    iframe.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: command,
        args: []
    }), '*');
}

/* ==============================
   ✅ 드롭다운 메뉴 스크롤 방지
============================== */
const dropdowns = document.querySelectorAll('.dropdown-menu');

dropdowns.forEach(menu => {
    menu.addEventListener('wheel', function(e) {
        const delta = e.deltaY;
        const up = delta < 0;
        const down = delta > 0;

        const scrollTop = menu.scrollTop;
        const scrollHeight = menu.scrollHeight;
        const offsetHeight = menu.offsetHeight;

        const atTop = scrollTop === 0;
        const atBottom = scrollTop + offsetHeight >= scrollHeight - 1;

        if ((up && atTop) || (down && atBottom)) {
            e.preventDefault();
        }
    }, { passive: false });
});

/* ==============================
   ✅ 가로 드래그 슬라이더 + iframe 통합
============================== */
function makeDraggableSlider(sliderSelector) {
    const slider = document.querySelector(sliderSelector);
    if (!slider) return;

    const slides = slider.querySelectorAll('.slide, .top10-slide, .drama.slide');

    slides.forEach(slide => {
        const iframe = slide.querySelector('iframe');
        if (!iframe) return;

        slide.addEventListener('mouseenter', () => postMessageToIframe(iframe, 'playVideo'));
        slide.addEventListener('mouseleave', () => postMessageToIframe(iframe, 'pauseVideo'));
    });

    window.addEventListener('load', () => {
        slides.forEach(slide => {
            const iframe = slide.querySelector('iframe');
            if (!iframe) return;
            postMessageToIframe(iframe, 'pauseVideo');
        });
    });

    let isDragging = false;
    let startX, scrollLeft;

    slider.addEventListener('mousedown', e => {
        isDragging = true;
        slider.classList.add('active');
        startX = e.pageX - slider.getBoundingClientRect().left;
        scrollLeft = slider.scrollLeft;

        slides.forEach(slide => {
            const iframe = slide.querySelector('iframe');
            if (iframe) iframe.style.pointerEvents = 'none';
        });
    });

    ['mouseup', 'mouseleave'].forEach(evt => {
        slider.addEventListener(evt, () => {
            isDragging = false;
            slider.classList.remove('active');
            slides.forEach(slide => {
                const iframe = slide.querySelector('iframe');
                if (iframe) iframe.style.pointerEvents = 'auto';
            });
        });
    });

    slider.addEventListener('mousemove', e => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - slider.getBoundingClientRect().left;
        slider.scrollLeft = scrollLeft - (x - startX) * 2;
    });

    // 터치 이벤트
    slider.addEventListener('touchstart', e => {
        isDragging = true;
        startX = e.touches[0].pageX - slider.getBoundingClientRect().left;
        scrollLeft = slider.scrollLeft;
        slides.forEach(slide => {
            const iframe = slide.querySelector('iframe');
            if (iframe) iframe.style.pointerEvents = 'none';
        });
    });

    slider.addEventListener('touchend', () => {
        isDragging = false;
        slides.forEach(slide => {
            const iframe = slide.querySelector('iframe');
            if (iframe) iframe.style.pointerEvents = 'auto';
        });
    });

    slider.addEventListener('touchmove', e => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - slider.getBoundingClientRect().left;
        slider.scrollLeft = scrollLeft - (x - startX) * 2;
    });
}

/* ==============================
   ✅ 슬라이더 적용
============================== */
makeDraggableSlider('.watching-content');
makeDraggableSlider('.top10-slider');
makeDraggableSlider('.movies-content');

/* ==============================
   ✅ 모달 기능 + 드래그 스크롤
============================== */
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalCast = document.getElementById("modal-cast");
    const modalGenre = document.getElementById("modal-genre");
    const modalFeature = document.getElementById("modal-feature");
    const modalEpisodesContainer = document.getElementById("modal-episodes-container");
    const modalContent = modal.querySelector(".modal-content.wide");
    const closeBtn = modal.querySelector(".close");
    const chefTemplate = document.getElementById("episodes-chef").content;

    const noticeItem = document.querySelector('.notice-item[data-title="폭군의 셰프"]');
    if (noticeItem) {
        noticeItem.addEventListener("click", () => {
            modalImg.src = "images/tyrant-chef-thumbnail.webp";
            modalTitle.textContent = "폭군의 셰프";
            modalDescription.innerHTML = `시간을 거슬러 과거로 가게된 현대의 셰프가 폭군으로 악명 높은 왕을 만난다.<br>
                                        그녀는 탁월한 요리 솜씨로 왕의 마음과 입맛을 모두 사로잡을 수 있을까?`;
            modalCast.textContent = "임윤아, 이세민, 강한나";
            modalGenre.textContent = "로맨틱한 드라마, 드라마, 시대물";
            modalFeature.textContent = "유쾌 발랄, 로맨틱";

            modalEpisodesContainer.innerHTML = "";
            const clone = document.importNode(chefTemplate, true);
            modalEpisodesContainer.appendChild(clone);

            modal.classList.add("show");
            document.body.style.overflow = "hidden";

            const iframes = modalEpisodesContainer.querySelectorAll("iframe");
            iframes.forEach(iframe => postMessageToIframe(iframe, 'playVideo'));

            // 회차 가로 드래그
            const episodeScroll = modalEpisodesContainer.querySelector(".episode-scroll");
            let epDragging = false, epStartX = 0, epScrollLeft = 0;

            const startEpDrag = x => { epDragging = true; epStartX = x - episodeScroll.offsetLeft; epScrollLeft = episodeScroll.scrollLeft; };
            const endEpDrag = () => { epDragging = false; };
            episodeScroll.addEventListener('mousedown', e => { startEpDrag(e.pageX); episodeScroll.style.cursor="grabbing"; });
            episodeScroll.addEventListener('mouseup', e => { endEpDrag(); episodeScroll.style.cursor="grab"; });
            episodeScroll.addEventListener('mouseleave', e => { endEpDrag(); episodeScroll.style.cursor="grab"; });
            episodeScroll.addEventListener('mousemove', e => {
                if (!epDragging) return;
                e.preventDefault();
                const x = e.pageX - episodeScroll.offsetLeft;
                episodeScroll.scrollLeft = epScrollLeft - (x - epStartX) * 2;
            });
            episodeScroll.addEventListener('touchstart', e => startEpDrag(e.touches[0].pageX));
            episodeScroll.addEventListener('touchend', endEpDrag);
            episodeScroll.addEventListener('touchmove', e => {
                if (!epDragging) return;
                const x = e.touches[0].pageX - episodeScroll.offsetLeft;
                episodeScroll.scrollLeft = epScrollLeft - (x - epStartX) * 2;
            });
        });
    }

    // 모달 내부 세로 드래그
    let contentDragging = false, startY = 0, scrollTop = 0;
    modalContent.addEventListener("mousedown", e => {
        contentDragging = true;
        startY = e.pageY - modalContent.offsetTop;
        scrollTop = modalContent.scrollTop;
        modalContent.style.cursor = "grabbing";
    });
    modalContent.addEventListener("mouseup", () => { contentDragging = false; modalContent.style.cursor="default"; });
    modalContent.addEventListener("mouseleave", () => { contentDragging = false; modalContent.style.cursor="default"; });
    modalContent.addEventListener("mousemove", e => {
        if (!contentDragging) return;
        e.preventDefault();
        const y = e.pageY - modalContent.offsetTop;
        const walk = (y - startY) * 1.5;
        modalContent.scrollTop = scrollTop - walk;
    });
    modalContent.addEventListener("touchstart", e => {
        contentDragging = true;
        startY = e.touches[0].pageY - modalContent.offsetTop;
        scrollTop = modalContent.scrollTop;
    });
    modalContent.addEventListener("touchend", () => { contentDragging = false; });
    modalContent.addEventListener("touchmove", e => {
        if (!contentDragging) return;
        const y = e.touches[0].pageY - modalContent.offsetTop;
        const walk = (y - startY) * 1.5;
        modalContent.scrollTop = scrollTop - walk;
    });

    // 모달 닫기
    function closeModal() {
        const iframes = modalEpisodesContainer.querySelectorAll("iframe");
        iframes.forEach(iframe => postMessageToIframe(iframe, 'pauseVideo'));
        modalEpisodesContainer.innerHTML = "";
        modal.classList.remove("show");
        document.body.style.overflow = "auto";
    }
    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
    window.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
});