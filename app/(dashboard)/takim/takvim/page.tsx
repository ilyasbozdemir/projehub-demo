"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { gorevler, projeler } from "@/constants/data"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react"

export default function TakimTakvim() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedProject, setSelectedProject] = useState("all")

  // Takım üyesi ID'si 'takim1' olan görevleri filtrele
  const takimUyeId = "takim1"
  const takimGorevleri = gorevler.filter((gorev) => gorev.atananKisi === takimUyeId)

  // Takım üyesinin dahil olduğu projeleri filtrele
  const takimProjeleri = projeler.filter((proje) => proje.takimUyeleri.includes(takimUyeId))

  // Seçilen projeye göre görevleri filtrele
  const filteredGorevler =
    selectedProject === "all" ? takimGorevleri : takimGorevleri.filter((gorev) => gorev.projeId === selectedProject)

  // Ay içindeki günleri oluştur
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()

  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

  // Pazar günü 0, Pazartesi 1 olarak başlatmak için düzeltme
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const previousMonthDays = Array.from({ length: adjustedFirstDay }, (_, i) => i)

  // Ay adını al
  const monthNames = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ]

  const monthName = monthNames[currentMonth.getMonth()]
  const year = currentMonth.getFullYear()

  // Önceki aya git
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  // Sonraki aya git
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  // Belirli bir gün için görevleri bul
  const getTasksForDay = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)

    return filteredGorevler.filter((gorev) => {
      const gorevBaslangic = new Date(gorev.baslangicTarihi)
      const gorevBitis = new Date(gorev.bitisTarihi)

      // Görevin başlangıç ve bitiş tarihleri arasında mı kontrol et
      return date >= gorevBaslangic && date <= gorevBitis
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Takvim</h1>
        <Select value={selectedProject} onValueChange={setSelectedProject}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Proje" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Projeler</SelectItem>
            {takimProjeleri.map((proje) => (
              <SelectItem key={proje.id} value={proje.id}>
                {proje.baslik}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl">
            {monthName} {year}
          </CardTitle>
          <div className="flex items-center gap-2">
            <button onClick={goToPreviousMonth} className="p-1 rounded-full hover:bg-muted" aria-label="Önceki ay">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={goToNextMonth} className="p-1 rounded-full hover:bg-muted" aria-label="Sonraki ay">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1">
            {["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"].map((day, index) => (
              <div key={index} className="text-center font-medium py-2">
                {day}
              </div>
            ))}

            {previousMonthDays.map((_, index) => (
              <div key={`prev-${index}`} className="h-24 p-1 border rounded-md bg-muted/20 opacity-50" />
            ))}

            {days.map((day) => {
              const tasksForDay = getTasksForDay(day)
              const isToday =
                new Date().getDate() === day &&
                new Date().getMonth() === currentMonth.getMonth() &&
                new Date().getFullYear() === currentMonth.getFullYear()

              return (
                <div
                  key={day}
                  className={`h-24 p-1 border rounded-md overflow-hidden ${
                    isToday ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className={`text-sm font-medium ${isToday ? "text-primary" : ""}`}>{day}</span>
                    {tasksForDay.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {tasksForDay.length}
                      </Badge>
                    )}
                  </div>
                  <div className="mt-1 space-y-1 overflow-y-auto max-h-[calc(100%-20px)]">
                    {tasksForDay.slice(0, 2).map((gorev) => (
                      <div
                        key={gorev.id}
                        className={`text-xs p-1 rounded truncate ${
                          gorev.durum === "tamamlandi"
                            ? "bg-green-100 text-green-800"
                            : gorev.oncelik === "yuksek" || gorev.oncelik === "acil"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {gorev.baslik}
                      </div>
                    ))}
                    {tasksForDay.length > 2 && (
                      <div className="text-xs text-muted-foreground text-center">+{tasksForDay.length - 2} daha</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Yaklaşan Görevler</CardTitle>
          <CardDescription>Önümüzdeki 7 gün içindeki görevleriniz</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredGorevler
              .filter((gorev) => {
                const today = new Date()
                const nextWeek = new Date()
                nextWeek.setDate(today.getDate() + 7)

                const gorevBitis = new Date(gorev.bitisTarihi)
                return gorevBitis >= today && gorevBitis <= nextWeek && gorev.durum !== "tamamlandi"
              })
              .sort((a, b) => new Date(a.bitisTarihi).getTime() - new Date(b.bitisTarihi).getTime())
              .map((gorev) => {
                const proje = projeler.find((p) => p.id === gorev.projeId)

                return (
                  <div key={gorev.id} className="flex items-start gap-3 p-3 border rounded-md">
                    <CalendarDays className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium">{gorev.baslik}</div>
                      <div className="text-sm text-muted-foreground">{proje?.baslik}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant={
                            gorev.oncelik === "dusuk"
                              ? "outline"
                              : gorev.oncelik === "orta"
                                ? "secondary"
                                : gorev.oncelik === "yuksek"
                                  ? "default"
                                  : "destructive"
                          }
                        >
                          {gorev.oncelik === "dusuk"
                            ? "Düşük"
                            : gorev.oncelik === "orta"
                              ? "Orta"
                              : gorev.oncelik === "yuksek"
                                ? "Yüksek"
                                : "Acil"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">Bitiş: {formatDate(gorev.bitisTarihi)}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            {filteredGorevler.filter((gorev) => {
              const today = new Date()
              const nextWeek = new Date()
              nextWeek.setDate(today.getDate() + 7)

              const gorevBitis = new Date(gorev.bitisTarihi)
              return gorevBitis >= today && gorevBitis <= nextWeek && gorev.durum !== "tamamlandi"
            }).length === 0 && (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <CalendarDays className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Önümüzdeki 7 gün içinde görev bulunmamaktadır.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

