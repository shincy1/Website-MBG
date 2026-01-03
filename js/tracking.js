(function () {
  // Redirect jika belum login
  if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'index.html';
    return;
  }

  // Tampilkan sambutan di navbar
  const nickname = localStorage.getItem('nickname');
  document.getElementById('welcomeText').textContent = `Selamat Datang, ${nickname}`;

  // Konfigurasi
  const data = dataMBG;
  const itemsPerPage = 5;
  let currentPage = 1;
  let filteredData = [...data];

  // Deklarasi Elemen DOM
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const trackingContent = document.getElementById('trackingContent');
  const paginationEl = document.getElementById('pagination');

  // Sembunyikan pagination awal
  paginationEl.classList.add('hidden');

  // Render konten awal
  renderContent();

  // Event listeners
  searchButton.addEventListener('click', performSearch);
  searchInput.addEventListener('input', performSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
  });

  document.querySelector('.logout-btn').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'index.html';
  });

  // Fungsi: Cari data
  function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (query === '') {
      filteredData = [...data];
    } else {
      filteredData = data.filter(item =>
        item.id.toLowerCase().includes(query) ||
        item.penerima.toLowerCase().includes(query) ||
        item.kurir.toLowerCase().includes(query) ||
        item.menu.toLowerCase().includes(query) ||
        item.deskripsi.toLowerCase().includes(query)
      );
    }
    currentPage = 1;
    renderContent();
  }

  function renderContent() {
    const query = searchInput.value.trim();

    if (query === '') {
      trackingContent.innerHTML = `
        <img src="img/maskot.webp" alt="Maskot">
        <p>Cari Data Yang diinginkan dengan menggunakan kolom pencarian di atas ya</p>
      `;
      paginationEl.classList.add('hidden');
      return;
    }

    if (filteredData.length === 0) {
      trackingContent.innerHTML = `
        <img src="img/maskot.webp" alt="Maskot">
        <p>Tidak ada data yang ditemukan.</p>
      `;
      paginationEl.classList.add('hidden');
      return;
    }

    // Render tabel
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    let tableRows = '';
    paginatedData.forEach(item => {
      tableRows += `
        <tr>
          <td>${item.id}</td>
          <td>${item.penerima}</td>
          <td>${item.kurir}</td>
          <td>${item.menu}</td>
          <td>${item.porsi}</td>
          <td>
            <div class="status-badges">
              <span class="badge kirim">${item.status_kirim}</span>
              <span class="badge bayar">${item.status_bayar}</span>
            </div>
          </td>
          <td>${item.deskripsi}</td>
        </tr>
      `;
    });

    trackingContent.innerHTML = `
      <div class="tracking-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Kode</th>
              <th>Penerima</th>
              <th>Kurir</th>
              <th>Menu</th>
              <th>Porsi</th>
              <th>Status</th>
              <th>Deskripsi</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>
    `;

    renderPagination();
    paginationEl.classList.remove('hidden');
  }

  function renderPagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (totalPages <= 1) {
      paginationEl.classList.add('hidden');
      return;
    }

    let buttons = '';

    // Tombol Previous
    if (currentPage > 1) {
      buttons += `<button class="page-btn" data-page="${currentPage - 1}">←</button>`;
    } else {
      buttons += `<button class="page-btn" disabled>←</button>`;
    }

    // Nomor halaman
    for (let i = 1; i <= totalPages; i++) {
      buttons += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }

    // Tombol Next
    if (currentPage < totalPages) {
      buttons += `<button class="page-btn" data-page="${currentPage + 1}">→</button>`;
    } else {
      buttons += `<button class="page-btn" disabled>→</button>`;
    }

    paginationEl.innerHTML = buttons;

    paginationEl.querySelectorAll('.page-btn:not(:disabled)').forEach(btn => {
      btn.addEventListener('click', (e) => {
        currentPage = parseInt(e.target.dataset.page, 10);
        renderContent();
        trackingContent.scrollTop = 0;
      });
    });
  }
})();