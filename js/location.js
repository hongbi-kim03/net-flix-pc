document.addEventListener("DOMContentLoaded", () => {
    /* ===============================
        1. 일반 UI 인터렉션 (스크롤, 뒤로가기)
    =============================== */
    
    // 지도 영역으로 스무스 스크롤
    const scrollMapBtn = document.getElementById("scrollMap");
    const mapWrapper = document.querySelector(".map-wrapper"); 

    if (scrollMapBtn && mapWrapper) {
        scrollMapBtn.addEventListener("click", () => {
            const headerHeight = 60; // 고정 헤더 높이
            // 현재 화면 기준 mapWrapper의 위치 계산
            const elementPosition = mapWrapper.getBoundingClientRect().top;
            // 현재 스크롤 위치 + 요소 위치 - 헤더 높이 - 여유 공간(20px)
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });
    }

    // 뒤로가기 버튼
    const backBtn = document.querySelector(".back-link");
    if (backBtn) {
        backBtn.addEventListener("click", (e) => {
            if (window.history.length > 1) {
                e.preventDefault();
                history.back();
            }
        });
    }

    // 스크롤 시 헤더 스타일 변경
    const header = document.querySelector(".header");
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 30) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

    /* ============================================================
        🍔 2. 모바일 햄버거 메뉴 (터치 + 스와이프 지원) - 함수 정의
    ============================================================ */
    function initMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const mobileGnb = document.querySelector('.mobile-gnb');
        const mobileOverlay = document.querySelector('.mobile-overlay');
        const accordionBtns = document.querySelectorAll('.accordion-btn');
        const PC_WIDTH = 1280;

        if (!hamburger || !mobileGnb || !mobileOverlay) return;

        let startX = 0;
        let currentX = 0;

        function resetAccordion() {
            document.querySelectorAll('.accordion-menu').forEach(menu => menu.classList.remove('active'));
            accordionBtns.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
        }

        function openMenu() {
            hamburger.classList.add('active');
            mobileGnb.classList.add('active');
            mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            hamburger.classList.remove('active');
            mobileGnb.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            resetAccordion();
        }

        // 햄버거 버튼 클릭
        hamburger.addEventListener('click', () => {
            mobileGnb.classList.contains('active') ? closeMenu() : openMenu();
        });

        // 오버레이 클릭 시 닫기
        mobileOverlay.addEventListener('click', closeMenu);

        // 메뉴 링크 클릭 시 효과 후 닫기
        mobileGnb.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileGnb.querySelectorAll('a').forEach(a => a.classList.remove('active'));
                link.classList.add('active');
                setTimeout(closeMenu, 300);
            });
        });

        // ESC 키로 닫기
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeMenu();
        });

        // 아코디언 메뉴 제어
        accordionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const targetId = btn.dataset.target;
                const menu = document.getElementById(targetId);
                const isOpen = menu.classList.contains('active');
                btn.setAttribute('aria-expanded', !isOpen);
                menu.classList.toggle('active');
            });
        });

        // 스와이프 기능 (오른쪽으로 밀어서 닫기)
        mobileGnb.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
            currentX = startX;
        }, { passive: true });

        mobileGnb.addEventListener('touchmove', e => {
            currentX = e.touches[0].clientX;
        }, { passive: true });

        mobileGnb.addEventListener('touchend', () => {
            const diffX = currentX - startX;
            if (diffX > 80) closeMenu();
            startX = 0; currentX = 0;
        });

        // 화면 리사이즈 대응
        window.addEventListener('resize', () => {
            if (window.innerWidth >= PC_WIDTH) closeMenu();
        });
    }

    // 🚀 페이지 로드 시 메뉴 초기화 호출
    initMobileMenu();


    /* ===============================
        2. 카카오 맵 API 로드 및 초기화
    =============================== */
    const JS_KEY = '94c7ed320aa1b2f40a5507539a09c179';
    
    if (window.kakao && window.kakao.maps) {
        initMap();
    } else {
        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${JS_KEY}&autoload=false&libraries=services`;
        script.onload = () => {
            kakao.maps.load(() => {
                initMap();
            });
        };
        document.head.appendChild(script);
    }

    function initMap() {
        const container = document.getElementById('map'); 
        if (!container) return;

        const netflixCoords = new kakao.maps.LatLng(37.5709, 126.9829);
        const options = {
            center: netflixCoords,
            level: 3
        };

        const map = new kakao.maps.Map(container, options);
        
        // 초기 마커 설정
        const marker = new kakao.maps.Marker({ 
            position: netflixCoords 
        });
        marker.setMap(map);
        
        // 전역 변수로 노출
        window.kakaoMap = map;
        window.kakaoPs = new kakao.maps.services.Places(); 
        window.currentMarker = marker; // 마커 업데이트를 위해 저장

        console.log("✅ 지도가 성공적으로 로드되었습니다!");
        
        // 지도가 로드된 후 검색 인터렉션 실행
        initSearchInteractions();

        // ✨ [추가] index.html에서 ?move=true 파라미터를 들고 왔을 때 자동 실행 로직
        checkUrlParameters();
    }

// ✨ [최종 수정] URL 파라미터 체크 함수
    function checkUrlParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        
        if (urlParams.get('move') === 'true') {
            const mapWrapper = document.querySelector(".map-wrapper"); 
            
            if (mapWrapper) {
                // 1. "지도에서 보기" 클릭 시와 동일한 계산법 적용
                const headerHeight = 60; 
                const elementPosition = mapWrapper.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

                // 2. 부드러운 효과 없이 '즉시' 해당 위치로 화면을 고정 (상단 노출 방지)
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "instant" // smooth 대신 instant를 사용하여 즉시 이동
                });

                // 3. 지도 마커 및 중심점 업데이트
                setTimeout(() => {
                    const lat = 37.5709;
                    const lng = 126.9829;
                    const name = "센트로폴리스 A동";
                    moveToLocation(lat, lng, name);
                }, 50); 
            }
        }
    }

    /* ===============================
        3. 검색 및 추천 리스트 인터렉션 
    =============================== */
    function initSearchInteractions() {
        const keywordInput = document.getElementById('keyword');
        const searchOverlay = document.querySelector('.search-overlay');
        const searchBtn = document.querySelector('.search-btn'); // 1) 검색 버튼 선택
        const placeItems = document.querySelectorAll('.place-item');
        const footerAddrLink = document.querySelector(".footer-address-link");

        // [핵심] 검색 수행 로직
        const performSearch = () => {
        const query = keywordInput.value.trim();
        if (!query) return;

        let matchedItem = null;

        // 모든 장소를 돌며 입력한 단어(query)가 포함되어 있는지 확인
        placeItems.forEach(item => {
            const name = item.getAttribute('data-name');
            // includes를 사용하여 "넷"만 쳐도 "넷플릭스..."를 찾아냄
            if (name.includes(query)) {
                matchedItem = item;
            }
        });

        if (matchedItem) {
            const lat = parseFloat(matchedItem.getAttribute('data-lat'));
            const lng = parseFloat(matchedItem.getAttribute('data-lng'));
            const name = matchedItem.getAttribute('data-name');
            moveToLocation(lat, lng, name);
        } else {
            alert("일치하는 장소를 찾을 수 없습니다.");
        }
    };

        // 1) 검색창 호버/포커스 시 리스트 노출
        const showList = () => {
            if (searchOverlay) searchOverlay.classList.add('active');
        };

        if (keywordInput && searchOverlay) {
            keywordInput.addEventListener('focus', showList);
            keywordInput.addEventListener('mouseenter', showList);

            // [추가] 검색창에서 엔터키 입력 시 검색 실행
            keywordInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') performSearch();
            });

            // 외부 클릭 시 리스트 닫기 (검색창 제외)
            document.addEventListener('click', (e) => {
                if (!searchOverlay.contains(e.target) && e.target !== keywordInput) {
                    searchOverlay.classList.remove('active');
                }
            });
        }

        // [추가] 검색 버튼 클릭 시 검색 실행
        if (searchBtn) {
            searchBtn.addEventListener('click', performSearch);
        }

        // 2) 추천 장소 아이템 클릭 시 맵 이동
        placeItems.forEach(item => {
            item.addEventListener('click', function() {
                const lat = parseFloat(this.getAttribute('data-lat'));
                const lng = parseFloat(this.getAttribute('data-lng'));
                const name = this.getAttribute('data-name');
                
                if (lat && lng) {
                    // 지도 이동 함수 호출
                    moveToLocation(lat, lng, name);
                    
                    // 이동 후 검색창에 값 입력 및 리스트 닫기
                    if (keywordInput) keywordInput.value = name;
                    searchOverlay.classList.remove('active');
                }
            });
        });

        // 3) 푸터 주소 클릭 시 지도 이동 (기존 로직 유지)
        if (footerAddrLink && mapWrapper) {
            footerAddrLink.addEventListener("click", (e) => {
                e.preventDefault();
                const lat = parseFloat(footerAddrLink.getAttribute("data-lat")) || 37.5709;
                const lng = parseFloat(footerAddrLink.getAttribute("data-lng")) || 126.9829;
                const name = footerAddrLink.getAttribute("data-name") || "센트로폴리스";

                // 스무스 스크롤 후 이동
                window.scrollTo({ 
                    top: mapWrapper.getBoundingClientRect().top + window.pageYOffset - 80, 
                    behavior: "smooth" 
                });
                setTimeout(() => moveToLocation(lat, lng, name), 400);
            });
        }
    }

    // 지도 이동 및 마커 업데이트 함수
    function moveToLocation(lat, lng, name) {
        if (!window.kakaoMap) return;

        const loc = new kakao.maps.LatLng(lat, lng);
        window.kakaoMap.panTo(loc);

        if (window.currentMarker) window.currentMarker.setMap(null);
        window.currentMarker = new kakao.maps.Marker({ position: loc, map: window.kakaoMap });

        const keywordInput = document.getElementById('keyword');
        const searchOverlay = document.querySelector('.search-overlay');
        
        if (keywordInput) keywordInput.value = name;
        if (searchOverlay) searchOverlay.classList.remove('active');
    }
});