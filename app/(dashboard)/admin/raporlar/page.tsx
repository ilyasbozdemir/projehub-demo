"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { gorevler, musteriler, projeler, takimUyeleri } from "@/constants/data"
import { BarChart3, LineChart, PieChart } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function AdminRaporlar() {
  // Proje durumlarına göre sayılar
  const projeDurumlari = {
    beklemede: projeler.filter((p) => p.durum === "beklemede").length,
    devam_ediyor: projeler.filter((p) => p.durum === "devam_ediyor").length,
    tamamlandi: projeler.filter((p) => p.durum === "tamamlandi").length,
    iptal_edildi: projeler.filter((p) => p.durum === "iptal_edildi").length,
  }

  // Görev durumlarına göre sayılar
  const gorevDurumlari = {
    yapilacak: gorevler.filter((g) => g.durum === "yapilacak").length,
    yapiliyor: gorevler.filter((g) => g.durum === "yapiliyor").length,
    gozden_gecirme: gorevler.filter((g) => g.durum === "gozden_gecirme").length,
    tamamlandi: gorevler.filter((g) => g.durum === "tamamlandi").length,
  }

  // Proje tamamlanma oranları
  const projeTamamlanmaOranlari = projeler.map((proje) => ({
    id: proje.id,
    baslik: proje.baslik,
    ilerleme: proje.ilerleme,
  }))

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Raporlar</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Proje</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projeler.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Görev</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gorevler.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Müşteri</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{musteriler.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Takım Üyesi</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{takimUyeleri.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projeler" className="w-full">
        <TabsList>
          <TabsTrigger value="projeler">Proje Raporları</TabsTrigger>
          <TabsTrigger value="gorevler">Görev Raporları</TabsTrigger>
          <TabsTrigger value="kullanicilar">Kullanıcı Raporları</TabsTrigger>
        </TabsList>
        <TabsContent value="projeler" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Proje Durumları</CardTitle>
                <CardDescription>Projelerin durumlarına göre dağılımı</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-60">
                  <PieChart className="h-40 w-40 text-muted-foreground" />
                </div>
                <div className="grid gap-2 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500" />
                      <span>Beklemede</span>
                    </div>
                    <span>{projeDurumlari.beklemede}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <span>Devam Ediyor</span>
                    </div>
                    <span>{projeDurumlari.devam_ediyor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span>Tamamlandı</span>
                    </div>
                    <span>{projeDurumlari.tamamlandi}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <span>İptal Edildi</span>
                    </div>
                    <span>{projeDurumlari.iptal_edildi}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Proje İlerleme Durumları</CardTitle>
                <CardDescription>Projelerin tamamlanma yüzdeleri</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projeTamamlanmaOranlari.map((proje) => (
                    <div key={proje.id} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{proje.baslik}</span>
                        <span>%{proje.ilerleme}</span>
                      </div>
                      <Progress value={proje.ilerleme} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="gorevler" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Görev Durumları</CardTitle>
                <CardDescription>Görevlerin durumlarına göre dağılımı</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-60">
                  <PieChart className="h-40 w-40 text-muted-foreground" />
                </div>
                <div className="grid gap-2 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500" />
                      <span>Yapılacak</span>
                    </div>
                    <span>{gorevDurumlari.yapilacak}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <span>Yapılıyor</span>
                    </div>
                    <span>{gorevDurumlari.yapiliyor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-orange-500" />
                      <span>Gözden Geçirme</span>
                    </div>
                    <span>{gorevDurumlari.gozden_gecirme}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span>Tamamlandı</span>
                    </div>
                    <span>{gorevDurumlari.tamamlandi}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Görev Öncelikleri</CardTitle>
                <CardDescription>Görevlerin önceliklerine göre dağılımı</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-60">
                  <BarChart3 className="h-40 w-40 text-muted-foreground" />
                </div>
                <div className="grid gap-2 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500" />
                      <span>Düşük</span>
                    </div>
                    <span>{gorevler.filter((g) => g.oncelik === "dusuk").length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <span>Orta</span>
                    </div>
                    <span>{gorevler.filter((g) => g.oncelik === "orta").length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-orange-500" />
                      <span>Yüksek</span>
                    </div>
                    <span>{gorevler.filter((g) => g.oncelik === "yuksek").length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <span>Acil</span>
                    </div>
                    <span>{gorevler.filter((g) => g.oncelik === "acil").length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="kullanicilar" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Takım Üyesi Performansı</CardTitle>
                <CardDescription>Takım üyelerinin tamamladıkları görev sayıları</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-60">
                  <BarChart3 className="h-40 w-40 text-muted-foreground" />
                </div>
                <div className="grid gap-2 mt-4">
                  {takimUyeleri.map((uye) => {
                    const tamamlananGorevSayisi = gorevler.filter(
                      (g) => g.atananKisi === uye.id && g.durum === "tamamlandi",
                    ).length

                    return (
                      <div key={uye.id} className="flex items-center justify-between">
                        <span>
                          {uye.ad} {uye.soyad}
                        </span>
                        <span>{tamamlananGorevSayisi} görev</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Müşteri Projeleri</CardTitle>
                <CardDescription>Müşterilerin proje sayıları</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-60">
                  <LineChart className="h-40 w-40 text-muted-foreground" />
                </div>
                <div className="grid gap-2 mt-4">
                  {musteriler.map((musteri) => {
                    const musteriProjeSayisi = projeler.filter((p) => p.musteriId === musteri.id).length

                    return (
                      <div key={musteri.id} className="flex items-center justify-between">
                        <span>
                          {musteri.ad} {musteri.soyad}
                        </span>
                        <span>{musteriProjeSayisi} proje</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

