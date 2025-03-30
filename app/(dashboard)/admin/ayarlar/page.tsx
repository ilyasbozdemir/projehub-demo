import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminAyarlar() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Ayarlar</h1>

      <Tabs defaultValue="genel" className="w-full">
        <TabsList>
          <TabsTrigger value="genel">Genel</TabsTrigger>
          <TabsTrigger value="bildirimler">Bildirimler</TabsTrigger>
          <TabsTrigger value="kullanici">Kullanıcı</TabsTrigger>
          <TabsTrigger value="sistem">Sistem</TabsTrigger>
        </TabsList>
        <TabsContent value="genel" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Genel Ayarlar</CardTitle>
              <CardDescription>Sistem genelinde geçerli olan ayarları yapılandırın</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="company-name">Şirket Adı</Label>
                <Input id="company-name" defaultValue="Acme Inc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-description">Şirket Açıklaması</Label>
                <Textarea id="company-description" defaultValue="Proje yönetim sistemi" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Saat Dilimi</Label>
                <Select defaultValue="europe-istanbul">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Saat dilimi seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="europe-istanbul">Europe/Istanbul (UTC+3)</SelectItem>
                    <SelectItem value="europe-london">Europe/London (UTC+0/+1)</SelectItem>
                    <SelectItem value="america-new_york">America/New_York (UTC-5/-4)</SelectItem>
                    <SelectItem value="asia-tokyo">Asia/Tokyo (UTC+9)</SelectItem>
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
              <div className="flex items-center justify-between">
                <Label htmlFor="weekend-days">Hafta Sonu Günleri</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="weekend-days" defaultChecked />
                  <Label htmlFor="weekend-days">Cumartesi ve Pazar</Label>
                </div>
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
                <Label htmlFor="task-assignments">Görev Atamaları</Label>
                <Switch id="task-assignments" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="task-comments">Görev Yorumları</Label>
                <Switch id="task-comments" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="task-status-changes">Görev Durumu Değişiklikleri</Label>
                <Switch id="task-status-changes" defaultChecked />
              </div>
              <Button>Kaydet</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="kullanici" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Kullanıcı Ayarları</CardTitle>
              <CardDescription>Kullanıcı hesap bilgilerinizi güncelleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Ad</Label>
                <Input id="name" defaultValue="Admin" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname">Soyad</Label>
                <Input id="surname" defaultValue="Kullanıcı" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input id="email" type="email" defaultValue="admin@ornek.com" />
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
        <TabsContent value="sistem" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sistem Ayarları</CardTitle>
              <CardDescription>Sistem yapılandırma ayarlarını düzenleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="maintenance-mode">Bakım Modu</Label>
                <Switch id="maintenance-mode" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="backup-frequency">Yedekleme Sıklığı</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="backup-frequency">
                    <SelectValue placeholder="Yedekleme sıklığı seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Saatlik</SelectItem>
                    <SelectItem value="daily">Günlük</SelectItem>
                    <SelectItem value="weekly">Haftalık</SelectItem>
                    <SelectItem value="monthly">Aylık</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="log-level">Log Seviyesi</Label>
                <Select defaultValue="info">
                  <SelectTrigger id="log-level">
                    <SelectValue placeholder="Log seviyesi seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debug">Debug</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="debug-mode">Debug Modu</Label>
                <Switch id="debug-mode" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="analytics">Analitik</Label>
                <Switch id="analytics" defaultChecked />
              </div>
              <Button>Kaydet</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

