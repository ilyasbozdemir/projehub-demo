"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { gorevler, projeler, takimUyeleri } from "@/constants/data"
import { Mail, Plus, Search, User } from "lucide-react"

export default function AdminTakimUyeleri() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTakimUyeleri = takimUyeleri.filter((uye) => {
    const fullName = `${uye.ad} ${uye.soyad}`.toLowerCase()
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      uye.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uye.pozisyon.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uye.yetenekler.some((yetenek) => yetenek.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })

  // Her takım üyesi için proje ve görev sayılarını hesapla
  const uyeProjeSayilari = takimUyeleri.reduce(
    (acc, uye) => {
      const uyeProjeleri = projeler.filter((proje) => proje.takimUyeleri.includes(uye.id))
      acc[uye.id] = uyeProjeleri.length
      return acc
    },
    {} as Record<string, number>,
  )

  const uyeGorevSayilari = takimUyeleri.reduce(
    (acc, uye) => {
      const uyeGorevleri = gorevler.filter((gorev) => gorev.atananKisi === uye.id)
      acc[uye.id] = uyeGorevleri.length
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Takım Üyeleri</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Yeni Takım Üyesi
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Takım Üyesi Ara</CardTitle>
          <CardDescription>İsim, e-posta, pozisyon veya yeteneklere göre arama yapın</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Takım üyesi ara..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTakimUyeleri.map((uye) => (
          <Card key={uye.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={uye.avatar} alt={`${uye.ad} ${uye.soyad}`} />
                    <AvatarFallback>
                      {uye.ad[0]}
                      {uye.soyad[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">
                      {uye.ad} {uye.soyad}
                    </CardTitle>
                    <CardDescription>{uye.pozisyon}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{uye.email}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {uye.yetenekler.map((yetenek, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {yetenek}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <Badge variant="secondary">{uyeProjeSayilari[uye.id]} Proje</Badge>
                  <Badge variant="secondary">{uyeGorevSayilari[uye.id]} Görev</Badge>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm">
                  Görevler
                </Button>
                <Button variant="outline" size="sm">
                  Düzenle
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredTakimUyeleri.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-6">
              <User className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">Takım üyesi bulunamadı.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

