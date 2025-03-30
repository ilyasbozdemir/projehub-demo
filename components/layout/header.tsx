"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Bell, Menu, Search } from "lucide-react"
import { Sidebar } from "@/components/layout/sidebar"
import { Badge } from "@/components/ui/badge"
import { bildirimler } from "@/constants/data"

interface HeaderProps {
  role: "admin" | "takim" | "musteri"
  user: {
    ad: string
    soyad: string
    avatar?: string
  }
}

export function Header({ role, user }: HeaderProps) {
  const [okunmamisBildirimSayisi, setOkunmamisBildirimSayisi] = useState(bildirimler.filter((b) => !b.okundu).length)

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] p-0">
          <Sidebar role={role} />
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Ara..."
              className="w-full bg-background shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {okunmamisBildirimSayisi > 0 && (
              <Badge
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                variant="destructive"
              >
                {okunmamisBildirimSayisi}
              </Badge>
            )}
            <span className="sr-only">Bildirimler</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[300px]">
          <DropdownMenuLabel>Bildirimler</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {bildirimler.slice(0, 5).map((bildirim) => (
            <DropdownMenuItem key={bildirim.id} className="flex flex-col items-start py-2">
              <div className="font-medium">{bildirim.baslik}</div>
              <div className="text-sm text-muted-foreground">{bildirim.icerik}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {new Date(bildirim.tarih).toLocaleDateString("tr-TR")}
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/${role}/bildirimler`} className="w-full text-center cursor-pointer">
              Tüm bildirimleri gör
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user.avatar || "/placeholder.svg?height=32&width=32"}
                alt={`${user.ad} ${user.soyad}`}
              />
              <AvatarFallback>
                {user.ad[0]}
                {user.soyad[0]}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/${role}/profil`}>Profil</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/${role}/ayarlar`}>Ayarlar</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/">Çıkış Yap</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

