"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { musteriler, projeler } from "@/constants/data"
import { Mail, Phone, Plus, Search, User } from "lucide-react"

export default function AdminMusteriler() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMusteriler = musteriler.filter((musteri) => {
    const fullName = `${musteri.ad} ${musteri.soyad}`.toLowerCase()
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      musteri.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (musteri.sirket && musteri.sirket.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })

  // Her müşteri için proje sayısını hesapla
  const musteriProjeSayilari = musteriler.reduce(
    (acc, musteri) => {
      const musteriProjeleri = projeler.filter((proje) => proje.musteriId === musteri.id)
      acc[musteri.id] = musteriProjeleri.length
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Müşteriler</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Yeni Müşteri
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Müşteri Ara</CardTitle>
          <CardDescription>İsim, e-posta veya şirket adına göre arama yapın</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Müşteri ara..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredMusteriler.map((musteri) => (
          <Card key={musteri.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={musteri.avatar} alt={`${musteri.ad} ${musteri.soyad}`} />
                    <AvatarFallback>
                      {musteri.ad[0]}
                      {musteri.soyad[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">
                      {musteri.ad} {musteri.soyad}
                    </CardTitle>
                    {musteri.sirket && <CardDescription>{musteri.sirket}</CardDescription>}
                  </div>
                </div>
                <Badge variant="outline" className="ml-auto">
                  {musteriProjeSayilari[musteri.id]} Proje
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{musteri.email}</span>
                </div>
                {musteri.telefon && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{musteri.telefon}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm">
                  Projeler
                </Button>
                <Button variant="outline" size="sm">
                  Düzenle
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredMusteriler.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-6">
              <User className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">Müşteri bulunamadı.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

