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
                case "웬즈데이 시즌 2": templateId = "episodes-wednesday"; break;
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
});