"use client"

import type { Proje } from "@/models/interfaces"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle2, Clock } from "lucide-react"
import { takimUyeleri } from "@/constants/data"
import { formatDate } from "@/lib/utils"

interface CardProjectProps {
  proje: Proje
  onClick?: () => void
}

export function CardProject({ proje, onClick }: CardProjectProps) {
  const durumBadge = {
    beklemede: <Badge variant="outline">Beklemede</Badge>,
    devam_ediyor: <Badge variant="secondary">Devam Ediyor</Badge>,
    tamamlandi: <Badge variant="success">Tamamlandı</Badge>,
    iptal_edildi: <Badge variant="destructive">İptal Edildi</Badge>,
  }

  const tamamlananGorevSayisi = proje.gorevler.filter((gorev) => gorev.durum === "tamamlandi").length
  const toplamGorevSayisi = proje.gorevler.length

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{proje.baslik}</CardTitle>
          {durumBadge[proje.durum]}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{proje.aciklama}</p>

        <div className="flex justify-between items-center mb-2 text-sm">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            <span>
              {tamamlananGorevSayisi}/{toplamGorevSayisi} görev
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>
              {formatDate(proje.baslangicTarihi)} - {formatDate(proje.bitisTarihi)}
            </span>
          </div>
        </div>

        <Progress value={proje.ilerleme} className="h-2 mb-3" />

        <div className="flex flex-wrap gap-1 mt-2">
          {proje.etiketler.map((etiket, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {etiket}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex -space-x-2">
          {proje.takimUyeleri.slice(0, 3).map((uyeId, index) => {
            const uye = takimUyeleri.find((u) => u.id === uyeId)
            if (!uye) return null

            return (
              <Avatar key={index} className="h-8 w-8 border-2 border-background">
                <AvatarImage src={uye.avatar} alt={`${uye.ad} ${uye.soyad}`} />
                <AvatarFallback>
                  {uye.ad[0]}
                  {uye.soyad[0]}
                </AvatarFallback>
              </Avatar>
            )
          })}

          {proje.takimUyeleri.length > 3 && (
            <Avatar className="h-8 w-8 border-2 border-background">
              <AvatarFallback>+{proje.takimUyeleri.length - 3}</AvatarFallback>
            </Avatar>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

