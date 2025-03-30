"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CardProject } from "@/components/ui/card-project"
import { projeler } from "@/constants/data"
import { FileText, Search } from "lucide-react"

export default function TakimProjelerim() {
  const [searchTerm, setSearchTerm] = useState("")

  // Takım üyesi ID'si 'takim1' olan projeleri filtrele
  const takimUyeId = "takim1"
  const takimProjeleri = projeler.filter((proje) => proje.takimUyeleri.includes(takimUyeId))

  const filteredProjeler = takimProjeleri.filter((proje) => {
    return (
      proje.baslik.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proje.aciklama.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const devamEdenProjeler = filteredProjeler.filter((proje) => proje.durum === "devam_ediyor")
  const tamamlananProjeler = filteredProjeler.filter((proje) => proje.durum === "tamamlandi")

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Projelerim</h1>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Proje ara..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Tümü ({filteredProjeler.length})</TabsTrigger>
          <TabsTrigger value="devam-eden">Devam Eden ({devamEdenProjeler.length})</TabsTrigger>
          <TabsTrigger value="tamamlanan">Tamamlanan ({tamamlananProjeler.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjeler.map((proje) => (
              <CardProject key={proje.id} proje={proje} />
            ))}
            {filteredProjeler.length === 0 && (
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Proje bulunamadı.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        <TabsContent value="devam-eden" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {devamEdenProjeler.map((proje) => (
              <CardProject key={proje.id} proje={proje} />
            ))}
            {devamEdenProjeler.length === 0 && (
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Devam eden proje bulunamadı.</p>
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
                  <p className="text-muted-foreground">Tamamlanan proje bulunamadı.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

