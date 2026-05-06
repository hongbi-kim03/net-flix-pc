document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('wishlist-container');
    const countElement = document.getElementById('wishlist-count');
    
    // 로컬 스토리지에서 데이터 불러오기
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // 리스트 렌더링 함수
    function renderWishlist() {
        container.innerHTML = '';
        
        // 찜 목록이 없을 때
        if (wishlist.length === 0) {
            countElement.textContent = '';
            container.innerHTML = `
                <div class="empty-message">
                    <span style="font-size: 3rem;">📝</span>
                    <p>찜한 콘텐츠가 없습니다.<br>나만의 리스트를 채워보세요!</p>
                    <a href="index.html" class="explore-btn">새로운 작품 보러 가기</a>
                </div>`;
            return;
        }

        // 찜 목록이 있을 때
        countElement.textContent = `총 ${wishlist.length}개의 작품을 찜했어요 💖`;

        wishlist.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('wishlist-item');

            card.innerHTML = `
                <img src="${item.img}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <button class="remove-btn" title="찜 취소">✕</button>
            `;

            container.appendChild(card);

            // 카드 클릭 이벤트: 확장/축소 (PC/Mobile 공통)
            card.addEventListener('click', (e) => {
                // 삭제 버튼을 눌렀을 때는 카드 확장 로직 실행 안 함
                if (e.target.classList.contains('remove-btn')) return;

                // 이미 활성화된 상태인지 확인
                const isActive = card.classList.contains('active');

                // 다른 카드가 열려있다면 닫아주기 (하나만 펼쳐지게 함)
                document.querySelectorAll('.wishlist-item').forEach(c => {
                    if (c !== card) c.classList.remove('active');
                });

                // 현재 카드 토글
                card.classList.toggle('active');
            });

            // 삭제 버튼 이벤트
            card.querySelector('.remove-btn').addEventListener('click', (e) => {
                e.stopPropagation(); // 카드 클릭 이벤트로 전파 방지
                
                wishlist.splice(index, 1);
                localStorage.setItem('wishlist', JSON.stringify(wishlist));
                renderWishlist(); // 재렌더링
            });
        });
    }

    // 카드 밖(빈 공간)을 클릭하면 모든 카드 닫기
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.wishlist-item')) {
            document.querySelectorAll('.wishlist-item').forEach(c => c.classList.remove('active'));
        }
    });

    // 초기 실행
    renderWishlist();
});