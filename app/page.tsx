import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Proje Yönetim Sistemi</CardTitle>
          <CardDescription>Müşteri, Proje ve Takım Yönetim Sistemi'ne hoş geldiniz</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Link href="/musteri/giris" className="w-full">
            <Button className="w-full" variant="outline">
              Müşteri Girişi
            </Button>
          </Link>
          <Link href="/takim/giris" className="w-full">
            <Button className="w-full" variant="outline">
              Takım Üyesi Girişi
            </Button>
          </Link>
          <Link href="/admin/giris" className="w-full">
            <Button className="w-full" variant="default">
              Admin Girişi
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

