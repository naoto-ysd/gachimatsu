"use client"

import { useState } from "react"
import { User, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
  { id: 2, name: "牛めし（大）", price: 480, category: "gyumeshi", completed: false },
  { id: 3, name: "プレミアム牛めし", price: 490, category: "gyumeshi", completed: true },
  { id: 4, name: "ビーフカレー", price: 590, category: "curry", completed: false },
  { id: 5, name: "オリジナルカレー", price: 490, category: "curry", completed: false },
  { id: 6, name: "豚バラ焼肉定食", price: 690, category: "teishoku", completed: true },
  { id: 7, name: "チキン南蛮定食", price: 790, category: "teishoku", completed: false },
  { id: 8, name: "牛焼肉丼", price: 590, category: "don", completed: false },
  { id: 9, name: "ソーセージエッグ定食", price: 390, category: "breakfast", completed: false },
  { id: 10, name: "納豆定食", price: 290, category: "breakfast", completed: true },
  { id: 11, name: "牛めし（特）", price: 580, category: "gyumeshi", completed: false },
  { id: 12, name: "キムカル丼", price: 590, category: "don", completed: false },
]

export default function MenuList() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredItems =
    selectedCategory === "all" ? menuItems : menuItems.filter((item) => item.category === selectedCategory)

  const handleMenuClick = (menuId: number) => {
    console.log(`Menu ${menuId} clicked`)
    // ここで次の画面への遷移をシミュレート
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-gray-900">ガチ松</h1>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </header>

      {/* カテゴリタブ */}
      <div className="bg-white border-b">
        <div className="flex overflow-x-auto scrollbar-hide px-4 py-3 gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap ${
                selectedCategory === category.id
                  ? "bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500"
                  : "border-gray-200 text-gray-700 hover:bg-yellow-50"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* メニューグリッド */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="relative overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleMenuClick(item.id)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={`/placeholder.svg?height=120&width=200`}
                    alt={item.name}
                    className="w-full h-24 object-cover"
                  />
                  {item.completed && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <div className="bg-green-500 rounded-full p-1">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                  {item.completed && (
                    <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 text-white text-xs">
                      完了
                    </Badge>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm text-gray-900 mb-1 line-clamp-2">{item.name}</h3>
                  <p className="text-orange-600 font-bold text-sm">¥{item.price.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
