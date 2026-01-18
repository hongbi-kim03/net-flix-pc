/* -----------------------------
    유저 드롭다운
----------------------------- */
const profileBtn = document.getElementById("profile-btn");
const dropdown = document.getElementById("dropdown");

profileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("active");
    profileBtn.classList.toggle("active");
});

// 드롭다운 내부 클릭 시 닫히지 않도록
dropdown.addEventListener("click", (e) => {
    e.stopPropagation();
});

document.addEventListener("click", () => {
    dropdown.classList.remove("active");
    profileBtn.classList.remove("active");
});


/* ---------------------
    DEVICE TOGGLE
---------------------- */
const summaries = document.querySelectorAll(".device-summary");

summaries.forEach((btn) => {
    btn.addEventListener("click", () => {
        const detail = btn.nextElementSibling;
        const arrow = btn.querySelector(".right");

        const isOpen = detail.classList.contains("open");

        detail.classList.toggle("open");
        btn.setAttribute("aria-expanded", !isOpen);

        // 화살표 회전
        arrow.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
    });
});

/* -----------------------------
    개별 로그아웃 버튼
----------------------------- */
document.querySelectorAll(".logout-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const deviceCard = btn.closest(".device-card");
        const deviceId = deviceCard.dataset.deviceId;

        // 화면에서 제거
        deviceCard.remove();

        // sessionStorage에 제거된 디바이스 ID 저장
        let removedDevices = JSON.parse(sessionStorage.getItem("removedDevices") || "[]");
        if (!removedDevices.includes(deviceId)) {
            removedDevices.push(deviceId);
        }
        sessionStorage.setItem("removedDevices", JSON.stringify(removedDevices));
    });
});

/* -----------------------------
    페이지 로드 시 세션에 저장된 제거 항목 처리
----------------------------- */
window.addEventListener("DOMContentLoaded", () => {
    // F5 새로고침이면 removedDevices 초기화
    if (performance.getEntriesByType("navigation")[0].type === "reload") {
        sessionStorage.removeItem("removedDevices");
    }

    // 세션에 저장된 제거 항목 처리
    const removedDevices = JSON.parse(sessionStorage.getItem("removedDevices") || "[]");
    removedDevices.forEach(id => {
        const deviceCard = document.querySelector(`.device-card[data-device-id="${id}"]`);
        if (deviceCard) deviceCard.remove();
    });
});


/* -----------------------------
    페이지 로드 시 세션에 저장된 제거 항목 처리
----------------------------- */
window.addEventListener("DOMContentLoaded", () => {
    const removedDevices = JSON.parse(sessionStorage.getItem("removedDevices") || "[]");
    removedDevices.forEach(id => {
        const deviceCard = document.querySelector(`.device-card[data-device-id="${id}"]`);
        if (deviceCard) deviceCard.remove();
    });
});

/* -----------------------------
    전체 디바이스 로그아웃
----------------------------- */
const logoutAllBtn = document.querySelector(".logout-all-btn");

logoutAllBtn.addEventListener("click", () => {
    const confirmLogout = confirm("모든 디바이스에서 로그아웃하시겠습니까?");

    if (confirmLogout) {
        alert("모든 디바이스에서 로그아웃되었습니다.");
        window.location.href = "logout.html";
    }
});

