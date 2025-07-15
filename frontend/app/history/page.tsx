"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Calendar, Camera, TrendingUp, Utensils, JapaneseYenIcon as Yen } from "lucide-react"
import Image from "next/image"

// サンプルの履歴データ
const historyData = [
  {
    id: 1,
    menuName: "牛めし（並）",
    price: 380,
    date: "2025年1月15日",
    memo: "久しぶりの松屋！やっぱり安定の美味しさ",
    image: "/placeholder.svg?height=80&width=80",
    hasImage: true,
  },
  {
    id: 2,
    menuName: "牛カルビ焼肉定食",
    price: 690,
    date: "2025年1月12日",
    memo: "ボリューム満点で満足",
    image: null,
    hasImage: false,
  },
  {
    id: 3,
    menuName: "オリジナルカレー",
    price: 490,
    date: "2025年1月10日",
    memo: "スパイシーで美味しかった",
    image: "/placeholder.svg?height=80&width=80",
    hasImage: true,
  },
  {
    id: 4,
    menuName: "牛めし（大盛）",
    price: 480,
    date: "2025年1月8日",
    memo: "",
    image: "/placeholder.svg?height=80&width=80",
    hasImage: true,
  },
  {
    id: 5,
    menuName: "チキン南蛮定食",
    price: 690,
    date: "2025年1月5日",
    memo: "タルタルソースが絶品！",
    image: null,
    hasImage: false,
  },
  {
    id: 6,
    menuName: "豚めし（並）",
    price: 350,
    date: "2025年1月3日",
    memo: "新年最初の松屋",
    image: "/placeholder.svg?height=80&width=80",
    hasImage: true,
  },
  {
    id: 7,
    menuName: "ビーフカレー",
    price: 590,
    date: "2024年12月28日",
    memo: "年末の締めくくり",
    image: null,
    hasImage: false,
  },
  {
    id: 8,
    menuName: "牛焼肉定食",
    price: 590,
    date: "2024年12月25日",
    memo: "クリスマスも松屋で",
    image: "/placeholder.svg?height=80&width=80",
    hasImage: true,
  },
]

// 統計情報を計算
const totalVisits = historyData.length
const totalAmount = historyData.reduce((sum, item) => sum + item.price, 0)
const completedMenus = 25 // 実際のアプリでは動的に計算
const totalMenus = 80 // 松屋の全メニュー数（仮）

export default function HistoryPage() {
  const handleBack = () => {
    console.log("Back button clicked - would navigate to menu list")
  }

  const handleRecordClick = (recordId: number) => {
    console.log(`Record ${recordId} clicked - would navigate to detail view`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" size="icon" onClick={handleBack} className="mr-3 hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">食事の履歴</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Summary Section */}
        <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
          <CardContent className="p-4">
            <h2 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-orange-500" />
              あなたの松屋ライフ
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Utensils className="h-4 w-4 text-orange-500 mr-1" />
                </div>
                <p className="text-lg font-bold text-gray-900">{totalVisits}回</p>
                <p className="text-xs text-gray-600">総来店回数</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Yen className="h-4 w-4 text-green-500 mr-1" />
                </div>
                <p className="text-lg font-bold text-gray-900">¥{totalAmount.toLocaleString()}</p>
                <p className="text-xs text-gray-600">総利用金額</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Badge variant="outline" className="text-xs px-1 py-0 border-orange-300 text-orange-600">
                    {Math.round((completedMenus / totalMenus) * 100)}%
                  </Badge>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  {completedMenus}/{totalMenus}品
                </p>
                <p className="text-xs text-gray-600">制覇率</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Records List */}
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-gray-700 flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            記録一覧
          </h2>

          {historyData.length > 0 ? (
            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="space-y-3">
                {historyData.map((record, index) => (
                  <Card
                    key={record.id}
                    className="cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.01] border-gray-200"
                    onClick={() => handleRecordClick(record.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        {/* Image Thumbnail */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200">
                            {record.hasImage ? (
                              <Image
                                src={record.image || "/placeholder.svg?height=64&width=64"}
                                alt={record.menuName}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Camera className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Record Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="font-medium text-gray-900 text-sm truncate">{record.menuName}</h3>
                            <Badge variant="outline" className="text-xs text-orange-600 border-orange-300 ml-2">
                              ¥{record.price}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 mb-1">{record.date}</p>
                          {record.memo && (
                            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{record.memo}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <Card className="border-dashed border-gray-300">
              <CardContent className="p-8 text-center">
                <Utensils className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-sm mb-2">まだ記録がありません</p>
                <p className="text-gray-400 text-xs">メニューを選んで最初の記録を作成しましょう！</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
