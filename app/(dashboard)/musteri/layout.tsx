import type React from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"

export default function MusteriLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = {
    ad: "Mehmet",
    soyad: "Kaya",
    avatar: "/placeholder.svg?height=32&width=32",
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[240px_1fr]">
      <div className="hidden lg:block">
        <Sidebar role="musteri" />
      </div>
      <div className="flex flex-col">
        <Header role="musteri" user={user} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

