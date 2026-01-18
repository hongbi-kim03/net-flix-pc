document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("gift-code");
    const useBtn = document.querySelector(".use-btn");

    // 메시지 요소 생성
    const message = document.createElement("p");
    message.style.marginTop = "14px";
    message.style.fontSize = "14px";
    message.style.display = "none";
    document.querySelector(".gift-content").appendChild(message);

    // 버튼 클릭 이벤트
    useBtn.addEventListener("click", () => {
        const value = input.value.trim();

        // 1️⃣ 입력값 없음
        if (value === "") {
            showMessage("기프트 코드를 입력해주세요.", "error");
            input.focus();
            return;
        }

        // 2️⃣ 로딩 상태
        useBtn.disabled = true;
        useBtn.textContent = "확인 중...";
        showMessage("코드를 확인하고 있습니다.", "loading");

        // 3️⃣ 서버 통신 시뮬레이션
        setTimeout(() => {
            // 퍼블리싱용 더미 조건
            if (value.length >= 8) {
                showMessage("기프트 카드가 성공적으로 사용되었습니다!", "success");
                input.value = "";
            } else {
                showMessage("유효하지 않은 기프트 코드입니다.", "error");
            }

            useBtn.disabled = false;
            useBtn.textContent = "사용하기";
        }, 1500);
    });

    // 메시지 출력 함수
    function showMessage(text, type) {
        message.textContent = text;
        message.style.display = "block";

        if (type === "success") {
            message.style.color = "#2ecc71";
        } else if (type === "error") {
            message.style.color = "#e50914";
        } else {
            message.style.color = "#555";
        }
    }
});
