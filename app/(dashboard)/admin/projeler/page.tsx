"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CardProject } from "@/components/ui/card-project"
import { projeler } from "@/constants/data"
import { FileText, Plus, Search } from "lucide-react"

export default function AdminProjeler() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredProjeler = projeler.filter((proje) => {
    const matchesSearch =
      proje.baslik.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proje.aciklama.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || proje.durum === statusFilter

    return matchesSearch && matchesStatus
  })

  const devamEdenProjeler = filteredProjeler.filter((proje) => proje.durum === "devam_ediyor")
  const tamamlananProjeler = filteredProjeler.filter((proje) => proje.durum === "tamamlandi")
  const beklemedekiProjeler = filteredProjeler.filter((proje) => proje.durum === "beklemede")
  const iptalEdilenProjeler = filteredProjeler.filter((proje) => proje.durum === "iptal_edildi")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Projeler</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Yeni Proje
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Proje Ara</CardTitle>
          <CardDescription>Projeleri adına, açıklamasına veya durumuna göre filtreleyin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Proje ara..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="devam_ediyor">Devam Ediyor</SelectItem>
                <SelectItem value="tamamlandi">Tamamlandı</SelectItem>
                <SelectItem value="beklemede">Beklemede</SelectItem>
                <SelectItem value="iptal_edildi">İptal Edildi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Tümü ({filteredProjeler.length})</TabsTrigger>
          <TabsTrigger value="devam-eden">Devam Eden ({devamEdenProjeler.length})</TabsTrigger>
          <TabsTrigger value="tamamlanan">Tamamlanan ({tamamlananProjeler.length})</TabsTrigger>
          <TabsTrigger value="beklemede">Beklemede ({beklemedekiProjeler.length})</TabsTrigger>
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
        <TabsContent value="beklemede" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {beklemedekiProjeler.map((proje) => (
              <CardProject key={proje.id} proje={proje} />
            ))}
            {beklemedekiProjeler.length === 0 && (
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Beklemede olan proje bulunamadı.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

