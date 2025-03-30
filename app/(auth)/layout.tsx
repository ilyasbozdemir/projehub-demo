import type React from "react"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Giriş - Proje Yönetim Sistemi",
  description: "Proje Yönetim Sistemi giriş sayfası",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-muted/40">
      <div className="hidden md:flex bg-muted/60 items-center justify-center p-8">
        <div className="max-w-md flex flex-col items-center text-center gap-4">
          <Image
            src="/placeholder.svg?height=100&width=100"
            width={100}
            height={100}
            alt="Logo"
            className="rounded-lg"
          />
          <h1 className="text-3xl font-bold">Proje Yönetim Sistemi</h1>
          <p className="text-muted-foreground">
            Müşteriler, takımlar ve yöneticiler için kapsamlı proje yönetim çözümü. Projelerinizi ve görevlerinizi
            kolayca takip edin, iş akışınızı optimize edin.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">{children}</div>
    </div>
  )
}

