const dataMBG = [
    { 
        id: "MBG-2025-001", 
        penerima: "SDN 01 Merdeka", 
        kurir: "Budi Santoso",
        menu: "Paket A (Nasi Ayam)", 
        porsi: 450,
        status_kirim: "Diterima", 
        status_bayar: "Lunas",
        deskripsi: "Menu: Nasi putih, ayam goreng, sayur bayam, dan susu kotak 200ml. Kondisi: Tiba tepat waktu, kemasan rapi."
    },
    { 
        id: "MBG-2025-002", 
        penerima: "SMPN 05 Bakti", 
        kurir: "Ahmad Fauzi", 
        menu: "Paket B (Ikan Bakar)", 
        porsi: 620,
        status_kirim: "Diperjalanan", 
        status_bayar: "Diverifikasi",
        deskripsi: "Menu: Nasi merah, ikan kembung bakar, tumis kacang panjang, dan buah jeruk. Status: Sedang menuju lokasi (Area Lowokwaru)."
    },
    { 
        id: "MBG-2025-003", 
        penerima: "SMKN 02 Malang", 
        kurir: "Deni Ramadhan", 
        menu: "Paket A (Nasi Ayam)", 
        porsi: 850,
        status_kirim: "Dikemas", 
        status_bayar: "Menunggu",
        deskripsi: "Menu: Nasi putih, ayam semur, telur rebus, dan sayur sop. Status: Siap diberangkatkan dari dapur pusat."
    },
    { 
        id: "MBG-2025-004", 
        penerima: "TK Pembina", 
        kurir: "Eko Prasetyo", 
        menu: "Paket C (Bubur Gizi)", 
        porsi: 120,
        status_kirim: "Dimasak", 
        status_bayar: "Lunas",
        deskripsi: "Menu: Bubur halus ayam suwir, wortel cincang, dan susu tinggi kalsium. Fokus: Tekstur lembut untuk anak usia dini."
    },
    { 
        id: "MBG-2025-005", 
        penerima: "SDN 03 Ceria", 
        kurir: "Fajar Shodik", 
        menu: "Paket B (Ikan Bakar)", 
        porsi: 380,
        status_kirim: "Diterima", 
        status_bayar: "Lunas",
        deskripsi: "Menu: Nasi putih, fillet ikan goreng, oseng sawi, dan pisang. Catatan: Diterima oleh Kepala Sekolah langsung."
    },
    { 
        id: "MBG-2025-006", 
        penerima: "SMP PGRI 1", 
        kurir: "Guntur Putra", 
        menu: "Paket A (Nasi Ayam)", 
        porsi: 410,
        status_kirim: "Diperjalanan", 
        status_bayar: "Diverifikasi",
        deskripsi: "Menu: Nasi kuning, ayam bumbu kuning, perkedel tahu, dan lalapan. Status: Driver terjebak macet ringan."
    },
    { 
        id: "MBG-2025-007", 
        penerima: "SMAN 01 Jaya", 
        kurir: "Hadi Wijaya", 
        menu: "Paket D (Daging Sapi)", 
        porsi: 950,
        status_kirim: "Dikemas", 
        status_bayar: "Menunggu",
        deskripsi: "Menu: Nasi putih, bola daging saus tiram, brokoli wortel, dan apel. Catatan: Porsi besar untuk siswa SMA."
    },
    { 
        id: "MBG-2025-008", 
        penerima: "MI Nurul Islam", 
        kurir: "Indra Lesmana", 
        menu: "Paket A (Nasi Ayam)", 
        porsi: 275,
        status_kirim: "Diterima", 
        status_bayar: "Lunas",
        deskripsi: "Menu: Nasi putih, ayam goreng mentega, jagung manis, dan susu. Status: Selesai didistribusikan ke kelas."
    },
    { 
        id: "MBG-2025-009", 
        penerima: "SDN 10 Pintar", 
        kurir: "Jaka Tingkir", 
        menu: "Paket B (Ikan Bakar)", 
        porsi: 520,
        status_kirim: "Dimasak", 
        status_bayar: "Lunas",
        deskripsi: "Menu: Nasi putih, lele bakar madu, sambal tomat (tidak pedas), dan jeruk."
    },
    { 
        id: "MBG-2025-010", 
        penerima: "SMPN 02 Terbuka", 
        kurir: "Kurnia Sandi", 
        menu: "Paket A (Nasi Ayam)", 
        porsi: 310,
        status_kirim: "Diperjalanan", 
        status_bayar: "Diverifikasi",
        deskripsi: "Menu: Nasi uduk, ayam suwir, telur balado, dan buah melon."
    },
    { 
        id: "MBG-2025-011", 
        penerima: "Pesantren Al-Huda", 
        kurir: "Lukman Hakim", 
        menu: "Paket D (Daging Sapi)", 
        porsi: 1200,
        status_kirim: "Diterima", 
        status_bayar: "Lunas",
        deskripsi: "Menu: Nasi putih, rendang daging, daun singkong, dan buah semangka. Pengiriman menggunakan mobil box besar."
    },
    { 
        id: "MBG-2025-012", 
        penerima: "SDN 05 Harapan", 
        kurir: "M. Ridwan", 
        menu: "Paket C (Bubur Gizi)", 
        porsi: 150,
        status_kirim: "Dikemas", 
        status_bayar: "Menunggu",
        deskripsi: "Menu: Bubur kacang hijau dan telur rebus. Fokus: Tambahan gizi pagi hari."
    },
    { 
        id: "MBG-2025-013", 
        penerima: "SMPN 12 Juara", 
        kurir: "Nanang Q.", 
        menu: "Paket B (Ikan Bakar)", 
        porsi: 480,
        status_kirim: "Diperjalanan", 
        status_bayar: "Diverifikasi",
        deskripsi: "Menu: Nasi putih, bandeng presto goreng, cah kangkung, dan jeruk."
    },
    { 
        id: "MBG-2025-014", 
        penerima: "SMAN 08 Unggul", 
        kurir: "Oki Setiawan", 
        menu: "Paket A (Nasi Ayam)", 
        porsi: 1100,
        status_kirim: "Diterima", 
        status_bayar: "Lunas",
        deskripsi: "Menu: Nasi putih, ayam bakar, tempe tahu goreng, dan susu cokelat."
    },
    { 
        id: "MBG-2025-015", 
        penerima: "SD Katolik Santa", 
        kurir: "Pandu Raya", 
        menu: "Paket B (Ikan Bakar)", 
        porsi: 290,
        status_kirim: "Dimasak", 
        status_bayar: "Lunas",
        deskripsi: "Menu: Nasi putih, gurame saus asam manis, brokoli, dan buah pir."
    },
    { 
        id: "MBG-2025-016", 
        penerima: "SMPN 03 Bersama", 
        kurir: "Qomarudin", 
        menu: "Paket D (Daging Sapi)", 
        porsi: 560,
        status_kirim: "Diperjalanan", 
        status_bayar: "Diverifikasi",
        deskripsi: "Menu: Nasi merah, empal daging, sayur asem, dan kerupuk gizi."
    },
    { 
        id: "MBG-2025-017", 
        penerima: "SDN 15 Teladan", 
        kurir: "Rendy Ardi", 
        menu: "Paket A (Nasi Ayam)", 
        porsi: 430,
        status_kirim: "Diterima", 
        status_bayar: "Lunas",
        deskripsi: "Menu: Nasi putih, opor ayam, kentang balado (tidak pedas), dan susu putih."
    },
    { 
        id: "MBG-2025-018", 
        penerima: "SLB ABC Malang", 
        kurir: "Surya Kencana", 
        menu: "Paket C (Bubur Gizi)", 
        porsi: 80,
        status_kirim: "Dikemas", 
        status_bayar: "Menunggu",
        deskripsi: "Menu: Bubur sumsum gizi tinggi dan jus buah. Catatan: Menu khusus sesuai kebutuhan siswa."
    },
    { 
        id: "MBG-2025-019", 
        penerima: "MTSn 1 Kota", 
        kurir: "Taufik H.", 
        menu: "Paket A (Nasi Ayam)", 
        porsi: 600,
        status_kirim: "Dimasak", 
        status_bayar: "Lunas",
        deskripsi: "Menu: Nasi putih, ayam krispi gizi, oseng buncis, dan susu."
    },
    { 
        id: "MBG-2025-020", 
        penerima: "SMA Kristen 1", 
        kurir: "Udin Sedunia", 
        menu: "Paket D (Daging Sapi)", 
        porsi: 720,
        status_kirim: "Diterima", 
        status_bayar: "Lunas",
        deskripsi: "Menu: Nasi putih, steak daging cincang, wortel buncis, dan yogurt."
    }
];