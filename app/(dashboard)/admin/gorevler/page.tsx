"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CardTask } from "@/components/ui/card-task"
import { gorevler, projeler } from "@/constants/data"
import { CheckSquare, Plus, Search } from "lucide-react"

export default function AdminGorevler() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [projectFilter, setProjectFilter] = useState("all")

  const filteredGorevler = gorevler.filter((gorev) => {
    const matchesSearch =
      gorev.baslik.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gorev.aciklama.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || gorev.durum === statusFilter
    const matchesProject = projectFilter === "all" || gorev.projeId === projectFilter

    return matchesSearch && matchesStatus && matchesProject
  })

  const yapilacakGorevler = filteredGorevler.filter((gorev) => gorev.durum === "yapilacak")
  const yapiliyorGorevler = filteredGorevler.filter((gorev) => gorev.durum === "yapiliyor")
  const gozdenGecirmeGorevler = filteredGorevler.filter((gorev) => gorev.durum === "gozden_gecirme")
  const tamamlananGorevler = filteredGorevler.filter((gorev) => gorev.durum === "tamamlandi")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Görevler</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Yeni Görev
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Görev Ara</CardTitle>
          <CardDescription>Görevleri adına, açıklamasına, durumuna veya projesine göre filtreleyin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Görev ara..."
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
                <SelectItem value="yapilacak">Yapılacak</SelectItem>
                <SelectItem value="yapiliyor">Yapılıyor</SelectItem>
                <SelectItem value="gozden_gecirme">Gözden Geçirme</SelectItem>
                <SelectItem value="tamamlandi">Tamamlandı</SelectItem>
              </SelectContent>
            </Select>
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Proje" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Projeler</SelectItem>
                {projeler.map((proje) => (
                  <SelectItem key={proje.id} value={proje.id}>
                    {proje.baslik}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Tümü ({filteredGorevler.length})</TabsTrigger>
          <TabsTrigger value="yapilacak">Yapılacak ({yapilacakGorevler.length})</TabsTrigger>
          <TabsTrigger value="yapiliyor">Yapılıyor ({yapiliyorGorevler.length})</TabsTrigger>
          <TabsTrigger value="gozden_gecirme">Gözden Geçirme ({gozdenGecirmeGorevler.length})</TabsTrigger>
          <TabsTrigger value="tamamlandi">Tamamlandı ({tamamlananGorevler.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredGorevler.map((gorev) => (
              <CardTask key={gorev.id} gorev={gorev} />
            ))}
            {filteredGorevler.length === 0 && (
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <CheckSquare className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Görev bulunamadı.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        <TabsContent value="yapilacak" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {yapilacakGorevler.map((gorev) => (
              <CardTask key={gorev.id} gorev={gorev} />
            ))}
            {yapilacakGorevler.length === 0 && (
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <CheckSquare className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Yapılacak görev bulunamadı.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        <TabsContent value="yapiliyor" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {yapiliyorGorevler.map((gorev) => (
              <CardTask key={gorev.id} gorev={gorev} />
            ))}
            {yapiliyorGorevler.length === 0 && (
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <CheckSquare className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Yapılıyor durumunda görev bulunamadı.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        <TabsContent value="gozden_gecirme" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gozdenGecirmeGorevler.map((gorev) => (
              <CardTask key={gorev.id} gorev={gorev} />
            ))}
            {gozdenGecirmeGorevler.length === 0 && (
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <CheckSquare className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Gözden geçirme durumunda görev bulunamadı.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        <TabsContent value="tamamlandi" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tamamlananGorevler.map((gorev) => (
              <CardTask key={gorev.id} gorev={gorev} />
            ))}
            {tamamlananGorevler.length === 0 && (
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <CheckSquare className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Tamamlanan görev bulunamadı.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

