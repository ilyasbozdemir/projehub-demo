import type { Admin, Bildirim, Dosya, Gorev, Kullanici, Musteri, Proje, TakimUyesi, Yorum } from "@/models/interfaces"

// Örnek kullanıcılar
export const kullanicilar: Kullanici[] = [
  {
    id: "admin1",
    ad: "Admin",
    soyad: "Kullanıcı",
    email: "admin@ornek.com",
    sifre: "admin123",
    rol: "admin",
    avatar: "/avatars/admin.png",
  },
  {
    id: "takim1",
    ad: "Ali",
    soyad: "Yılmaz",
    email: "ali@ornek.com",
    sifre: "takim123",
    rol: "takim",
    avatar: "/avatars/ali.png",
  },
  {
    id: "takim2",
    ad: "Ayşe",
    soyad: "Demir",
    email: "ayse@ornek.com",
    sifre: "takim123",
    rol: "takim",
    avatar: "/avatars/ayse.png",
  },
  {
    id: "musteri1",
    ad: "Mehmet",
    soyad: "Kaya",
    email: "mehmet@sirket.com",
    sifre: "musteri123",
    rol: "musteri",
    avatar: "/avatars/mehmet.png",
  },
  {
    id: "musteri2",
    ad: "Zeynep",
    soyad: "Şahin",
    email: "zeynep@sirket.com",
    sifre: "musteri123",
    rol: "musteri",
    avatar: "/avatars/zeynep.png",
  },
]

// Örnek müşteriler
export const musteriler: Musteri[] = [
  {
    id: "musteri1",
    ad: "Mehmet",
    soyad: "Kaya",
    email: "mehmet@sirket.com",
    sifre: "musteri123",
    rol: "musteri",
    sirket: "ABC Teknoloji Ltd.",
    telefon: "0555 123 4567",
    avatar: "/avatars/mehmet.png",
  },
  {
    id: "musteri2",
    ad: "Zeynep",
    soyad: "Şahin",
    email: "zeynep@sirket.com",
    sifre: "musteri123",
    rol: "musteri",
    sirket: "XYZ Yazılım A.Ş.",
    telefon: "0532 987 6543",
    avatar: "/avatars/zeynep.png",
  },
]

// Örnek takım üyeleri
export const takimUyeleri: TakimUyesi[] = [
  {
    id: "takim1",
    ad: "Ali",
    soyad: "Yılmaz",
    email: "ali@ornek.com",
    sifre: "takim123",
    rol: "takim",
    pozisyon: "Frontend Geliştirici",
    yetenekler: ["React", "Next.js", "Tailwind CSS"],
    avatar: "/avatars/ali.png",
  },
  {
    id: "takim2",
    ad: "Ayşe",
    soyad: "Demir",
    email: "ayse@ornek.com",
    sifre: "takim123",
    rol: "takim",
    pozisyon: "Backend Geliştirici",
    yetenekler: ["Node.js", "Express", "MongoDB"],
    avatar: "/avatars/ayse.png",
  },
  {
    id: "takim3",
    ad: "Fatma",
    soyad: "Çelik",
    email: "fatma@ornek.com",
    sifre: "takim123",
    rol: "takim",
    pozisyon: "UI/UX Tasarımcı",
    yetenekler: ["Figma", "Adobe XD", "Sketch"],
    avatar: "/avatars/fatma.png",
  },
]

// Örnek adminler
export const adminler: Admin[] = [
  {
    id: "admin1",
    ad: "Admin",
    soyad: "Kullanıcı",
    email: "admin@ornek.com",
    sifre: "admin123",
    rol: "admin",
    yetki: "tam",
    avatar: "/avatars/admin.png",
  },
]

// Örnek projeler
export const projeler: Proje[] = [
  {
    id: "proje1",
    baslik: "E-Ticaret Web Sitesi",
    aciklama: "ABC Teknoloji için e-ticaret web sitesi geliştirme projesi",
    baslangicTarihi: new Date("2023-01-15"),
    bitisTarihi: new Date("2023-04-15"),
    durum: "devam_ediyor",
    musteriId: "musteri1",
    takimUyeleri: ["takim1", "takim2"],
    ilerleme: 65,
    gorevler: [],
    etiketler: ["e-ticaret", "web", "react"],
    yorumlar: [],
  },
  {
    id: "proje2",
    baslik: "Mobil Uygulama Geliştirme",
    aciklama: "XYZ Yazılım için mobil uygulama geliştirme projesi",
    baslangicTarihi: new Date("2023-02-01"),
    bitisTarihi: new Date("2023-05-01"),
    durum: "devam_ediyor",
    musteriId: "musteri2",
    takimUyeleri: ["takim2", "takim3"],
    ilerleme: 40,
    gorevler: [],
    etiketler: ["mobil", "react-native", "ios", "android"],
    yorumlar: [],
  },
  {
    id: "proje3",
    baslik: "Kurumsal Web Sitesi Yenileme",
    aciklama: "ABC Teknoloji için kurumsal web sitesi yenileme projesi",
    baslangicTarihi: new Date("2022-11-01"),
    bitisTarihi: new Date("2023-01-31"),
    durum: "tamamlandi",
    musteriId: "musteri1",
    takimUyeleri: ["takim1", "takim3"],
    ilerleme: 100,
    gorevler: [],
    etiketler: ["web", "kurumsal", "next.js"],
    yorumlar: [],
  },
]

// Örnek görevler
export const gorevler: Gorev[] = [
  {
    id: "gorev1",
    baslik: "Ana Sayfa Tasarımı",
    aciklama: "E-ticaret sitesi ana sayfa tasarımının yapılması",
    projeId: "proje1",
    atananKisi: "takim3",
    oncelik: "yuksek",
    durum: "tamamlandi",
    baslangicTarihi: new Date("2023-01-20"),
    bitisTarihi: new Date("2023-02-05"),
    tahminiSure: 40,
    gercekSure: 38,
    ilerleme: 100,
    yorumlar: [],
    dosyalar: [],
  },
  {
    id: "gorev2",
    baslik: "Ürün Listeleme Sayfası",
    aciklama: "E-ticaret sitesi ürün listeleme sayfasının geliştirilmesi",
    projeId: "proje1",
    atananKisi: "takim1",
    oncelik: "orta",
    durum: "yapiliyor",
    baslangicTarihi: new Date("2023-02-06"),
    bitisTarihi: new Date("2023-02-20"),
    tahminiSure: 30,
    ilerleme: 70,
    yorumlar: [],
    dosyalar: [],
  },
  {
    id: "gorev3",
    baslik: "Ödeme Sistemi Entegrasyonu",
    aciklama: "E-ticaret sitesi ödeme sistemi entegrasyonu",
    projeId: "proje1",
    atananKisi: "takim2",
    oncelik: "yuksek",
    durum: "yapilacak",
    baslangicTarihi: new Date("2023-02-21"),
    bitisTarihi: new Date("2023-03-10"),
    tahminiSure: 50,
    ilerleme: 0,
    yorumlar: [],
    dosyalar: [],
  },
  {
    id: "gorev4",
    baslik: "Mobil Uygulama UI Tasarımı",
    aciklama: "Mobil uygulama için UI tasarımlarının hazırlanması",
    projeId: "proje2",
    atananKisi: "takim3",
    oncelik: "yuksek",
    durum: "gozden_gecirme",
    baslangicTarihi: new Date("2023-02-05"),
    bitisTarihi: new Date("2023-02-25"),
    tahminiSure: 45,
    gercekSure: 42,
    ilerleme: 90,
    yorumlar: [],
    dosyalar: [],
  },
  {
    id: "gorev5",
    baslik: "Kullanıcı Kimlik Doğrulama",
    aciklama: "Mobil uygulama için kullanıcı kimlik doğrulama sisteminin geliştirilmesi",
    projeId: "proje2",
    atananKisi: "takim2",
    oncelik: "orta",
    durum: "yapiliyor",
    baslangicTarihi: new Date("2023-02-26"),
    bitisTarihi: new Date("2023-03-15"),
    tahminiSure: 35,
    ilerleme: 50,
    yorumlar: [],
    dosyalar: [],
  },
]

// Projelere görevleri ekleme
projeler.forEach((proje) => {
  proje.gorevler = gorevler.filter((gorev) => gorev.projeId === proje.id)
})

// Örnek yorumlar
export const yorumlar: Yorum[] = [
  {
    id: "yorum1",
    kullaniciId: "takim1",
    icerik: "Ana sayfa tasarımı için revizyon gerekiyor. Müşteri daha modern bir görünüm istiyor.",
    tarih: new Date("2023-01-25"),
    dosyalar: [],
  },
  {
    id: "yorum2",
    kullaniciId: "admin1",
    icerik: "Ürün listeleme sayfası için filtreleme özelliği eklenecek.",
    tarih: new Date("2023-02-10"),
    dosyalar: [],
  },
  {
    id: "yorum3",
    kullaniciId: "musteri1",
    icerik: "Ana sayfa tasarımı çok beğendim, teşekkürler.",
    tarih: new Date("2023-02-06"),
    dosyalar: [],
  },
]

// Örnek dosyalar
export const dosyalar: Dosya[] = [
  {
    id: "dosya1",
    ad: "ana-sayfa-tasarim.fig",
    url: "/dosyalar/ana-sayfa-tasarim.fig",
    boyut: 2048, // KB
    yuklemeTarihi: new Date("2023-01-22"),
    yukleyenId: "takim3",
  },
  {
    id: "dosya2",
    ad: "urun-listeleme.png",
    url: "/dosyalar/urun-listeleme.png",
    boyut: 1536, // KB
    yuklemeTarihi: new Date("2023-02-08"),
    yukleyenId: "takim1",
  },
]

// Örnek bildirimler
export const bildirimler: Bildirim[] = [
  {
    id: "bildirim1",
    aliciId: "takim1",
    baslik: "Yeni Görev Atandı",
    icerik: "Ürün Listeleme Sayfası görevi size atandı.",
    tarih: new Date("2023-02-06"),
    okundu: true,
    tip: "gorev",
    ilgiliId: "gorev2",
  },
  {
    id: "bildirim2",
    aliciId: "takim2",
    baslik: "Yeni Görev Atandı",
    icerik: "Ödeme Sistemi Entegrasyonu görevi size atandı.",
    tarih: new Date("2023-02-21"),
    okundu: false,
    tip: "gorev",
    ilgiliId: "gorev3",
  },
  {
    id: "bildirim3",
    aliciId: "musteri1",
    baslik: "Proje İlerlemesi",
    icerik: "E-Ticaret Web Sitesi projesi %65 tamamlandı.",
    tarih: new Date("2023-02-15"),
    okundu: false,
    tip: "proje",
    ilgiliId: "proje1",
  },
]

// Görevlere yorumları ekleme
gorevler.forEach((gorev) => {
  gorev.yorumlar = yorumlar.filter(
    (yorum) => Math.random() > 0.5, // Rastgele dağıtım için
  )

  gorev.dosyalar = dosyalar.filter(
    (dosya) => Math.random() > 0.7, // Rastgele dağıtım için
  )
})

// Projelere yorumları ekleme
projeler.forEach((proje) => {
  proje.yorumlar = yorumlar.filter(
    (yorum) => Math.random() > 0.5, // Rastgele dağıtım için
  )
})

