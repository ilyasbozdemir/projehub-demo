import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MusteriAyarlar() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Ayarlar</h1>

      <Tabs defaultValue="profil" className="w-full">
        <TabsList>
          <TabsTrigger value="profil">Profil</TabsTrigger>
          <TabsTrigger value="bildirimler">Bildirimler</TabsTrigger>
          <TabsTrigger value="tercihler">Tercihler</TabsTrigger>
        </TabsList>
        <TabsContent value="profil" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Profil Bilgileri</CardTitle>
              <CardDescription>Kişisel bilgilerinizi ve hesap ayarlarınızı güncelleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Ad</Label>
                <Input id="name" defaultValue="Mehmet" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname">Soyad</Label>
                <Input id="surname" defaultValue="Kaya" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input id="email" type="email" defaultValue="mehmet@sirket.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Şirket</Label>
                <Input id="company" defaultValue="ABC Teknoloji Ltd." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input id="phone" defaultValue="0555 123 4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="current-password">Mevcut Şifre</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Yeni Şifre</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Şifre Tekrar</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button>Kaydet</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bildirimler" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Bildirim Ayarları</CardTitle>
              <CardDescription>Bildirim tercihlerinizi yapılandırın</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">E-posta Bildirimleri</Label>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="browser-notifications">Tarayıcı Bildirimleri</Label>
                <Switch id="browser-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="project-updates">Proje Güncellemeleri</Label>
                <Switch id="project-updates" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="project-completion">Proje Tamamlanma Bildirimleri</Label>
                <Switch id="project-completion" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="weekly-reports">Haftalık Raporlar</Label>
                <Switch id="weekly-reports" defaultChecked />
              </div>
              <Button>Kaydet</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tercihler" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tercihler</CardTitle>
              <CardDescription>Uygulama tercihlerinizi yapılandırın</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="language">Dil</Label>
                <Select defaultValue="tr">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Dil seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tr">Türkçe</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="theme">Tema</Label>
                <Select defaultValue="system">
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Tema seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Açık</SelectItem>
                    <SelectItem value="dark">Koyu</SelectItem>
                    <SelectItem value="system">Sistem</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-format">Tarih Formatı</Label>
                <Select defaultValue="dd-mm-yyyy">
                  <SelectTrigger id="date-format">
                    <SelectValue placeholder="Tarih formatı seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                    <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                    <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>Kaydet</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

