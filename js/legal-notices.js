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