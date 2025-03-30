import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CardProject } from "@/components/ui/card-project"
import { projeler } from "@/constants/data"
import { BarChart3, CheckCircle2, FileText } from "lucide-react"

export default function MusteriDashboard() {
  // Müşteri ID'si 'musteri1' olan projeleri filtrele
  const musteriProjeleri = projeler.filter((proje) => proje.musteriId === "musteri1")

  const devamEdenProjeler = musteriProjeleri.filter((proje) => proje.durum === "devam_ediyor")
  const tamamlananProjeler = musteriProjeleri.filter((proje) => proje.durum === "tamamlandi")

  const toplamProje = musteriProjeleri.length
  const tamamlananProjeYuzdesi = Math.round((tamamlananProjeler.length / toplamProje) * 100) || 0

  const toplamGorev = musteriProjeleri.reduce((acc, proje) => acc + proje.gorevler.length, 0)
  const tamamlananGorev = musteriProjeleri.reduce(
    (acc, proje) => acc + proje.gorevler.filter((gorev) => gorev.durum === "tamamlandi").length,
    0,
  )
  const tamamlananGorevYuzdesi = Math.round((tamamlananGorev / toplamGorev) * 100) || 0

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Hoş Geldiniz, Mehmet</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Proje</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{toplamProje}</div>
            <p className="text-xs text-muted-foreground">
              {tamamlananProjeler.length} tamamlandı, {devamEdenProjeler.length} devam ediyor
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tamamlanan Projeler</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">%{tamamlananProjeYuzdesi}</div>
            <p className="text-xs text-muted-foreground">
              {tamamlananProjeler.length} / {toplamProje} proje
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tamamlanan Görevler</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">%{tamamlananGorevYuzdesi}</div>
            <p className="text-xs text-muted-foreground">
              {tamamlananGorev} / {toplamGorev} görev
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama İlerleme</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              %
              {Math.round(
                devamEdenProjeler.reduce((acc, proje) => acc + proje.ilerleme, 0) / (devamEdenProjeler.length || 1),
              )}
            </div>
            <p className="text-xs text-muted-foreground">Devam eden projelerin ortalaması</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="devam-eden" className="w-full">
        <TabsList>
          <TabsTrigger value="devam-eden">Devam Eden Projeler</TabsTrigger>
          <TabsTrigger value="tamamlanan">Tamamlanan Projeler</TabsTrigger>
        </TabsList>
        <TabsContent value="devam-eden" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {devamEdenProjeler.map((proje) => (
              <CardProject key={proje.id} proje={proje} />
            ))}
            {devamEdenProjeler.length === 0 && (
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Devam eden proje bulunmamaktadır.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        <TabsContent value="tamamlanan" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tamamlananProjeler.map((proje) => (
              <CardProject key={proje.id} proje={proje} />
            ))}
            {tamamlananProjeler.length === 0 && (
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Tamamlanan proje bulunmamaktadır.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

