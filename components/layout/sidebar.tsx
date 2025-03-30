"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart3, CheckSquare, FileText, Home, LayoutDashboard, LogOut, Settings, Users } from "lucide-react"

interface SidebarProps {
  role: "admin" | "takim" | "musteri"
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()

  const adminLinks = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Projeler",
      href: "/admin/projeler",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Görevler",
      href: "/admin/gorevler",
      icon: <CheckSquare className="h-5 w-5" />,
    },
    {
      title: "Müşteriler",
      href: "/admin/musteriler",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Takım Üyeleri",
      href: "/admin/takim-uyeleri",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Raporlar",
      href: "/admin/raporlar",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Ayarlar",
      href: "/admin/ayarlar",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const takimLinks = [
    {
      title: "Dashboard",
      href: "/takim/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Projelerim",
      href: "/takim/projelerim",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Görevlerim",
      href: "/takim/gorevlerim",
      icon: <CheckSquare className="h-5 w-5" />,
    },
    {
      title: "Takvim",
      href: "/takim/takvim",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Ayarlar",
      href: "/takim/ayarlar",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const musteriLinks = [
    {
      title: "Dashboard",
      href: "/musteri/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Projelerim",
      href: "/musteri/projelerim",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Ayarlar",
      href: "/musteri/ayarlar",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const links = role === "admin" ? adminLinks : role === "takim" ? takimLinks : musteriLinks

  return (
    <div className="flex h-full flex-col border-r bg-muted/40">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <FileText className="h-6 w-6" />
          <span className="">Proje Yönetim</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <nav className="grid gap-1 px-2 py-4">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary",
                pathname === link.href ? "bg-muted text-primary" : "text-muted-foreground",
              )}
            >
              {link.icon}
              {link.title}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="mt-auto border-t p-4">
        <Link href="/">
          <Button variant="outline" className="w-full justify-start gap-2">
            <LogOut className="h-4 w-4" />
            Çıkış Yap
          </Button>
        </Link>
      </div>
    </div>
  )
}

