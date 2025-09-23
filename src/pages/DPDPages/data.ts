export interface Member {
  id: number;
  name: string;
  position: string;
  location: string;
  region: string;
  type: "dpa" | "dpp" | "dpd" | "penasehat";
  image: string;
  social?: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface DpdInfo {
  slug: string;
  region: string;
  description: string;
  address: string;
  email: string;
  phone: string;
}

export interface Section {
  title: string;
  content: string;
  image: string;
}

export const profileSections: Section[] = [
  {
    title: "Sejarah dan Perjalanan APTIKNAS di Indonesia",
    content:
      "Asosiasi Pengusaha Teknologi Informasi dan Komunikasi Nasional (disingkat APTIKNAS) merupakan bentuk organisasi profesional yang bertransformasi dari asosiasi sebelumnya bernama Asosiasi Pengusaha Komputer Indonesia (APKOMINDO) yang didirikan sejak tahun 1991 (atau 34 tahun yang lalu), sehingga sesungguhnya APTIKNAS merupakan asosiasi TIK tertua di Indonesia.",
    image:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Deklarasi dan Legalitas APTIKNAS",
    content:
      "APTIKNAS didirikan oleh pengusaha, praktisi, akademisi di bidang TIK se-Indonesia, dengan jumlah pendiri mencapai 100 orang dan salah satu pendirinya adalah Dr. Ir. Onno W. Purbo, M.Eng., Ph.D. APTIKNAS dideklarasikan sejak 24 Februari 2017 dan memiliki legalitas resmi SK Kumham RI sejak 26 April 2017.",
    image:
      "https://images.unsplash.com/photo-1581090700227-4c4f50b01d59?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Sejarah dan Perjalanan APTIKNAS di Indonesia",
    content:
      "Asosiasi Pengusaha Teknologi Informasi dan Komunikasi Nasional (APTIKNAS) terus berkomitmen untuk mengembangkan industri TIK di Indonesia dengan beragam kegiatan, program pelatihan, dan kerjasama strategis untuk mendukung perkembangan ekosistem digital nasional.",
    image:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=800&q=80",
  },
];
// Data dummy lengkap untuk semua jenis keanggotaan APTIKNAS
export const members: Member[] = [
  // Dewan Pengawas Asosiasi (DPA)
  {
    id: 1,
    name: "Dr. Bambang Sutrisno",
    position: "Ketua Dewan Pengawas",
    location: "Jakarta",
    region: "DKI Jakarta",
    type: "dpa",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Ir. Suryo Handono, M.Sc.",
    position: "Anggota Dewan Pengawas",
    location: "Bandung",
    region: "Jawa Barat",
    type: "dpa",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Diana Pratiwi, S.Kom., M.T.I.",
    position: "Anggota Dewan Pengawas",
    location: "Surabaya",
    region: "Jawa Timur",
    type: "dpa",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },

  // Dewan Pengurus Pusat (DPP)
  {
    id: 4,
    name: "Dr. Rudi Hartono, S.T., M.Kom.",
    position: "Ketua Umum DPP APTIKNAS",
    location: "Jakarta",
    region: "DKI Jakarta",
    type: "dpp",
    image:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    name: "Maya Sari, S.E., M.M.",
    position: "Wakil Ketua DPP - Bidang Keuangan",
    location: "Jakarta",
    region: "DKI Jakarta",
    type: "dpp",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 6,
    name: "Ahmad Fauzi, S.Kom., M.Sc.",
    position: "Wakil Ketua DPP - Bidang Teknologi",
    location: "Bandung",
    region: "Jawa Barat",
    type: "dpp",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },

  // Dewan Pengurus Daerah (DPD) - Contoh beberapa daerah
  {
    id: 7,
    name: "Budi Santoso, S.T.",
    position: "Ketua DPD Jawa Barat",
    location: "Bandung",
    region: "Jawa Barat",
    type: "dpd",
    image:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 8,
    name: "Siti Rahayu, S.Kom.",
    position: "Ketua DPD Jawa Timur",
    location: "Surabaya",
    region: "Jawa Timur",
    type: "dpd",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 9,
    name: "Joko Widodo, S.E.",
    position: "Ketua DPD Jawa Tengah",
    location: "Semarang",
    region: "Jawa Tengah",
    type: "dpd",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 10,
    name: "Dewi Kusuma, M.T.",
    position: "Ketua DPD Bali",
    location: "Denpasar",
    region: "Bali",
    type: "dpd",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 11,
    name: "Andi Rahman, S.Kom.",
    position: "Ketua DPD Sumatra Utara",
    location: "Medan",
    region: "Sumatra Utara",
    type: "dpd",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 12,
    name: "Rina Wijaya, M.M.",
    position: "Ketua DPD Sumatra Selatan",
    location: "Palembang",
    region: "Sumatra Selatan",
    type: "dpd",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },

  // Dewan Penasehat Asosiasi
  {
    id: 13,
    name: "Prof. Dr. Ir. H. Muhammad Anis, M.M.",
    position: "Ketua Dewan Penasehat",
    location: "Jakarta",
    region: "DKI Jakarta",
    type: "penasehat",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 14,
    name: "Dr. Hj. Siti Fatimah, S.E., M.Si.",
    position: "Anggota Dewan Penasehat",
    location: "Yogyakarta",
    region: "DI Yogyakarta",
    type: "penasehat",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 15,
    name: "Ir. H. Bambang Soedarmono, M.T.",
    position: "Anggota Dewan Penasehat",
    location: "Surabaya",
    region: "Jawa Timur",
    type: "penasehat",
    image:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },

  // Tambahan anggota lainnya untuk melengkapi
  {
    id: 16,
    name: "Rudi Hermawan, S.Kom.",
    position: "Sekretaris DPD Jawa Barat",
    location: "Bandung",
    region: "Jawa Barat",
    type: "dpd",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 17,
    name: "Linda Sari, M.Kom.",
    position: "Bendahara DPP APTIKNAS",
    location: "Jakarta",
    region: "DKI Jakarta",
    type: "dpp",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 18,
    name: "Hendra Gunawan, S.T.",
    position: "Koordinator DPD Banten",
    location: "Serang",
    region: "Banten",
    type: "dpd",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 19,
    name: "Fitri Ayu, S.E.",
    position: "Koordinator DPD Lampung",
    location: "Bandar Lampung",
    region: "Lampung",
    type: "dpd",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 20,
    name: "Agus Salim, M.T.",
    position: "Koordinator DPD Kalimantan Timur",
    location: "Samarinda",
    region: "Kalimantan Timur",
    type: "dpd",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 21,
    name: "Nina Kurnia, S.Kom.",
    position: "Koordinator DPD Sulawesi Selatan",
    location: "Makassar",
    region: "Sulawesi Selatan",
    type: "dpd",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 22,
    name: "Bambang Wijaya, M.M.",
    position: "Koordinator DPD Nusa Tenggara Barat",
    location: "Mataram",
    region: "Nusa Tenggara Barat",
    type: "dpd",
    image:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 23,
    name: "Dewi Sartika, S.T.",
    position: "Koordinator DPD Papua",
    location: "Jayapura",
    region: "Papua",
    type: "dpd",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 24,
    name: "Rizky Pratama, M.Kom.",
    position: "Koordinator DPD Riau",
    location: "Pekanbaru",
    region: "Riau",
    type: "dpd",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  },
];

export const dpdInfoData: DpdInfo[] = [
  {
    slug: "dki-jakarta",
    region: "DKI Jakarta",
    description:
      "DPD DKI Jakarta menjadi pusat koordinasi dan inovasi teknologi di ibu kota, menghubungkan para profesional dan pengusaha TIK untuk mendorong transformasi digital di berbagai sektor.",
    address: "Jl. Jenderal Sudirman Kav. 52-53, Jakarta Selatan, DKI Jakarta",
    email: "jakarta@aptiknas.or.id",
    phone: "(021) 123-4567",
  },
  {
    slug: "jawa-barat",
    region: "Jawa Barat",
    description:
      "Sebagai salah satu DPD paling aktif, Jawa Barat fokus pada pengembangan ekosistem startup digital, edukasi teknologi bagi UMKM, dan kolaborasi dengan pemerintah daerah untuk mewujudkan Jabar Digital Province.",
    address: "Jl. Diponegoro No. 22, Bandung, Jawa Barat",
    email: "jabar@aptiknas.or.id",
    phone: "(022) 987-6543",
  },
  {
    slug: "jawa-tengah",
    region: "Jawa Tengah",
    description:
      "DPD Jawa Tengah berkomitmen untuk memperluas literasi digital di kalangan masyarakat dan mendukung digitalisasi industri manufaktur serta pariwisata yang menjadi andalan provinsi ini.",
    address: "Jl. Pahlawan No. 9, Semarang, Jawa Tengah",
    email: "jateng@aptiknas.or.id",
    phone: "(024) 112-2334",
  },
  {
    slug: "jawa-timur",
    region: "Jawa Timur",
    description:
      "DPD Jawa Timur aktif dalam mendorong adopsi teknologi di sektor industri, pertanian, dan perikanan. Kami berkolaborasi dengan universitas dan industri untuk menciptakan talenta digital yang kompeten.",
    address: "Jl. Ahmad Yani No. 88, Surabaya, Jawa Timur",
    email: "jatim@aptiknas.or.id",
    phone: "(031) 555-8899",
  },
  {
    slug: "banten",
    region: "Banten",
    description:
      "DPD Banten fokus pada pemberdayaan ekonomi digital di kawasan industri dan pariwisata. Kami menyelenggarakan pelatihan dan workshop untuk meningkatkan kapabilitas TIK bagi pelaku usaha lokal.",
    address: "Jl. Raya Serang - Pandeglang, Serang, Banten",
    email: "banten@aptiknas.or.id",
    phone: "(0254) 321-7654",
  },
  {
    slug: "bali",
    region: "Bali",
    description:
      "Di Bali, APTIKNAS berperan penting dalam mendukung industri pariwisata melalui solusi teknologi kreatif. Kami mendorong pengembangan startup di bidang 'travel-tech' dan ekonomi kreatif digital.",
    address: "Jl. Teuku Umar No. 120, Denpasar, Bali",
    email: "bali@aptiknas.or.id",
    phone: "(0361) 456-7890",
  },
  // Tambahkan data untuk daerah lain sesuai kebutuhan
];

export const dpdPageContent: Record<string, Section[]> = {
  "dki-jakarta": [
    {
      title: "Profil DPD DKI Jakarta",
      content:
        "DPD DKI Jakarta menjadi pusat kegiatan APTIKNAS di ibu kota dengan fokus pada digitalisasi UMKM, startup, dan industri kreatif.",
      image:
        "https://images.unsplash.com/photo-1583642572244-3494893b064b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Program Unggulan DKI Jakarta",
      content:
        "Menyelenggarakan pelatihan digital marketing, seminar keamanan siber, dan expo teknologi di Jakarta Convention Center.",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Kegiatan Rutin DKI Jakarta",
      content:
        "Mengadakan networking bulanan antar anggota untuk berbagi insight teknologi dan peluang bisnis.",
      image:
        "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ],
  "jawa-barat": [
    {
      title: "Profil DPD Jawa Barat",
      content:
        "DPD Jawa Barat aktif mendukung pengembangan smart city di berbagai kota seperti Bandung, Bekasi, dan Bogor.",
      image:
        "https://images.unsplash.com/photo-1596392927852-2a18c417fb93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Program Unggulan Jawa Barat",
      content:
        "Fokus pada literasi digital untuk pelajar, pelatihan e-commerce, serta kerjasama dengan pemerintah daerah.",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Visi-Misi Jawa Barat",
      content:
        "Menjadi motor penggerak transformasi digital di Jawa Barat dengan kolaborasi industri, akademisi, dan komunitas.",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ],
  "jawa-tengah": [
    {
      title: "Profil DPD Jawa Tengah",
      content:
        "Jawa Tengah berperan penting dalam digitalisasi sektor pendidikan dan pariwisata berbasis teknologi.",
      image:
        "https://images.unsplash.com/photo-1588492262004-a549bd338753?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Program Jawa Tengah",
      content:
        "Mendorong startup lokal melalui inkubasi bisnis dan workshop teknologi untuk mahasiswa.",
      image:
        "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Kegiatan Jawa Tengah",
      content:
        "Mengadakan hackathon tahunan yang melibatkan ratusan peserta dari berbagai universitas.",
      image:
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ],
  "jawa-timur": [
    {
      title: "Profil DPD Jawa Timur",
      content:
        "DPD Jawa Timur menitikberatkan pada pengembangan ekosistem digital di Surabaya dan sekitarnya.",
      image:
        "https://images.unsplash.com/photo-1622286342621-137d8341b0d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Program Jawa Timur",
      content:
        "Fokus pada digitalisasi UKM, workshop AI, dan seminar cyber security.",
      image:
        "https://images.unsplash.com/photo-1531771686035-25f474d7c17d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Kegiatan Jawa Timur",
      content:
        "Penyelenggaraan pameran teknologi bersama perguruan tinggi di Jawa Timur.",
      image:
        "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ],
  banten: [
    {
      title: "Profil DPD Banten",
      content:
        "Banten menjadi basis pertumbuhan ekosistem digital yang mendukung kawasan industri dan pariwisata.",
      image:
        "https://images.unsplash.com/photo-1618057188734-023b74e7494b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Program Banten",
      content:
        "Mengembangkan pelatihan digital bagi tenaga kerja industri manufaktur.",
      image:
        "https://images.unsplash.com/photo-1567942712680-08cfb730db34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Visi-Misi Banten",
      content:
        "Menjadi penghubung antara industri dan teknologi di wilayah barat Jawa.",
      image:
        "https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ],
  bali: [
    {
      title: "Profil DPD Bali",
      content:
        "Bali dikenal dengan dukungan digital pada sektor pariwisata dan UMKM berbasis kerajinan.",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Program Bali",
      content: "Pelatihan pemasaran digital untuk pariwisata dan usaha lokal.",
      image:
        "https://images.unsplash.com/photo-1504150558240-0b4fd8946624?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Kegiatan Bali",
      content:
        "Menyelenggarakan festival startup pariwisata untuk mendukung ekosistem digital.",
      image:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ],
  "sumatra-utara": [
    {
      title: "Profil DPD Sumatera Utara",
      content:
        "DPD Sumatera Utara berfokus pada pengembangan teknologi di sektor pertanian dan industri kreatif.",
      image:
        "https://images.unsplash.com/photo-1587204236369-33a009a741f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Program Sumatera Utara",
      content: "Mendorong pelatihan digitalisasi koperasi dan UMKM.",
      image:
        "https://images.unsplash.com/photo-1600880292210-85938c874494?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Kegiatan Sumatera Utara",
      content: "Mengadakan forum diskusi bulanan tentang tren teknologi.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ],
  "sumatra-selatan": [
    {
      title: "Profil DPD Sumatera Selatan",
      content: "Palembang menjadi pusat kegiatan digital di Sumatera Selatan.",
      image:
        "https://images.unsplash.com/photo-1578164444336-b21a7a2a7c49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Program Sumatera Selatan",
      content: "Menyelenggarakan kelas coding gratis untuk pelajar SMA.",
      image:
        "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Kegiatan Sumatera Selatan",
      content: "Event digital expo untuk memperkenalkan inovasi lokal.",
      image:
        "https://images.unsplash.com/photo-1529070412935-6b19d5d053b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ],
  "sumatra-barat": [
    {
      title: "Profil DPD Sumatera Barat",
      content:
        "DPD Sumatera Barat mendukung digitalisasi sektor kuliner dan pariwisata.",
      image:
        "https://images.unsplash.com/photo-1587280501635-35643b343411?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Program Sumatera Barat",
      content: "Pelatihan branding digital untuk UMKM kuliner.",
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Visi-Misi Sumatera Barat",
      content: "Menjadi pusat inovasi digital berbasis budaya Minangkabau.",
      image:
        "https://images.unsplash.com/photo-1618503954427-3b25c4f78314?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ],
  riau: [
    {
      title: "Profil DPD Riau",
      content: "DPD Riau fokus pada penerapan teknologi ramah lingkungan.",
      image:
        "https://images.unsplash.com/photo-1622311497314-a07b7c53de78?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Program Riau",
      content: "Workshop energi terbarukan dan digitalisasi perkebunan sawit.",
      image:
        "https://images.unsplash.com/photo-1627923227318-274256788563?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Kegiatan Riau",
      content: "Mengadakan seminar teknologi hijau tahunan.",
      image:
        "https://images.unsplash.com/photo-1624141850488-78a08383415f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ],
  "kalimantan-barat": [
    {
      title: "Profil DPD Kalimantan Barat",
      content:
        "DPD Kalimantan Barat mendorong digitalisasi logistik dan perdagangan lintas negara.",
      image:
        "https://images.unsplash.com/photo-1605753901473-525633a53633?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Program Kalimantan Barat",
      content: "Kerja sama dengan pelabuhan internasional untuk smart port.",
      image:
        "https://images.unsplash.com/photo-1578574577315-3f160d00976b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Visi-Misi Kalimantan Barat",
      content:
        "Meningkatkan daya saing ekonomi daerah melalui inovasi digital.",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ],
  "kalimantan-timur": [
    {
      title: "Profil DPD Kalimantan Timur",
      content:
        "Menjadi pionir transformasi digital untuk mendukung Ibu Kota Nusantara (IKN).",
      image:
        "https://images.unsplash.com/photo-1562887189-e5d078243e4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Program Kalimantan Timur",
      content: "Program smart city untuk mendukung pembangunan IKN.",
      image:
        "https://images.unsplash.com/photo-1595194360909-555a523f92a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Kegiatan Kalimantan Timur",
      content: "Forum teknologi untuk mendukung keberlanjutan pembangunan.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ],
  "kalimantan-selatan": [
    {
      title: "Profil DPD Kalimantan Selatan",
      content:
        "DPD Kalimantan Selatan aktif pada bidang digitalisasi tambang dan energi.",
      image:
        "https://images.unsplash.com/photo-1605333152638-347a233a9493?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Program Kalimantan Selatan",
      content: "Pelatihan IoT untuk industri energi.",
      image:
        "https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Kegiatan Kalimantan Selatan",
      content: "Mengadakan pameran teknologi energi berkelanjutan.",
      image:
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ],
  "sulawesi-selatan": [
    {
      title: "Profil DPD Sulawesi Selatan",
      content:
        "Makassar menjadi pusat teknologi digital di kawasan timur Indonesia.",
      image:
        "https://images.unsplash.com/photo-1589379917379-359988581a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Program Sulawesi Selatan",
      content: "Mendorong literasi digital di kepulauan dan daerah terpencil.",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Kegiatan Sulawesi Selatan",
      content: "Hackathon maritim berbasis teknologi digital.",
      image:
        "https://images.unsplash.com/photo-1605651202772-1c481639d634?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ],
  "sulawesi-utara": [
    {
      title: "Profil DPD Sulawesi Utara",
      content: "Manado menjadi pusat inovasi digital pariwisata bahari.",
      image:
        "https://images.unsplash.com/photo-1588675646184-f5b0b0b0b2de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Program Sulawesi Utara",
      content: "Pelatihan digital untuk nelayan dan industri perikanan.",
      image:
        "https://images.unsplash.com/photo-1577896851231-701450385c96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Visi-Misi Sulawesi Utara",
      content: "Menguatkan sektor maritim dengan teknologi digital.",
      image:
        "https://images.unsplash.com/photo-1547954579-7a794365c2db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ],
  "nusa-tenggara-barat": [
    {
      title: "Profil DPD NTB",
      content:
        "NTB fokus pada pengembangan teknologi untuk sektor pertanian dan pariwisata halal.",
      image:
        "https://images.unsplash.com/photo-1576683760983-9886a414a7ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Program NTB",
      content: "Workshop smart farming dan pelatihan digitalisasi pariwisata.",
      image:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Kegiatan NTB",
      content: "Festival teknologi pertanian berkelanjutan.",
      image:
        "https://images.unsplash.com/photo-1573228835695-43a6099f021f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ],
  "nusa-tenggara-timur": [
    {
      title: "Profil DPD NTT",
      content:
        "NTT fokus pada pemanfaatan teknologi untuk pengelolaan sumber daya alam.",
      image:
        "https://images.unsplash.com/photo-1599457389424-a055179b2559?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Program NTT",
      content: "Pelatihan energi terbarukan untuk masyarakat lokal.",
      image:
        "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Visi-Misi NTT",
      content: "Mendorong inovasi teknologi berbasis potensi alam daerah.",
      image:
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ],
  papua: [
    {
      title: "Profil DPD Papua",
      content:
        "DPD Papua mendukung digitalisasi pendidikan di wilayah timur Indonesia.",
      image:
        "https://images.unsplash.com/photo-1530053664-162f76465147?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Program Papua",
      content: "Program literasi digital untuk sekolah di pedalaman.",
      image:
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Kegiatan Papua",
      content: "Mengadakan pelatihan komputer dasar untuk guru.",
      image:
        "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ],
  "papua-barat": [
    {
      title: "Profil DPD Papua Barat",
      content:
        "Papua Barat fokus pada konservasi alam dengan dukungan teknologi.",
      image: "https://source.unsplash.com/800x600/?rajaampat,beach",
    },
    {
      title: "Program Papua Barat",
      content: "Workshop monitoring lingkungan berbasis IoT.",
      image: "https://source.unsplash.com/800x600/?iot,nature",
    },
    {
      title: "Visi-Misi Papua Barat",
      content: "Melestarikan alam Papua Barat dengan teknologi digital.",
      image: "https://source.unsplash.com/800x600/?conservation,ocean",
    },
  ],
  lampung: [
    {
      title: "Profil DPD Lampung",
      content: "DPD Lampung aktif pada pengembangan teknologi pertanian kopi.",
      image:
        "https://images.unsplash.com/photo-1511920183353-3c7c95a5742c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Program Lampung",
      content: "Pelatihan ekspor berbasis e-commerce untuk petani.",
      image:
        "https://images.unsplash.com/photo-1559899503-a436975b3554?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Kegiatan Lampung",
      content: "Pameran produk kopi digital.",
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ],
  aceh: [
    {
      title: "Profil DPD Aceh",
      content: "Aceh fokus pada digitalisasi sektor syariah dan pendidikan.",
      image:
        "https://images.unsplash.com/photo-1598224312385-4236b0691023?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Program Aceh",
      content: "Workshop teknologi syariah dan literasi digital.",
      image:
        "https://images.unsplash.com/photo-1604594878355-35a4a1628741?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Kegiatan Aceh",
      content: "Seminar tahunan ekonomi digital syariah.",
      image:
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ],
  jambi: [
    {
      title: "Profil DPD Jambi",
      content: "DPD Jambi mendukung teknologi pada sektor perkebunan karet.",
      image:
        "https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Program Jambi",
      content: "Digitalisasi rantai pasok industri karet.",
      image:
        "https://images.unsplash.com/photo-1586528116311-0692421135b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Visi-Misi Jambi",
      content: "Menjadi pusat pengembangan teknologi perkebunan.",
      image:
        "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ],
  bengkulu: [
    {
      title: "Profil DPD Bengkulu",
      content: "DPD Bengkulu berfokus pada digitalisasi pertanian dan nelayan.",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723a996f329?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Program Bengkulu",
      content: "Pelatihan aplikasi digital untuk petani dan nelayan.",
      image:
        "https://images.unsplash.com/photo-1590682643342-9b35115653c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Kegiatan Bengkulu",
      content: "Expo teknologi kelautan.",
      image:
        "https://images.unsplash.com/photo-1535144243313-a634b28918b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ],
  gorontalo: [
    {
      title: "Profil DPD Gorontalo",
      content:
        "DPD Gorontalo mendorong inovasi digital untuk sektor pendidikan.",
      image:
        "https://images.unsplash.com/photo-1620121684840-1ff35795553a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Program Gorontalo",
      content: "Workshop coding untuk siswa SMP dan SMA.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Visi-Misi Gorontalo",
      content: "Meningkatkan daya saing generasi muda dengan teknologi.",
      image:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ],
};
