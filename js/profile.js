document.addEventListener('DOMContentLoaded', () => {

  /* ================================
      1) 우측 상단 프로필 드롭다운
  ================================= */
  const profileBtn = document.getElementById('profile-btn');
  const dropdown = document.getElementById('dropdown');

  if (profileBtn && dropdown) {
    const toggleDropdown = () => {
      dropdown.classList.toggle('active');
      profileBtn.classList.toggle('active'); 
    };

    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown();
    });

    profileBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleDropdown();
      }
    });
  }

  /* ================================
      2) 프로필 이미지 ACTIVE 효과
  ================================= */
  const profileImages = document.querySelectorAll('.profiles img');
  profileImages.forEach(img => {
    img.addEventListener('click', () => {
      profileImages.forEach(i => i.classList.remove('active'));
      img.classList.add('active');
    });
  });

  /* ================================
    현재 프로필 표시 기능
================================ */

document.addEventListener('DOMContentLoaded', () => {
  const profileItems = document.querySelectorAll('.profile-item');

  function updateCurrentProfile(name) {
    // 모든 현재 프로필 태그 숨기기
    document.querySelectorAll('.current-profile-tag').forEach(tag => tag.style.display = 'none');

    profileItems.forEach(item => {
      const profileName = item.querySelector('.profile-name').textContent;
      if (profileName === name) {
        const tag = item.querySelector('.current-profile-tag');
        if (tag) tag.style.display = 'inline-block';
      }
    });

    // localStorage 저장
    localStorage.setItem("currentProfile", name);
  }

  // 프로필 클릭 시
  profileItems.forEach(item => {
    const name = item.querySelector('.profile-name').textContent;
    item.addEventListener('click', () => {
      updateCurrentProfile(name);
    });
  });

  // 페이지 로드 시 기존 저장된 값 반영
  const savedCurrentProfile = localStorage.getItem("currentProfile");
  if (savedCurrentProfile) {
    updateCurrentProfile(savedCurrentProfile);
  } else if (profileItems.length > 0) {
    // 저장된 값 없으면 첫 번째 프로필 기본 표시
    const firstName = profileItems[0].querySelector('.profile-name').textContent;
    updateCurrentProfile(firstName);
  }
});

  /* ================================
      3) 프로필 설정 메뉴
  ================================= */
  const settingBtns = document.querySelectorAll('.profile-settings-btn');
  settingBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const menu = btn.nextElementSibling;

      document.querySelectorAll('.profile-menu').forEach(m => {
        if (m !== menu) m.style.display = 'none';
      });

      menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    });
  });

  /* ================================
      4) 바깥 클릭 시 메뉴 닫기
  ================================= */
  document.addEventListener('click', (e) => {
    if (profileBtn && dropdown) {
      if (!profileBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
        profileBtn.classList.remove('active');
      }
    }

    document.querySelectorAll('.profile-menu').forEach(menu => {
      menu.style.display = 'none';
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (dropdown) dropdown.classList.remove('active');
      if (profileBtn) profileBtn.classList.remove('active');
      document.querySelectorAll('.profile-menu').forEach(menu => {
        menu.style.display = 'none';
      });
      if (modal) modal.classList.remove('active');
    }
  });

  /* ================================
      5) 오른쪽 클릭 → 설정 페이지 이동
  ================================= */
  document.querySelectorAll('.profile-settings-btn').forEach(btn => {
    btn.addEventListener('contextmenu', function(event) {
      event.preventDefault();
      window.location.href = 'profile-settings.html';
    });
  });

  /* ================================
      6) 프로필 추가 기능
  ================================= */
const addProfileBtn = document.getElementById('add-profile');
const modal = document.getElementById('modal');
const saveProfileBtn = document.getElementById('save-profile');
const cancelProfileBtn = document.getElementById('cancel-profile');
const closeModalBtn = document.getElementById('close-modal'); // 모달 내부 X 버튼


/* ================================
  모달 이미지 선택 기능
================================ */
const modalImages = document.querySelectorAll('.image-select img');

modalImages.forEach(img => {
  img.setAttribute('tabindex', '0');          // 키보드 접근 가능
  img.setAttribute('role', 'radio');          // ARIA 라디오 버튼 역할
  img.setAttribute('aria-checked', 'false');  // 선택 여부 초기화

  // 클릭
  img.addEventListener('click', () => selectAvatar(img));

  // 키보드 선택
  img.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectAvatar(img);
    }
  });
});

function selectAvatar(targetImg) {
    if (targetImg.classList.contains('selected')) {
      // 이미 선택된 이미지를 다시 클릭하면 선택 해제
      targetImg.classList.remove('selected');
      targetImg.setAttribute('aria-checked', 'false');
    } else {
      // 다른 이미지 선택 시 기존 선택 초기화
      modalImages.forEach(img => {
        img.classList.remove('selected');
        img.setAttribute('aria-checked', 'false');
      });
      targetImg.classList.add('selected');
      targetImg.setAttribute('aria-checked', 'true');
    }
  }

  /* ================================
      모달 열기 / 닫기
  ================================= */
// 공통 함수: 모달 닫기 + 초기화
function closeModal() {
  modal.classList.remove('active');
  document.getElementById('profile-name').value = "";
  document.querySelectorAll('.image-select img').forEach(img => img.classList.remove('selected'));
}

// 모달 열기
addProfileBtn.addEventListener('click', () => {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';  // 스크롤 막기
});

// 공통 함수: 모달 닫기 + 초기화
function closeModal() {
  modal.classList.remove('active');
  document.getElementById('profile-name').value = "";
  document.querySelectorAll('.image-select img').forEach(img => img.classList.remove('selected'));
  document.body.style.overflow = '';        // 스크롤 원래대로
}

// 모달 배경 클릭 시 닫기
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

  /* ================================
      저장 버튼
  ================================= */
saveProfileBtn.addEventListener('click', () => {
  const name = document.getElementById('profile-name').value.trim();
  const selectedImg = document.querySelector('.image-select img.selected'); // 선택된 이미지만

  if (!name) {
    alert("이름을 입력하세요.");
    return;
  }

  if (!selectedImg) {
    alert("이미지를 선택하세요.");
    return;
  }

  let profileList = JSON.parse(localStorage.getItem("profiles")) || [];
  const newProfile = { name, img: selectedImg.src };
  profileList.push(newProfile);

  localStorage.setItem("profiles", JSON.stringify(profileList));
  addProfileToDOM(newProfile);

  closeModal();
});

// 취소 버튼
cancelProfileBtn.addEventListener('click', closeModal);

// 모달 내부 X 버튼
if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal);
}


  /* ================================
      7) 페이지 로드 시 기존 + localStorage 프로필 표시
  ================================= */
  const savedProfiles = JSON.parse(localStorage.getItem("profiles")) || [];
  savedProfiles.forEach(profile => addProfileToDOM(profile));

  // 기존 HTML에 있는 프로필 삭제 버튼 이벤트 적용
  const existingProfileItems = document.querySelectorAll('.profile-item');
  existingProfileItems.forEach(item => {
    const deleteBtn = item.querySelector('.delete-profile-btn');
    if (!deleteBtn) return;

    const profileName = item.querySelector('.profile-name').textContent;
    const profileImg = item.querySelector('img').src;

    deleteBtn.addEventListener('click', () => {
      const allProfiles = document.querySelectorAll('.profile-item');
      if (allProfiles.length <= 1) {
        alert("최소 1개의 프로필은 남겨야 합니다.");
        return;
      }

      if (confirm(`${profileName} 프로필을 삭제하시겠습니까?`)) {
        let profiles = JSON.parse(localStorage.getItem("profiles")) || [];
        profiles = profiles.filter(p => !(p.name === profileName && p.img === profileImg));
        localStorage.setItem("profiles", JSON.stringify(profiles));

        item.remove();
      }
    });
  });

});

/* ================================
    DOM에 프로필 추가 + 삭제 버튼 적용
================================ */
function addProfileToDOM(profile) {
  const container = document.querySelector('.profiles');

  const div = document.createElement('div');
  div.classList.add('profile-item');

  div.innerHTML = `
    <img src="${profile.img}" alt="${profile.name}">
    <span class="profile-name">${profile.name}</span>
    <button class="profile-settings-btn">▶</button>
    <button class="delete-profile-btn">✕</button>
  `;

  container.insertBefore(div, document.getElementById('add-profile'));

  // 삭제 버튼
  const deleteBtn = div.querySelector('.delete-profile-btn');
  deleteBtn.addEventListener('click', () => {
    const allProfiles = document.querySelectorAll('.profile-item');
    if (allProfiles.length <= 1) {
      alert("최소 1개의 프로필은 남겨야 합니다.");
      return;
    }

    if (confirm(`${profile.name} 프로필을 삭제하시겠습니까?`)) {
      let profiles = JSON.parse(localStorage.getItem("profiles")) || [];
      profiles = profiles.filter(p => !(p.name === profile.name && p.img === profile.img));
      localStorage.setItem("profiles", JSON.stringify(profiles));

      div.remove();
    }
  });

  // 설정 버튼
  const settingsBtn = div.querySelector('.profile-settings-btn');
  settingsBtn.addEventListener('click', () => {
    location.href = 'profile-settings.html';
  });
}


	if ('WebSocket' in window) {
		(function () {
			function refreshCSS() {
				var sheets = [].slice.call(document.getElementsByTagName("link"));
				var head = document.getElementsByTagName("head")[0];
				for (var i = 0; i < sheets.length; ++i) {
					var elem = sheets[i];
					var parent = elem.parentElement || head;
					parent.removeChild(elem);
					var rel = elem.rel;
					if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
						var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
						elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
					}
					parent.appendChild(elem);
				}
			}
			var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
			var address = protocol + window.location.host + window.location.pathname + '/ws';
			var socket = new WebSocket(address);
			socket.onmessage = function (msg) {
				if (msg.data == 'reload') window.location.reload();
				else if (msg.data == 'refreshcss') refreshCSS();
			};
			if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
				console.log('Live reload enabled.');
				sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
			}
		})();
	}
	else {
		console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
	}
