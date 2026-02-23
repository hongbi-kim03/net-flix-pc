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
        const placeItems = document.querySelectorAll('.place-item');
        const footerAddrLink = document.querySelector(".footer-address-link");

        // 1) 검색창 포커스 이벤트
        if (keywordInput && searchOverlay) {
            keywordInput.addEventListener('focus', () => searchOverlay.classList.add('active'));
            document.addEventListener('click', (e) => {
                if (!searchOverlay.contains(e.target)) searchOverlay.classList.remove('active');
            });
        }

        // 2) 추천 장소 아이템 클릭 이벤트
        placeItems.forEach(item => {
            item.addEventListener('click', function() {
                const lat = parseFloat(this.getAttribute('data-lat'));
                const lng = parseFloat(this.getAttribute('data-lng'));
                const name = this.getAttribute('data-name');
                if (lat && lng) moveToLocation(lat, lng, name);
            });
        });

        // 3) 푸터 주소 클릭 시 지도 이동 로직 (추가됨 ✨)
        if (footerAddrLink && mapWrapper) {
            footerAddrLink.addEventListener("click", (e) => {
                e.preventDefault();

                const lat = parseFloat(footerAddrLink.getAttribute("data-lat")) || 37.5709;
                const lng = parseFloat(footerAddrLink.getAttribute("data-lng")) || 126.9829;
                const name = footerAddrLink.getAttribute("data-name") || "센트로폴리스";

                // 지도로 부드럽게 스크롤
                const headerHeight = 60;
                const elementPosition = mapWrapper.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

                window.scrollTo({ top: offsetPosition, behavior: "smooth" });

                // 스크롤 완료 시점에 맞춰 지도 이동
                setTimeout(() => {
                    moveToLocation(lat, lng, name);
                }, 400);
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