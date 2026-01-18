
document.addEventListener('DOMContentLoaded', () => {
    /* ================================
    🔑 키워드 및 배경 전환
    ================================= */
    const popularKeywords = [
        { name: "피지컬 아시아", category: "reality", bg: "images/physical-asia.webp" },
        { name: "서울자가에 대기업다니는 김부장이야기", category: "kcontent", bg: "images/seoul-kim.webp" },
        { name: "태풍상사", category: "kcontent", bg: "images/taepoong.jpg" },
        { name: "다 이루어질 지니", category: "romance", bg: "images/wish-genie.jpg" },
        { name: "우리들의 발라드", category: "romance", bg: "images/ballad.webp" },
        { name: "나는 solo", category: "reality", bg: "images/solo.jpg" },
        { name: "내겐 너무까칠한 매니저 비서진", category: "comedy", bg: "images/manager.jpg" },
        { name: "퍼스트레이디", category: "flobal", bg: "images/firstlady.jpg" },
        { name: "체인소 맨", category: "action", bg: "images/chainsaw.jpg" },
        { name: "로맨틱 어나니머스", category: "romance", bg: "images/romantic.jpg" }
    ];

    const leftList = document.getElementById('popular-left');
    const rightList = document.getElementById('popular-right');
    const boxes = document.querySelectorAll('.category-box');
    const backgroundContainer = document.querySelector('.background-container');
    const popularContainer = document.querySelector('.popular-container');

    if (backgroundContainer && popularContainer) {
        popularContainer.prepend(backgroundContainer);
    }
    // ✅ 리스트 렌더링
    function renderList(filter = "all") {
        leftList.innerHTML = '';
        rightList.innerHTML = '';
        
        const filtered = popularKeywords.filter(k => filter === 'all' || k.category === filter);
        if (filtered.length === 0) {
            backgroundContainer.style.backgroundImage = "none";
            return;
        }

        filtered.forEach((keyword, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${index + 1}</strong> ${keyword.name}`;
            li.addEventListener('click', () => {
            // ❌ 페이지 이동 없음
            // window.location.href = `result.html?query=${encodeURIComponent(keyword.name)}`;
            
            // 나중에 검색 결과 JS 처리용으로만 사용 가능
            console.log(keyword.name);
            });

            if (index < 5) leftList.appendChild(li);
            else rightList.appendChild(li);
        });
        }

    renderList();

        /* ================================
        🌟 자동 강조 + 배경 전환 (최신순)
        ================================= */
        let highlightInterval;
        let currentIndex = 0;

        function stopHighlightAnimation() {
        clearInterval(highlightInterval);
        currentIndex = 0;
        }

        function startHighlightAnimation() {
        stopHighlightAnimation();
        const allItems = [...leftList.children, ...rightList.children];
        if (allItems.length === 0) return;

        highlightInterval = setInterval(() => {
            allItems.forEach(li => li.classList.remove('active'));
            const current = allItems[currentIndex];
            if (current) {
            current.classList.add('active');

            const keywordName = current.textContent.replace(/\d+\s*/, "").trim();
            const keyword = popularKeywords.find(k => k.name === keywordName);

            if (keyword && keyword.bg) {
                backgroundContainer.style.transition = "opacity 0.5s ease, transform 0.5s ease";
                backgroundContainer.style.opacity = 0;
                backgroundContainer.style.transform = "scale(1.05)";
                setTimeout(() => {
                backgroundContainer.style.backgroundImage = `url(${keyword.bg})`;
                backgroundContainer.style.opacity = 0.7;
                backgroundContainer.style.transform = "scale(1)";
                }, 500);
            }
            }
            currentIndex = (currentIndex + 1) % allItems.length;
        }, 2000); // 강조 속도 2초
        }

        function startCategoryHighlightAnimation(category) {
        stopHighlightAnimation();
        const filtered = popularKeywords.filter(k => k.category === category);
        const allItems = [...leftList.children, ...rightList.children];
        if (filtered.length === 0 || allItems.length === 0) return;

        currentIndex = 0;
        highlightInterval = setInterval(() => {
            allItems.forEach(li => li.classList.remove('active'));

            const currentKeyword = filtered[currentIndex];
            const currentLi = Array.from(allItems).find(li => li.textContent.includes(currentKeyword.name));
            if (currentLi) currentLi.classList.add('active');

            if (currentKeyword && currentKeyword.bg) {
            backgroundContainer.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            backgroundContainer.style.opacity = 0;
            backgroundContainer.style.transform = "scale(1.05)";
            setTimeout(() => {
                backgroundContainer.style.backgroundImage = `url(${currentKeyword.bg})`;
                backgroundContainer.style.opacity = 0.7;
                backgroundContainer.style.transform = "scale(1)";
            }, 500);
            }

            currentIndex = (currentIndex + 1) % filtered.length;
        }, 2000);
    }

        startHighlightAnimation();

        // ✅ 카테고리 클릭 이벤트
        boxes.forEach(box => {
        box.addEventListener('click', () => {
            boxes.forEach(b => b.classList.remove('active'));
            box.classList.add('active');

            const category = box.dataset.category;
            renderList(category);

            if (category === 'all') startHighlightAnimation();
            else startCategoryHighlightAnimation(category);
        });
        });

        /* ================================
        🍔 햄버거 메뉴 토글
        ================================= */
        const hamburger = document.querySelector('.hamburger');
        const gnb = document.querySelector('nav.gnb.mobile');
        const body = document.body;

        hamburger.addEventListener('click', () => {
        const isOpen = gnb.classList.toggle('active');
        hamburger.classList.toggle('active');
        body.classList.toggle('menu-open', isOpen);
        });

        gnb.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            gnb.classList.remove('active');
            hamburger.classList.remove('active');
            body.classList.remove('menu-open');
        });
        });

        document.body.addEventListener('click', (e) => {
        if (body.classList.contains('menu-open') &&
            !e.target.closest('nav.gnb') &&
            !e.target.closest('.hamburger')) {
            gnb.classList.remove('active');
            hamburger.classList.remove('active');
            body.classList.remove('menu-open');
        }
        });

        /* ================================
        🔍 검색 아이콘 UX 개선
        ================================= */
        const searchIcon = document.querySelector('.search-icon');
        const searchInput = document.getElementById('search-input');

        if (searchIcon && searchInput) {
        searchIcon.addEventListener('click', () => searchInput.focus());
        }

    });