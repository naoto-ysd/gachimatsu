"use client"

import { Check } from "lucide-react"
import Image from "next/image"
import { createContext, useState } from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const categories = [
  { id: "all", name: "すべて" },
  { id: "gyumeshi", name: "牛めし" },
  { id: "curry", name: "カレー" },
  { id: "teishoku", name: "定食" },
  { id: "don", name: "丼" },
  { id: "breakfast", name: "朝食" },
]

const menuItems = [
  { id: 1, name: "牛めし（並）", price: 380, category: "gyumeshi", completed: true },
  { id: 2, name: "牛めし（大盛）", price: 480, category: "gyumeshi", completed: false },
  { id: 3, name: "牛カルビ焼肉定食", price: 690, category: "teishoku", completed: false },
  { id: 4, name: "オリジナルカレー", price: 490, category: "curry", completed: true },
  { id: 5, name: "豚めし（並）", price: 350, category: "don", completed: false },
  { id: 6, name: "ビーフカレー", price: 590, category: "curry", completed: false },
  { id: 7, name: "牛焼肉定食", price: 590, category: "teishoku", completed: true },
  { id: 8, name: "朝定食", price: 390, category: "breakfast", completed: false },
  { id: 9, name: "チキン南蛮定食", price: 690, category: "teishoku", completed: false },
  { id: 10, name: "牛めし（特盛）", price: 580, category: "gyumeshi", completed: false },
  { id: 11, name: "ハンバーグ定食", price: 590, category: "teishoku", completed: false },
  { id: 12, name: "カツカレー", price: 690, category: "curry", completed: false },
]

export default function MenuList() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredItems =
    activeCategory === "all" ? menuItems : menuItems.filter((item) => item.category === activeCategory)

  const handleMenuClick = (menuId: number) => {
    console.log(`Menu ${menuId} clicked - would navigate to detail page`)
  }

  const handleProfileClick = () => {
    console.log("Profile clicked - would navigate to history page")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">ガチ松</h1>
          <Button variant="ghost" size="icon" onClick={handleProfileClick} className="rounded-full hover:bg-orange-50">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-orange-100 text-orange-600 text-sm font-medium">U</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-10">
        <div className="max-w-md mx-auto px-4 py-3">
          <ScrollArea className="w-full">
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <TabsList className="inline-flex h-10 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground w-max">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-sm mr-1"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </ScrollArea>
        </div>
      </div>

      {/* Menu Grid */}
      <main className="max-w-md mx-auto px-4 py-6">
        <div className="grid grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] relative overflow-hidden border-2 ${
                item.completed ? "border-green-200 bg-green-50/30" : "border-gray-200 hover:border-orange-200"
              }`}
              onClick={() => handleMenuClick(item.id)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=120&width=200"
                    alt={item.name}
                    width={200}
                    height={120}
                    className="w-full h-24 object-cover"
                  />
                  {item.completed && (
                    <>
                      <div className="absolute inset-0 bg-green-500/10" />
                      <Badge
                        variant="secondary"
                        className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 shadow-sm"
                      >
                        <Check className="h-3 w-3 mr-1" />
                        完了
                      </Badge>
                    </>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm text-gray-900 mb-2 line-clamp-2 leading-tight">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-orange-600 font-bold text-lg">¥{item.price.toLocaleString()}</p>
                    {item.completed && (
                      <Badge variant="outline" className="text-xs text-green-600 border-green-300">
                        記録済み
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">このカテゴリにはメニューがありません</p>
          </div>
        )}
      </main>
    </div>
  )
}
