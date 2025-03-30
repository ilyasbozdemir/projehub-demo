// Kullanıcı arayüzleri
export interface Kullanici {
  id: string
  ad: string
  soyad: string
  email: string
  sifre: string
  rol: "admin" | "takim" | "musteri"
  avatar?: string
}

export interface Musteri extends Kullanici {
  rol: "musteri"
  sirket?: string
  telefon?: string
}

export interface TakimUyesi extends Kullanici {
  rol: "takim"
  pozisyon: string
  yetenekler: string[]
}

export interface Admin extends Kullanici {
  rol: "admin"
  yetki: "tam" | "kisitli"
}

// Proje ve görev arayüzleri
export interface Proje {
  id: string
  baslik: string
  aciklama: string
  baslangicTarihi: Date
  bitisTarihi: Date
  durum: "beklemede" | "devam_ediyor" | "tamamlandi" | "iptal_edildi"
  musteriId: string
  takimUyeleri: string[]
  ilerleme: number // 0-100 arası yüzde
  gorevler: Gorev[]
  etiketler: string[]
  yorumlar: Yorum[]
}

export interface Gorev {
  id: string
  baslik: string
  aciklama: string
  projeId: string
  atananKisi?: string
  oncelik: "dusuk" | "orta" | "yuksek" | "acil"
  durum: "yapilacak" | "yapiliyor" | "gozden_gecirme" | "tamamlandi"
  baslangicTarihi: Date
  bitisTarihi: Date
  tahminiSure: number // saat cinsinden
  gercekSure?: number // saat cinsinden
  ilerleme: number // 0-100 arası yüzde
  yorumlar: Yorum[]
  dosyalar: Dosya[]
}

export interface Yorum {
  id: string
  kullaniciId: string
  icerik: string
  tarih: Date
  dosyalar?: Dosya[]
}

export interface Dosya {
  id: string
  ad: string
  url: string
  boyut: number
  yuklemeTarihi: Date
  yukleyenId: string
}

export interface Bildirim {
  id: string
  aliciId: string
  baslik: string
  icerik: string
  tarih: Date
  okundu: boolean
  tip: "gorev" | "proje" | "yorum" | "sistem"
  ilgiliId?: string // Görev ID, Proje ID vb.
}

