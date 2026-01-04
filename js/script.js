// js/script.js
(function () {
    const ACCOUNTS = [
        { nickname: "admin", password: "admin" },
        { nickname: "kawan", password: "kawan" }
    ];

    const modal = document.getElementById('loginModal');
    const loginForm = document.getElementById('loginForm');
    const nicknameInput = document.getElementById('nickname');
    const passwordInput = document.getElementById('password');
    const navRight = document.querySelector('.nav-right');
    const requireLoginLinks = document.querySelectorAll('.require-login');

    function openModal() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.style.overflow = '';
        }, 400);
    }

    requireLoginLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (!localStorage.getItem('isLoggedIn')) {
                openModal();
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('login-btn')) {
            e.preventDefault();
            openModal();
        }
    });

    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nickname = nicknameInput.value.trim();
        const password = passwordInput.value;

        const user = ACCOUNTS.find(acc => acc.nickname === nickname && acc.password === password);

        if (user) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('nickname', user.nickname);
            closeModal();
            window.location.href = 'dashboard.html';
        } else {
            showErrorPopup('Nickname atau password salah.');
        }
    });

    function showErrorPopup(message) {
        let popup = document.getElementById('errorPopup');
        if (popup) popup.remove();

        popup = document.createElement('div');
        popup.id = 'errorPopup';
        popup.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <span>${message}</span>
                <button id="closePopupBtn" style="
                    background: none;
                    border: none;
                    font-size: 1.2rem;
                    cursor: pointer;
                    padding: 0;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">×</button>
            </div>
            <div id="popupProgress" style="
                height: 4px;
                background: #ddd;
                border-radius: 2px;
                overflow: hidden;
                width: 100%;
                margin-top: 8px;
            ">
                <div id="popupBar" style="
                    height: 100%;
                    width: 100%;
                    background: #061D42;
                    transition: width 3s linear;
                "></div>
            </div>
        `;

        document.body.appendChild(popup);

        document.getElementById('closePopupBtn').addEventListener('click', () => {
            popup.classList.add('closing');
            setTimeout(() => {
                if (popup.parentNode) popup.remove();
            }, 300);
        });

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const bar = document.getElementById('popupBar');
                if (bar) bar.style.width = '0%';
            });
        });

        setTimeout(() => {
            popup.classList.add('closing');
            setTimeout(() => {
                if (popup.parentNode) popup.remove();
            }, 300);
        }, 3000);
    }

    // Mobile
    document.getElementById('hamburgerBtn')?.addEventListener('click', () => {
        document.getElementById('mobileSidebar')?.classList.add('active');
    });

    document.getElementById('closeSidebar')?.addEventListener('click', () => {
        document.getElementById('mobileSidebar')?.classList.remove('active');
    });

    if (document.querySelector('.login-btn-mobile')) {
        document.querySelector('.login-btn-mobile').addEventListener('click', () => {
            // Tutup sidebar terlebih dahulu
            const mobileSidebar = document.getElementById('mobileSidebar');
            if (mobileSidebar) {
                mobileSidebar.classList.remove('active');
            }
            // Baru tampilkan modal
            openModal();
        });
    }
})();