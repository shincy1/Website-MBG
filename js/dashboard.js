// js/dashboard.js
(function () {
    function isLoggedIn() {
        return localStorage.getItem('isLoggedIn') === 'true';
    }

    // Redirect ke index jika belum login
    if (!isLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }

    // Tampilkan sambutan di navbar
    const nickname = localStorage.getItem('nickname');
    document.getElementById('welcomeText').textContent = `Selamat Datang, ${nickname}`;

    // Hitung statistik
    const totalPenerima = new Set(dataMBG.map(item => item.penerima)).size;
    const totalPorsi = dataMBG.reduce((sum, item) => sum + item.porsi, 0);
    const totalLunas = dataMBG.filter(item => item.status_bayar === 'Lunas').length;

    // Render card
    const cardsContainer = document.getElementById('statCards');
    const cardData = [
        { title: 'Total Penerima', info: `${totalPenerima} Instansi`, icon: 'img/icons/location.png' },
        { title: 'Porsi Tersalurkan', info: `${totalPorsi} Porsi`, icon: 'img/icons/food.png' },
        { title: 'Pembayaran Lunas', info: `${totalLunas} Instansi`, icon: 'img/icons/money.png' }
    ];

    cardsContainer.innerHTML = cardData.map(card => `
        <div class="stat-card">
            <div class="card-icon">
                <img src="${card.icon}" alt="Icon">
            </div>
            <div class="card-content">
                <div class="card-title">${card.title}</div>
                <div class="card-info">${card.info}</div>
            </div>
        </div>
    `).join('');

    // Logout
    document.querySelector('.logout-btn').addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('nickname');
        window.location.href = 'index.html';
    });

    // Mobile
    document.getElementById('hamburgerBtn')?.addEventListener('click', () => {
        document.getElementById('mobileSidebar')?.classList.add('active');
    });

    document.getElementById('closeSidebar')?.addEventListener('click', () => {
        document.getElementById('mobileSidebar')?.classList.remove('active');
    });

    if (document.getElementById('mobileWelcomeText')) {
        document.getElementById('mobileWelcomeText').textContent = `Selamat Datang, ${nickname}`;
    }

    document.getElementById('mobileLogout')?.addEventListener('click', () => {
        localStorage.clear();
        window.location.href = 'index.html';
    });
})();