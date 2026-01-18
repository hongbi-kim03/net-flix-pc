/* ==================================================
    DOM READY
================================================== */
document.addEventListener('DOMContentLoaded', () => {

    initProfileDropdown();
    initTabs();
    initFavoriteButton();
    initShareButton();
    initReviewWrite();
    initTrailerSlider();
    initStillcutSlider();

});

/* ==================================================
    1. 프로필 드롭다운
================================================== */
function initProfileDropdown() {
    const profileBtn = document.getElementById('profile-btn');
    const dropdown = document.getElementById('dropdown');

    if (!profileBtn || !dropdown) return;

    profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        profileBtn.classList.toggle('active');
        dropdown.classList.toggle('active');
    });

    document.addEventListener('click', () => {
        profileBtn.classList.remove('active');
        dropdown.classList.remove('active');
    });
}

/* ==================================================
    2. 탭 전환
================================================== */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-menu li button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    if (!tabButtons.length || !tabPanels.length) return;

    tabButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.parentElement.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            btn.parentElement.classList.add('active');
            tabPanels[index].classList.add('active');
        });
    });
}

/* ==================================================
    3. 상단 찜하기 버튼
================================================== */
function initFavoriteButton() {
    const favoriteBtn = document.querySelector('.detail-hero .btn-like');
    if (!favoriteBtn) return;

    let isLiked = false;

    favoriteBtn.addEventListener('click', () => {
        isLiked = !isLiked;
        favoriteBtn.textContent = isLiked ? '❤️' : '♡';
        favoriteBtn.setAttribute('aria-label', isLiked ? '찜 해제' : '찜하기');
    });
}

/* ==================================================
    4. 공유하기 버튼
================================================== */
function initShareButton() {
    const shareButton = document.querySelector('.btn-share');
    if (!shareButton) return;

    shareButton.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert('링크가 복사되었습니다!');
        } catch {
            alert('복사에 실패했습니다.');
        }
    });
}

/* ==================================================
    5. 관람평 작성 + 동기화
================================================== */
function initReviewWrite() {

    const reviewLists = document.querySelectorAll('.review-list');
    if (!reviewLists.length) return;

    const STORAGE_KEY = 'userReviews';

    /* 저장된 리뷰 불러오기 */
    loadStoredReviews();

    document.querySelectorAll('.review-write').forEach((reviewSection) => {

        const textarea = reviewSection.querySelector('.review-input');
        const countText = reviewSection.querySelector('.text-count');
        const cancelBtn = reviewSection.querySelector('.btn-cancel');
        const submitBtn = reviewSection.querySelector('.btn-submit');
        const ratingInputs = reviewSection.querySelectorAll('input[name="rating"]');

        textarea.addEventListener('focus', () => {
            reviewSection.classList.add('active');
        });

        textarea.addEventListener('input', () => {
            const length = textarea.value.length;
            countText.textContent = `${length} / 300`;
            submitBtn.disabled = length === 0;
        });

        cancelBtn.addEventListener('click', resetForm);

        submitBtn.addEventListener('click', () => {
            const content = textarea.value.trim();
            const rating = [...ratingInputs].find(i => i.checked)?.value;

            if (!content) return alert('관람평 내용을 입력해주세요.');
            if (!rating) return alert('별점을 선택해주세요.');

            const reviewData = {
                id: Date.now(),
                user: 'user123',
                rating,
                content,
                date: getToday()
            };

            saveReview(reviewData);
            renderReview(reviewData);
            resetForm();
        });

        function resetForm() {
            textarea.value = '';
            countText.textContent = '0 / 300';
            submitBtn.disabled = true;
            ratingInputs.forEach(i => i.checked = false);
            reviewSection.classList.remove('active');
        }
    });

    /* ===============================
    6. 저장 / 불러오기
    =============================== */
    function saveReview(review) {
        const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || [];
        stored.unshift(review);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    }

    function loadStoredReviews() {
        const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || [];
        stored.forEach(renderReview);
    }

    /* ===============================
    7. 렌더링 (모든 리스트 동기화)
    =============================== */
    function renderReview({ id, user, rating, content, date }) {
        reviewLists.forEach(list => {
            const li = document.createElement('li');
            li.className = 'review-card';
            li.dataset.id = id;

            li.innerHTML = `
                <div class="review-inner">
                    <div class="review-avatar">
                        <img src="images/icon-user.png" alt="유저 아이콘">
                    </div>
                    <div class="review-content">
                        <div class="review-top">
                            <span class="review-user">${user}</span>
                            <span class="review-date">${date}</span>
                        </div>
                        <div class="review-rating">
                            ${renderStars(rating)} <span class="score">${rating}.0</span>
                        </div>
                        <p class="review-text">${content}</p>
                        <div class="review-actions">
                            <button class="btn-like">👍 0</button>
                            <button class="btn-delete">취소</button>
                        </div>
                    </div>
                </div>
            `;
            list.prepend(li);
        });
    }

    /* ===============================
    8. 삭제 (동기화)
    =============================== */
    reviewLists.forEach(list => {
        list.addEventListener('click', (e) => {
            if (!e.target.classList.contains('btn-delete')) return;

            const card = e.target.closest('.review-card');
            const id = Number(card.dataset.id);

            if (!confirm('이 관람평을 삭제할까요?')) return;

            const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || [];
            sessionStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(stored.filter(r => r.id !== id))
            );

            document
                .querySelectorAll(`.review-card[data-id="${id}"]`)
                .forEach(el => el.remove());
        });
    });

    function renderStars(score) {
        return '★★★★★☆☆☆☆☆'.slice(5 - score, 10 - score);
    }

    function getToday() {
        const d = new Date();
        return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
    }
}

/* ==================================================
    9. 예고편 슬라이더
================================================== */
function initTrailerSlider() {
    const slider = document.querySelector('.trailer-slider');
    if (!slider) return;

    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;
    let velocity = 0;
    let rafId;

    const stopMomentum = () => {
        cancelAnimationFrame(rafId);
        velocity = 0;
    };

    const momentum = () => {
        slider.scrollLeft += velocity;
        velocity *= 0.92;
        if (Math.abs(velocity) > 0.4) {
            rafId = requestAnimationFrame(momentum);
        }
    };

    slider.addEventListener('mousedown', (e) => {
        if (e.target.tagName === 'IFRAME') return;
        isDragging = true;
        slider.classList.add('dragging');
        startX = e.pageX;
        scrollStart = slider.scrollLeft;
        stopMomentum();
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const prev = slider.scrollLeft;
        slider.scrollLeft = scrollStart - (e.pageX - startX) * 1.05;
        velocity = slider.scrollLeft - prev;
    });

    const endDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        slider.classList.remove('dragging');
        momentum();
    };

    slider.addEventListener('mouseup', endDrag);
    slider.addEventListener('mouseleave', endDrag);
}

/* ==================================================
    10. 스틸컷 슬라이더
================================================== */
function initStillcutSlider() {
    const slider = document.querySelector('.stillcut-slider');
    if (!slider) return;

    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;
    let velocity = 0;
    let rafId;

    const stopMomentum = () => {
        cancelAnimationFrame(rafId);
        velocity = 0;
    };

    const momentum = () => {
        slider.scrollLeft += velocity;
        velocity *= 0.92;
        if (Math.abs(velocity) > 0.4) {
            rafId = requestAnimationFrame(momentum);
        }
    };

    slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        slider.classList.add('dragging');
        startX = e.pageX;
        scrollStart = slider.scrollLeft;
        stopMomentum();
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const prev = slider.scrollLeft;
        slider.scrollLeft = scrollStart - (e.pageX - startX) * 1.05;
        velocity = slider.scrollLeft - prev;
    });

    const endDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        slider.classList.remove('dragging');
        momentum();
    };

    slider.addEventListener('mouseup', endDrag);
    slider.addEventListener('mouseleave', endDrag);
}


