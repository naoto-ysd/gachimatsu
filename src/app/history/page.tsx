"use client"

import { ArrowLeft, TrendingUp, DollarSign, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// サンプルデータ
const historyData = [
  {
    id: 1,
    menuName: "牛めし（並）",
    date: "2025年7月13日",
    price: 380,
    image: "/placeholder.svg?height=80&width=80",
    memo: "いつも通り美味しかった。紅生姜を多めに追加。",
  },
  {
    id: 2,
    menuName: "プレミアム牛めし",
    date: "2025年7月11日",
    price: 490,
    image: "/placeholder.svg?height=80&width=80",
    memo: "お肉が柔らかくて最高でした！",
  },
  {
    id: 3,
    menuName: "豚バラ焼肉定食",
    date: "2025年7月9日",
    price: 690,
    image: "/placeholder.svg?height=80&width=80",
    memo: "ボリューム満点で満足",
  },
  {
    id: 4,
    menuName: "納豆定食",
    date: "2025年7月7日",
    price: 290,
    image: "/placeholder.svg?height=80&width=80",
    memo: "朝食にぴったり",
  },
  {
    id: 5,
    menuName: "ビーフカレー",
    date: "2025年7月5日",
    price: 590,
    image: "/placeholder.svg?height=80&width=80",
    memo: "スパイシーで美味しい",
  },
  {
    id: 6,
    menuName: "牛めし（大）",
    date: "2025年7月3日",
    price: 480,
    image: "/placeholder.svg?height=80&width=80",
    memo: "お腹いっぱいになりました",
  },
]

const stats = {
  totalVisits: 15,
  totalAmount: 7500,
  completedItems: 25,
  totalItems: 80,
}

export default function FoodHistory() {
  const handleBack = () => {
    console.log("戻るボタンがクリックされました")
    // ここで前の画面への遷移を実装
  }

  const handleRecordClick = (recordId: number) => {
    console.log(`Record ${recordId} clicked`)
    // ここで記録詳細画面への遷移を実装
  }

  const completionRate = Math.round((stats.completedItems / stats.totalItems) * 100)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center px-4 py-3">
          <Button variant="ghost" size="icon" onClick={handleBack} className="mr-3">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">食事の履歴</h1>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* サマリーセクション */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">あなたの松屋ライフ</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-white rounded-full p-3 mx-auto w-12 h-12 flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-yellow-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalVisits}</p>
                <p className="text-xs text-gray-600">総来店回数</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full p-3 mx-auto w-12 h-12 flex items-center justify-center mb-2">
                  <DollarSign className="h-5 w-5 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">¥{stats.totalAmount.toLocaleString()}</p>
                <p className="text-xs text-gray-600">総利用金額</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full p-3 mx-auto w-12 h-12 flex items-center justify-center mb-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{completionRate}%</p>
                <p className="text-xs text-gray-600">制覇率</p>
                <p className="text-xs text-gray-500 mt-1">
                  {stats.completedItems}/{stats.totalItems}品
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 記録リスト */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">最近の記録</h3>
          {historyData.map((record) => (
            <Card
              key={record.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleRecordClick(record.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  {/* 写真サムネイル */}
                  <div className="flex-shrink-0">
                    <img
                      src={record.image || "/placeholder.svg"}
                      alt={record.menuName}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  </div>

                  {/* メニュー情報 */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-semibold text-gray-900 truncate">{record.menuName}</h4>
                    <p className="text-sm text-gray-600 mt-1">{record.date}</p>
                    <p className="text-sm font-medium text-orange-600 mt-1">¥{record.price.toLocaleString()}</p>
                  </div>

                  {/* 矢印アイコン */}
                  <div className="flex-shrink-0">
                    <ArrowLeft className="h-4 w-4 text-gray-400 rotate-180" />
                  </div>
                </div>

                {/* メモのプレビュー */}
                {record.memo && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-600 line-clamp-2">{record.memo}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 空の状態メッセージ（記録がない場合） */}
        {historyData.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">まだ記録がありません</h3>
            <p className="text-gray-600">最初の松屋体験を記録してみましょう！</p>
          </div>
        )}
      </div>
    </div>
  )
}
