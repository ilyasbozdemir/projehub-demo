import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CardProject } from "@/components/ui/card-project"
import { CardTask } from "@/components/ui/card-task"
import { gorevler, musteriler, projeler, takimUyeleri } from "@/constants/data"
import { CheckCircle2, FileText, Users } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function AdminDashboard() {
  const devamEdenProjeler = projeler.filter((proje) => proje.durum === "devam_ediyor")
  const tamamlananProjeler = projeler.filter((proje) => proje.durum === "tamamlandi")

  const toplamProje = projeler.length
  const tamamlananProjeYuzdesi = Math.round((tamamlananProjeler.length / toplamProje) * 100) || 0

  const toplamGorev = gorevler.length
  const tamamlananGorev = gorevler.filter((gorev) => gorev.durum === "tamamlandi").length
  const tamamlananGorevYuzdesi = Math.round((tamamlananGorev / toplamGorev) * 100) || 0

  // Bugünün tarihini al
  const bugun = new Date()

  // Yaklaşan görevleri filtrele (bitiş tarihi bugünden sonra olan ve tamamlanmamış görevler)
  const yaklasanGorevler = gorevler
    .filter((gorev) => gorev.durum !== "tamamlandi" && new Date(gorev.bitisTarihi) > bugun)
    .sort((a, b) => new Date(a.bitisTarihi).getTime() - new Date(b.bitisTarihi).getTime())

  // Geciken görevleri filtrele (bitiş tarihi bugünden önce olan ve tamamlanmamış görevler)
  const gecikenGorevler = gorevler.filter(
    (gorev) => gorev.durum !== "tamamlandi" && new Date(gorev.bitisTarihi) < bugun,
  )

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

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
            <CardTitle className="text-sm font-medium">Toplam Görev</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{toplamGorev}</div>
            <p className="text-xs text-muted-foreground">
              {tamamlananGorev} tamamlandı, {toplamGorev - tamamlananGorev} devam ediyor
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Müşteriler</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{musteriler.length}</div>
            <p className="text-xs text-muted-foreground">Toplam müşteri sayısı</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Takım Üyeleri</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{takimUyeleri.length}</div>
            <p className="text-xs text-muted-foreground">Toplam takım üyesi sayısı</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Proje Durumu</CardTitle>
            <CardDescription>Tüm projelerin genel durumu</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <span className="font-medium">Tamamlanan Projeler</span>
                  </div>
                  <span>{tamamlananProjeYuzdesi}%</span>
                </div>
                <Progress value={tamamlananProjeYuzdesi} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <span className="font-medium">Tamamlanan Görevler</span>
                  </div>
                  <span>{tamamlananGorevYuzdesi}%</span>
                </div>
                <Progress value={tamamlananGorevYuzdesi} className="h-2" />
              </div>

              <div className="pt-4">
                <h3 className="font-medium mb-2">Geciken Görevler</h3>
                <div className="grid gap-2">
                  {gecikenGorevler.slice(0, 3).map((gorev) => (
                    <CardTask key={gorev.id} gorev={gorev} />
                  ))}
                  {gecikenGorevler.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-6">
                      <CheckCircle2 className="h-8 w-8 text-green-500 mb-2" />
                      <p className="text-muted-foreground">Geciken görev bulunmamaktadır.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Son Projeler</CardTitle>
            <CardDescription>En son eklenen projeler</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="devam-eden">
              <TabsList className="mb-4">
                <TabsTrigger value="devam-eden">Devam Eden</TabsTrigger>
                <TabsTrigger value="tamamlanan">Tamamlanan</TabsTrigger>
              </TabsList>
              <TabsContent value="devam-eden">
                <div className="grid gap-4">
                  {devamEdenProjeler.slice(0, 3).map((proje) => (
                    <CardProject key={proje.id} proje={proje} />
                  ))}
                  {devamEdenProjeler.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-6">
                      <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">Devam eden proje bulunmamaktadır.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="tamamlanan">
                <div className="grid gap-4">
                  {tamamlananProjeler.slice(0, 3).map((proje) => (
                    <CardProject key={proje.id} proje={proje} />
                  ))}
                  {tamamlananProjeler.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-6">
                      <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">Tamamlanan proje bulunmamaktadır.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

