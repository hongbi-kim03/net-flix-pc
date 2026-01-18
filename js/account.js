document.addEventListener('DOMContentLoaded', () => {
  const profileBtn = document.getElementById('profile-btn');
  const dropdown = document.getElementById('dropdown');

  if (!profileBtn || !dropdown) return;

  const toggleDropdown = () => {
    dropdown.classList.toggle('active');
    profileBtn.classList.toggle('active'); // 화살표 회전용
  };

  const closeDropdown = (event) => {
    if (!profileBtn.contains(event.target) && !dropdown.contains(event.target)) {
      dropdown.classList.remove('active');
      profileBtn.classList.remove('active');
    }
  };

  // 클릭 시 열기 / 닫기
  profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown();
  });

  // 키보드 접근성
  profileBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDropdown();
    }
  });

  // 외부 클릭 시 닫기
  document.addEventListener('click', closeDropdown);

  // ESC 키로 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdown.classList.remove('active');
      profileBtn.classList.remove('active');
    }
  });
});
