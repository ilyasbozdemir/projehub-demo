import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CardProject } from "@/components/ui/card-project"
import { CardTask } from "@/components/ui/card-task"
import { gorevler, projeler } from "@/constants/data"
import { CheckCircle2, Clock, FileText } from "lucide-react"

export default function TakimDashboard() {
  // Takım üyesi ID'si 'takim1' olan projeleri ve görevleri filtrele
  const takimUyeId = "takim1"
  const takimProjeleri = projeler.filter((proje) => proje.takimUyeleri.includes(takimUyeId))
  const takimGorevleri = gorevler.filter((gorev) => gorev.atananKisi === takimUyeId)

  const devamEdenGorevler = takimGorevleri.filter((gorev) => gorev.durum !== "tamamlandi")
  const tamamlananGorevler = takimGorevleri.filter((gorev) => gorev.durum === "tamamlandi")

  const toplamGorev = takimGorevleri.length
  const tamamlananGorevYuzdesi = Math.round((tamamlananGorevler.length / toplamGorev) * 100) || 0

  // Bugünün tarihini al
  const bugun = new Date()

  // Yaklaşan görevleri filtrele (bitiş tarihi bugünden sonra olan ve tamamlanmamış görevler)
  const yaklasanGorevler = devamEdenGorevler
    .filter((gorev) => new Date(gorev.bitisTarihi) > bugun)
    .sort((a, b) => new Date(a.bitisTarihi).getTime() - new Date(b.bitisTarihi).getTime())

  // Geciken görevleri filtrele (bitiş tarihi bugünden önce olan ve tamamlanmamış görevler)
  const gecikenGorevler = devamEdenGorevler.filter((gorev) => new Date(gorev.bitisTarihi) < bugun)

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Hoş Geldiniz, Ali</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Görev</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{toplamGorev}</div>
            <p className="text-xs text-muted-foreground">
              {tamamlananGorevler.length} tamamlandı, {devamEdenGorevler.length} devam ediyor
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
              {tamamlananGorevler.length} / {toplamGorev} görev
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yaklaşan Görevler</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{yaklasanGorevler.length}</div>
            <p className="text-xs text-muted-foreground">Önümüzdeki 7 gün içinde</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Geciken Görevler</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{gecikenGorevler.length}</div>
            <p className="text-xs text-muted-foreground">Süresi geçmiş görevler</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Projelerim</CardTitle>
            <CardDescription>Dahil olduğunuz projeler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {takimProjeleri.slice(0, 3).map((proje) => (
                <CardProject key={proje.id} proje={proje} />
              ))}
              {takimProjeleri.length === 0 && (
                <div className="flex flex-col items-center justify-center py-6">
                  <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Dahil olduğunuz proje bulunmamaktadır.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Görevlerim</CardTitle>
            <CardDescription>Size atanan görevler</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="devam-eden">
              <TabsList className="mb-4">
                <TabsTrigger value="devam-eden">Devam Eden</TabsTrigger>
                <TabsTrigger value="tamamlanan">Tamamlanan</TabsTrigger>
              </TabsList>
              <TabsContent value="devam-eden">
                <div className="grid gap-4">
                  {devamEdenGorevler.slice(0, 3).map((gorev) => (
                    <CardTask key={gorev.id} gorev={gorev} />
                  ))}
                  {devamEdenGorevler.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-6">
                      <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">Devam eden görev bulunmamaktadır.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="tamamlanan">
                <div className="grid gap-4">
                  {tamamlananGorevler.slice(0, 3).map((gorev) => (
                    <CardTask key={gorev.id} gorev={gorev} />
                  ))}
                  {tamamlananGorevler.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-6">
                      <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">Tamamlanan görev bulunmamaktadır.</p>
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

