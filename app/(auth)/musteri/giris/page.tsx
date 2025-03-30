"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { musteriler } from "@/constants/data"

export default function MusteriGiris() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const musteri = musteriler.find((m) => m.email === email && m.sifre === password)

    if (musteri) {
      // Gerçek uygulamada burada oturum açma işlemi yapılır
      // Şimdilik sadece yönlendirme yapıyoruz
      router.push("/musteri/dashboard")
    } else {
      setError("E-posta veya şifre hatalı")
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Müşteri Girişi</CardTitle>
        <CardDescription>Projelerinizi takip etmek için giriş yapın</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && <div className="bg-destructive/10 text-destructive text-sm p-2 rounded-md">{error}</div>}
          <div className="space-y-2">
            <Label htmlFor="email">E-posta</Label>
            <Input
              id="email"
              type="email"
              placeholder="ornek@sirket.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Şifre</Label>
              <Link href="#" className="text-sm text-primary hover:underline">
                Şifremi Unuttum
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full">
            Giriş Yap
          </Button>
          <div className="text-sm text-center text-muted-foreground">Demo için: mehmet@sirket.com / musteri123</div>
        </CardFooter>
      </form>
    </Card>
  )
}

