// 이메일 유효성 검사
function validateEmail() {
    const emailField = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(emailField.value)) {
        emailError.textContent = '유효한 이메일 주소나 휴대폰 번호를 입력하세요.';
        emailField.classList.add('error'); // 테두리를 빨간색으로 변경
    } else {
        emailError.textContent = ''; // 오류 메시지 제거
        emailField.classList.remove('error'); // 테두리 원래 상태로
    }
}

function passwordOnblur() {
    validatePassword();
}


// 비밀번호 유효성 검사
function validatePassword() {
    const passwordField = document.getElementById('password');
    const passwordError = document.getElementById('password-error');

    if (passwordField.value.length < 4 || passwordField.value.length > 60) {
        passwordError.textContent = '비밀번호는 4~60자 사이여야 합니다.';
        passwordField.classList.add('error'); // 테두리를 빨간색으로 변경
    } else {
        passwordError.textContent = ''; // 오류 메시지 제거
        passwordField.classList.remove('error'); // 테두리 원래 상태로
    }
}

/* 비밀번호 감추기,보이기 기능 */
function togglePassword() {
    const input = document.getElementById("password");
    const passwordIcon = document.getElementById("password-icon");
    let isVisible = input.type === "password";

    input.type = isVisible ? "text" : "password";

    passwordIcon.style.backgroundImage = isVisible ? "url(images/unlock-icon.png)" : "url(images/lock-icon.png)";

    // 아이콘 보이기 설정
    passwordIcon.style.opacity = 1; // 항상 보이도록 설정

    // 포커스를 유지 (클릭 후에도 input에 포커스 유지)
    //input.focus();
}

function showToggle() {
    document.getElementById("toggleBtn").style.display = "block";
}

function hideToggle() {
    document.getElementById("toggleBtn").style.display = "none";
}


// 입력 필드를 클릭했을 때 오류 메시지와 빨간색 테두리 초기화
function resetInput(input) {
    input.classList.remove('error');
    const errorElement = document.getElementById(input.id + '-error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

// 로그인 폼 제출
const form = document.getElementById('login-form');
form.addEventListener('submit', function (e) {
    e.preventDefault(); // 폼 제출 막기

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let emailError = document.getElementById('email-error');
    let passwordError = document.getElementById('password-error');

    let valid = true;

    // 이메일 유효성 검사
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = '유효한 이메일 주소나 휴대폰 번호를 입력하세요.';
        valid = false;
    } else {
        emailError.textContent = '';
    }

    // 비밀번호 유효성 검사
    if (password.length < 4 || password.length > 60) {
        passwordError.textContent = '비밀번호는 4~60자 사이여야 합니다.';
        valid = false;
    } else {
        passwordError.textContent = '';
    }

    if (valid) {
        alert('로그인 성공');
        window.location.href = "dashboard.html";
    }
});