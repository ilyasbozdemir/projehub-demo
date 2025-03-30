"use client"

import type { Gorev } from "@/models/interfaces"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, MessageSquare, Paperclip } from "lucide-react"
import { takimUyeleri } from "@/constants/data"
import { formatDate } from "@/lib/utils"

interface CardTaskProps {
  gorev: Gorev
  onClick?: () => void
}

export function CardTask({ gorev, onClick }: CardTaskProps) {
  const atananKisi = takimUyeleri.find((uye) => uye.id === gorev.atananKisi)

  const oncelikRenk = {
    dusuk: "bg-blue-500",
    orta: "bg-yellow-500",
    yuksek: "bg-orange-500",
    acil: "bg-red-500",
  }

  const durumBadge = {
    yapilacak: <Badge variant="outline">Yapılacak</Badge>,
    yapiliyor: <Badge variant="secondary">Yapılıyor</Badge>,
    gozden_gecirme: <Badge variant="default">Gözden Geçirme</Badge>,
    tamamlandi: <Badge variant="success">Tamamlandı</Badge>,
  }

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <div className={`h-1 w-full ${oncelikRenk[gorev.oncelik]} rounded-t-lg`} />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{gorev.baslik}</CardTitle>
          {durumBadge[gorev.durum]}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{gorev.aciklama}</p>
        <Progress value={gorev.ilerleme} className="h-2 mb-3" />
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3" />
            <span>{formatDate(gorev.bitisTarihi)}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              <span>{gorev.yorumlar.length}</span>
            </div>
            <div className="flex items-center gap-1">
              <Paperclip className="h-3 w-3" />
              <span>{gorev.dosyalar.length}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {atananKisi && (
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={atananKisi.avatar} alt={`${atananKisi.ad} ${atananKisi.soyad}`} />
              <AvatarFallback>
                {atananKisi.ad[0]}
                {atananKisi.soyad[0]}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs">
              {atananKisi.ad} {atananKisi.soyad}
            </span>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

