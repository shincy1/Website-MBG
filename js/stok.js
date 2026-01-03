(function () {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      window.location.href = 'index.html';
      return;
    }
  
    const nickname = localStorage.getItem('nickname');
    document.getElementById('welcomeText').textContent = `Selamat Datang, ${nickname}`;
  
    if (typeof dataMBG === 'undefined' || !Array.isArray(dataMBG)) {
      console.error('dataMBG tidak ditemukan atau bukan array!');
      return;
    }
  
    let data = [...dataMBG];
    const itemsPerPage = 5;
    let currentPage = 1;
    let filteredData = [...data];
    let currentEdit = null;
  
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const tableBody = document.getElementById('stokTableBody');
    const paginationEl = document.getElementById('pagination');
    const btnSimpan = document.getElementById('btnSimpan');
    const btnTambah = document.getElementById('btnTambah');
  
    const inputKode = document.getElementById('inputKode');
    const inputPenerima = document.getElementById('inputPenerima');
    const inputKurir = document.getElementById('inputKurir');
    const inputMenu = document.getElementById('inputMenu');
    const inputPorsi = document.getElementById('inputPorsi');
    const inputDeskripsi = document.getElementById('inputDeskripsi');
    const statusBayar = document.getElementById('statusBayar');
    const statusKirim = document.getElementById('statusKirim');
  
    // === Fungsi Modal ===
    function showModal(message, onConfirm = null, confirmText = 'Ya, Hapus', cancelText = 'Batal') {
      const modal = document.getElementById('confirmModal');
      const messageEl = document.getElementById('modalMessage');
      const confirmBtn = document.getElementById('modalConfirm');
      const cancelBtn = document.getElementById('modalCancel');
  
      messageEl.textContent = message;
      confirmBtn.textContent = confirmText;
      cancelBtn.textContent = cancelText;
  
      // Hapus event listener lama
      const newConfirmBtn = confirmBtn.cloneNode(true);
      const newCancelBtn = cancelBtn.cloneNode(true);
      confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
      cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);
  
      document.getElementById('modalConfirm').addEventListener('click', () => {
        modal.classList.remove('show');
        if (onConfirm) onConfirm();
      });
  
      document.getElementById('modalCancel').addEventListener('click', () => {
        modal.classList.remove('show');
      });
  
      modal.classList.add('show');
    }
  
    function showNotification(message) {
      const modal = document.getElementById('notificationModal');
      document.getElementById('notificationMessage').textContent = message;
  
      const closeBtn = document.getElementById('notificationClose');
      const newCloseBtn = closeBtn.cloneNode(true);
      closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
  
      document.getElementById('notificationClose').addEventListener('click', () => {
        modal.classList.remove('show');
      });
  
      modal.classList.add('show');
    }
  
    // === Generate opsi select dari data asli ===
    function populateSelectOptions() {
      const menus = [...new Set(data.map(item => item.menu))].sort();
      inputMenu.innerHTML = '<option value="">Pilih Menu</option>';
      menus.forEach(menu => {
        const opt = document.createElement('option');
        opt.value = menu;
        opt.textContent = menu;
        inputMenu.appendChild(opt);
      });
  
      const bayarStatus = [...new Set(data.map(item => item.status_bayar))].sort();
      statusBayar.innerHTML = '<option value="">Pilih Status Bayar</option>';
      bayarStatus.forEach(status => {
        const opt = document.createElement('option');
        opt.value = status;
        opt.textContent = status;
        statusBayar.appendChild(opt);
      });
  
      const kirimStatus = [...new Set(data.map(item => item.status_kirim))].sort();
      statusKirim.innerHTML = '<option value="">Pilih Status Kirim</option>';
      kirimStatus.forEach(status => {
        const opt = document.createElement('option');
        opt.value = status;
        opt.textContent = status;
        statusKirim.appendChild(opt);
      });
    }
  
    populateSelectOptions();
    paginationEl.classList.add('hidden');
    renderTable();
  
    // Event
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('input', performSearch);
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') performSearch();
    });
  
    btnSimpan.addEventListener('click', handleSimpanEdit);
    btnTambah.addEventListener('click', handleTambahBaru);
  
    document.querySelector('.logout-btn').addEventListener('click', () => {
      localStorage.clear();
      window.location.href = 'index.html';
    });
  
    // --- FUNGSI ---
    function performSearch() {
      const query = searchInput.value.trim().toLowerCase();
      filteredData = query
        ? data.filter(item =>
            item.id.toLowerCase().includes(query) ||
            item.penerima.toLowerCase().includes(query)
          )
        : [...data];
      currentPage = 1;
      renderTable();
    }
  
    function renderTable() {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
  
      tableBody.innerHTML = paginatedData.map(item => `
        <tr>
          <td>${item.id}</td>
          <td>${item.penerima}</td>
          <td class="action-cell">
            <button class="action-btn edit" data-id="${item.id}" title="Edit">
              <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete" data-id="${item.id}" title="Hapus">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      `).join('');
  
      tableBody.querySelectorAll('.edit').forEach(btn => {
        btn.onclick = (e) => loadToForm(e.target.closest('.edit').dataset.id);
      });
  
      tableBody.querySelectorAll('.delete').forEach(btn => {
        btn.onclick = (e) => {
          const id = e.target.closest('.delete').dataset.id;
          showModal('Hapus data ini?', () => {
            data = data.filter(x => x.id !== id);
            filteredData = filteredData.filter(x => x.id !== id);
            if (currentEdit === id) clearForm();
            populateSelectOptions();
            currentPage = 1;
            renderTable();
          }, 'Ya, Hapus', 'Batal');
        };
      });
  
      renderPagination();
    }
  
    function renderPagination() {
      const totalPages = Math.ceil(filteredData.length / itemsPerPage);
      paginationEl.classList.toggle('hidden', totalPages <= 1);
      if (totalPages <= 1) return;
  
      let html = '';
  
      if (currentPage > 1) {
        html += `<button class="page-btn" data-page="${currentPage - 1}">←</button>`;
      } else {
        html += `<button class="page-btn" disabled>←</button>`;
      }
  
      for (let i = 1; i <= totalPages; i++) {
        html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
      }
  
      if (currentPage < totalPages) {
        html += `<button class="page-btn" data-page="${currentPage + 1}">→</button>`;
      } else {
        html += `<button class="page-btn" disabled>→</button>`;
      }
  
      paginationEl.innerHTML = html;
  
      paginationEl.querySelectorAll('.page-btn:not(:disabled)').forEach(btn => {
        btn.addEventListener('click', (e) => {
          currentPage = parseInt(e.target.dataset.page);
          renderTable();
        });
      });
    }
  
    function loadToForm(id) {
      const item = data.find(x => x.id === id);
      if (!item) return;
  
      inputKode.value = item.id;
      inputPenerima.value = item.penerima;
      inputKurir.value = item.kurir;
      inputMenu.value = item.menu;
      inputPorsi.value = item.porsi || '';
      inputDeskripsi.value = item.deskripsi || '';
      statusBayar.value = item.status_bayar || '';
      statusKirim.value = item.status_kirim || '';
  
      currentEdit = id;
    }
  
    function clearForm() {
      inputKode.value = '';
      inputPenerima.value = '';
      inputKurir.value = '';
      inputMenu.value = '';
      inputPorsi.value = '';
      inputDeskripsi.value = '';
      statusBayar.value = '';
      statusKirim.value = '';
      currentEdit = null;
    }
  
    function handleTambahBaru() {
      const kode = inputKode.value.trim();
      const penerima = inputPenerima.value.trim();
      const kurir = inputKurir.value.trim();
      const menu = inputMenu.value;
      const porsi = inputPorsi.value ? parseInt(inputPorsi.value) : 1;
      const deskripsi = inputDeskripsi.value.trim();
      const bayar = statusBayar.value;
      const kirim = statusKirim.value;
  
      if (!kode || !penerima || !menu || !bayar || !kirim) {
        showNotification('Semua field wajib diisi!');
        return;
      }
  
      if (data.some(x => x.id === kode)) {
        showNotification('Kode sudah digunakan!');
        return;
      }
  
      const newItem = {
        id: kode,
        penerima,
        kurir,
        menu,
        porsi,
        deskripsi,
        status_bayar: bayar,
        status_kirim: kirim
      };
  
      data.push(newItem);
  
      const query = searchInput.value.trim().toLowerCase();
      if (!query || kode.toLowerCase().includes(query) || penerima.toLowerCase().includes(query)) {
        filteredData.push(newItem);
      }
  
      populateSelectOptions();
      clearForm();
      currentPage = 1;
      renderTable();
    }
  
    function handleSimpanEdit() {
      if (!currentEdit) {
        showNotification('Tidak ada data yang sedang diedit. Gunakan tombol "Tambah" untuk data baru.');
        return;
      }
  
      const kode = inputKode.value.trim();
      const penerima = inputPenerima.value.trim();
      const kurir = inputKurir.value.trim();
      const menu = inputMenu.value;
      const porsi = inputPorsi.value ? parseInt(inputPorsi.value) : 1;
      const deskripsi = inputDeskripsi.value.trim();
      const bayar = statusBayar.value;
      const kirim = statusKirim.value;
  
      if (!kode || !penerima || !menu || !bayar || !kirim) {
        showNotification('Semua field wajib diisi!');
        return;
      }
  
      if (kode !== currentEdit && data.some(x => x.id === kode)) {
        showNotification('Kode sudah digunakan!');
        return;
      }
  
      const index = data.findIndex(x => x.id === currentEdit);
      if (index !== -1) {
        data[index] = {
          id: kode,
          penerima,
          kurir,
          menu,
          porsi,
          deskripsi,
          status_bayar: bayar,
          status_kirim: kirim
        };
  
        const fIndex = filteredData.findIndex(x => x.id === currentEdit);
        if (fIndex !== -1) filteredData[fIndex] = data[index];
      }
  
      populateSelectOptions();
      clearForm();
      currentPage = 1;
      renderTable();
    }
  })();