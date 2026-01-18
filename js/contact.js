/* -----------------------------
    유저 드롭다운
----------------------------- */
const userDropdown = document.querySelector('.user-dropdown');

userDropdown.addEventListener('click', (e) => {
    userDropdown.classList.toggle('active');
    e.stopPropagation();
});

document.addEventListener('click', () => {
    userDropdown.classList.remove('active');
});


/* -----------------------------
    문의 제출 폼 처리
----------------------------- */
const inquiryForm = document.getElementById("inquiryForm");

inquiryForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const category = document.getElementById("category").value;
    const title = document.getElementById("title").value;
    const message = document.getElementById("message").value;
    const fileInput = document.getElementById("file");
    const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : "첨부 없음";

    const inquiry = {
        category,
        title,
        message,
        fileName,
        date: new Date().toLocaleString(),
    };

    let list = JSON.parse(localStorage.getItem("inquiries")) || [];
    list.unshift(inquiry);

    localStorage.setItem("inquiries", JSON.stringify(list));

    alert("문의가 성공적으로 접수되었습니다!");
    this.reset();

    loadInquiries();
});



/* -----------------------------
    문의 내역 리스트
----------------------------- */
const listEl = document.querySelector("#history-list");

function loadInquiries() {
    const data = JSON.parse(localStorage.getItem("inquiries")) || [];

    listEl.innerHTML = "";

    if (data.length === 0) {
        listEl.innerHTML = `<li class="empty">등록된 문의가 없습니다.</li>`;
        return;
    }

    data.forEach((item, index) => {
        const li = document.createElement("li");

        /* 전체 펼쳐진 보기모드 */
        li.innerHTML = `
            <div class="view-mode">
                <div class="inquiry-top">
                    <span class="inquiry-subject">${item.title}</span>
                    <span class="inquiry-date">${item.date}</span>

                    <div class="history-actions">
                        <button class="edit-btn">✎</button>
                        <button class="delete-btn">×</button>
                    </div>
                </div>

                <div class="inquiry-content" style="display:block;">
                    <p><strong>문의 유형:</strong> ${item.category}</p>
                    <p><strong>첨부 파일:</strong> ${item.fileName || "첨부 없음"}</p>
                    <p><strong>내용:</strong><br>${item.message}</p>
                </div>
            </div>

            <!-- 수정 모드 -->
            <div class="edit-mode" style="display:none;">
                <label>문의 유형</label>
                <select class="edit-category">
                    <option ${item.category === "계정 문제" ? "selected" : ""}>계정 문제</option>
                    <option ${item.category === "비밀번호/로그인 문제" ? "selected" : ""}>비밀번호/로그인 문제</option>
                    <option ${item.category === "결제/요금" ? "selected" : ""}>결제/요금</option>
                    <option ${item.category === "재생 오류" ? "selected" : ""}>재생 오류</option>
                    <option ${item.category === "기타" ? "selected" : ""}>기타</option>
                </select>

                <label>제목</label>
                <input type="text" class="edit-title" value="${item.title}">

                <label>내용</label>
                <textarea class="edit-message" rows="5">${item.message}</textarea>

                <label>첨부 파일 수정</label>
                <input type="file" class="edit-file">

                <button class="save-btn">저장</button>
                <button class="cancel-btn">취소</button>
            </div>
        `;


        /* ==========================
            삭제
        ========================== */
        li.querySelector(".delete-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            if (!confirm("문의 내역을 삭제하시겠습니까?")) return;

            data.splice(index, 1);
            localStorage.setItem("inquiries", JSON.stringify(data));
            loadInquiries();
        });

        /* ==========================
            수정 모드 활성화
        ========================== */
        li.querySelector(".edit-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            li.querySelector(".view-mode").style.display = "none";
            li.querySelector(".edit-mode").style.display = "block";
        });

        /* ==========================
            수정 취소
        ========================== */
        li.querySelector(".cancel-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            li.querySelector(".edit-mode").style.display = "none";
            li.querySelector(".view-mode").style.display = "block";
        });

        /* ==========================
            수정 저장
        ========================== */
        li.querySelector(".save-btn").addEventListener("click", (e) => {
            e.stopPropagation();

            const newCategory = li.querySelector(".edit-category").value;
            const newTitle = li.querySelector(".edit-title").value;
            const newMessage = li.querySelector(".edit-message").value;

            const newFileInput = li.querySelector(".edit-file");
            const newFileName =
                newFileInput.files.length > 0
                    ? newFileInput.files[0].name
                    : item.fileName;

            // 저장
            data[index].category = newCategory;
            data[index].title = newTitle;
            data[index].message = newMessage;
            data[index].fileName = newFileName;

            localStorage.setItem("inquiries", JSON.stringify(data));

            loadInquiries();
        });

        listEl.appendChild(li);
    });
}

loadInquiries();