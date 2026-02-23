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
