"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Camera, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function RecordForm() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [date, setDate] = useState(() => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  })
  const [memo, setMemo] = useState("")

  // 前の画面から渡されたメニュー情報（実際の実装では props やルーターから取得）
  const selectedMenu = {
    name: "牛めし（並）",
    price: 380,
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
  }

  const handleSave = () => {
    console.log("記録を保存:", {
      menu: selectedMenu,
      image: selectedImage,
      date,
      memo,
    })
    // ここで実際の保存処理を実装
    alert("記録を保存しました！")
  }

  const handleBack = () => {
    console.log("戻るボタンがクリックされました")
    // ここで前の画面への遷移を実装
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center px-4 py-3">
          <Button variant="ghost" size="icon" onClick={handleBack} className="mr-3">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">食事を記録</h1>
        </div>
      </header>

      <div className="p-4 space-y-6 pb-24">
        {/* 選択メニュー表示 */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedMenu.name}</h2>
              <p className="text-orange-600 font-semibold">¥{selectedMenu.price.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        {/* 写真アップロードエリア */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">写真</Label>
          {!selectedImage ? (
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                id="image-upload"
              />
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-yellow-400 hover:bg-yellow-50 transition-colors">
                <div className="flex flex-col items-center space-y-2">
                  <div className="bg-gray-100 rounded-full p-3">
                    <Camera className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">写真をアップロード</p>
                    <p className="text-xs text-gray-500 mt-1">タップして写真を選択</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative">
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="アップロードされた写真"
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={removeImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* 日付入力 */}
        <div className="space-y-2">
          <Label htmlFor="date" className="text-sm font-medium text-gray-700">
            日付
          </Label>
          <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full" />
        </div>

        {/* メモ入力 */}
        <div className="space-y-2">
          <Label htmlFor="memo" className="text-sm font-medium text-gray-700">
            メモ
          </Label>
          <Textarea
            id="memo"
            placeholder="味の感想は？何か特別なことをしましたか？"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            rows={4}
            className="w-full resize-none"
          />
        </div>
      </div>

      {/* 固定された保存ボタン */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <Button
          onClick={handleSave}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 text-base"
        >
          記録を保存
        </Button>
      </div>
    </div>
  )
}
