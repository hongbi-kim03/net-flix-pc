// ================================
// 1. 프로필 드롭다운 메뉴
// ================================
const profileBtn = document.getElementById("profile-btn");
const dropdown = document.getElementById("dropdown");

profileBtn.addEventListener("click", () => {
    profileBtn.classList.toggle("active");
    dropdown.classList.toggle("active");
});

// 화면 클릭 시 드롭다운 닫기
document.addEventListener("click", (e) => {
    if (!profileBtn.contains(e.target) && !dropdown.contains(e.target)) {
        profileBtn.classList.remove("active");
        dropdown.classList.remove("active");
    }
});

// ================================
// 2. 비밀번호 보이기/숨기기 기능
// ================================
const passwordIcons = document.querySelectorAll(".password-icon");

passwordIcons.forEach(icon => {
    // mousedown으로 blur 방지
    icon.addEventListener("mousedown", (e) => {
        e.preventDefault();
    });

    icon.addEventListener("click", () => {
        const targetId = icon.getAttribute("data-target");
        const input = document.getElementById(targetId);

        const isHidden = input.type === "password";
        input.type = isHidden ? "text" : "password";

        // 아이콘 이미지 변경
        icon.style.backgroundImage = isHidden
            ? "url('images/unlock_icon.png')"
            : "url('images/lock_icon.png')";

        // 아이콘 활성 상태 저장
        icon.classList.toggle("active", !isHidden);

        // 클릭 후 포커스 유지
        input.focus();
    });
});

// ================================
// 3. 입력 초기화 및 유효성 검사
// ================================
function resetInput(input) {
    input.classList.remove("error");
    const errorElement = document.getElementById(input.id + "-error");
    if (errorElement) {
        errorElement.textContent = "";
    }
}

function passwordOnblur() {
    const newPassword = document.getElementById("new-password");
    const errorElement = document.getElementById("new-password-error");

    if (newPassword.value.length < 6 || newPassword.value.length > 60) {
        errorElement.textContent = "비밀번호는 6~60자 사이여야 합니다.";
        newPassword.classList.add("error");
    } else {
        errorElement.textContent = "";
        newPassword.classList.remove("error");
    }
}

// ================================
// 4. 입력 클릭 시 아이콘 보이도록 제어
// ================================
const pwInputs = document.querySelectorAll('.pw-input-group input');

pwInputs.forEach(input => {
    input.addEventListener('focus', () => {
        const icon = input.parentElement.querySelector('.password-icon');
        if (icon) icon.style.opacity = '1';
    });

    // blur 시 아이콘 숨기기 -> 클릭 활성 상태면 숨기지 않음
    input.addEventListener('blur', () => {
        const icon = input.parentElement.querySelector('.password-icon');
        if (icon && !icon.classList.contains('active')) {
            icon.style.opacity = '0';
        }
    });
});

// ================================
// 5. 폼 제출
// ================================
const form = document.getElementById("pw-change-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const oldPw = document.getElementById("old-password");
    const newPw = document.getElementById("new-password");
    const confirmPw = document.getElementById("confirm-password");

    let valid = true;

    // 기존 비밀번호 체크
    if (!oldPw.value) {
        document.getElementById("old-password-error").textContent = "기존 비밀번호를 입력하세요.";
        oldPw.classList.add("error");
        valid = false;
    }

    // 새 비밀번호 체크
    if (newPw.value.length < 6 || newPw.value.length > 60) {
        document.getElementById("new-password-error").textContent = "비밀번호는 6~60자 사이여야 합니다.";
        newPw.classList.add("error");
        valid = false;
    }

    // 새 비밀번호 확인 체크
    if (confirmPw.value !== newPw.value) {
        document.getElementById("confirm-password-error").textContent = "비밀번호가 일치하지 않습니다.";
        confirmPw.classList.add("error");
        valid = false;
    }

    if (valid) {
        alert("비밀번호가 성공적으로 변경되었습니다!");
        // 실제 서버 요청은 여기서 수행
        form.reset();

        // 아이콘 초기화
        passwordIcons.forEach(icon => {
            icon.style.opacity = '0';
            icon.style.backgroundImage = "url('images/lock_icon.png')";
            icon.classList.remove("active");
        });
    }
});
