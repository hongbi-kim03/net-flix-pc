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
// 2. 멤버십 카드 선택 기능
// ================================
const plans = document.querySelectorAll(".plan");
const nextBtn = document.querySelector(".next-btn");
const selectedPlanText = document.querySelector(".selected-plan-text");

let selectedPlan = null;
const currentPlan = document.querySelector('[data-plan="standard"]');

plans.forEach(plan => {
    plan.addEventListener("click", () => {

        // 현재 멤버십 선택 불가
        if (plan.dataset.plan === "standard") {
            alert("현재 사용 중인 멤버십입니다.");
            return;
        }

        // 이미 선택된 카드 클릭 시 선택 취소
        if (plan.classList.contains("selected")) {
            plan.classList.remove("selected");
            selectedPlan = null;
            nextBtn.disabled = true;
            selectedPlanText.textContent = "선택한 멤버십: 없음";
            return;
        }

        // 다른 카드 선택 시 기존 선택 해제
        plans.forEach(p => p.classList.remove("selected"));
        plan.classList.add("selected");

        const planName = plan.querySelector("div").innerText.split("\n")[0];
        selectedPlan = plan.dataset.plan;
        selectedPlanText.textContent = `선택한 멤버십: ${planName}`;
        nextBtn.disabled = false;
        console.log("선택한 멤버십:", selectedPlan);
    });
});

// ================================
// 3. 다음 버튼 클릭 이벤트 (예시)
// ================================
nextBtn.addEventListener("click", () => {
    if (selectedPlan) {
        alert(`${selectedPlanText.textContent}을 선택했습니다.`);
        // 실제 멤버십 변경 로직 추가 가능
    }
});