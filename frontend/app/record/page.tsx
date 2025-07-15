"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Camera, Plus, X } from "lucide-react"
import Image from "next/image"

// 前の画面から渡されるメニュー情報（実際のアプリではpropsやstateで管理）
const selectedMenu = {
  id: 1,
  name: "牛めし（並）",
  price: 380,
}

export default function RecordForm() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [date, setDate] = useState(() => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  })
  const [memo, setMemo] = useState("")
  const [isLoading, setIsLoading] = useState(false)

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

  const handleRemoveImage = () => {
    setSelectedImage(null)
  }

  const handleBack = () => {
    console.log("Back button clicked - would navigate to menu list")
  }

  const handleSave = async () => {
    setIsLoading(true)

    // 保存処理をシミュレート
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Record saved:", {
      menu: selectedMenu,
      date,
      memo,
      image: selectedImage ? "Image uploaded" : "No image",
    })

    setIsLoading(false)
    // 実際のアプリでは成功画面や一覧画面に遷移
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" size="icon" onClick={handleBack} className="mr-3 hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">食事を記録</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-md mx-auto w-full px-4 py-6 space-y-6">
        {/* Selected Menu Display */}
        <Card className="border-orange-200 bg-orange-50/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">{selectedMenu.name}</h2>
                <p className="text-orange-600 font-bold text-xl">¥{selectedMenu.price.toLocaleString()}</p>
              </div>
              <Badge className="bg-orange-500 hover:bg-orange-600 text-white">選択中</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Photo Upload Area */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">写真（任意）</Label>
          <Card className="border-2 border-dashed border-gray-300 hover:border-orange-300 transition-colors">
            <CardContent className="p-0">
              {selectedImage ? (
                <div className="relative">
                  <Image
                    src={selectedImage || "/placeholder.svg"}
                    alt="Uploaded food"
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-32 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-2">
                    <Camera className="h-6 w-6 text-gray-500" />
                    <Plus className="h-3 w-3 text-gray-500 -ml-1 -mt-1" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">写真をアップロード</p>
                  <p className="text-xs text-gray-400 mt-1">タップして写真を選択</p>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Date Field */}
          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-medium text-gray-700">
              日付
            </Label>
            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full" />
          </div>

          {/* Memo Field */}
          <div className="space-y-2">
            <Label htmlFor="memo" className="text-sm font-medium text-gray-700">
              メモ
            </Label>
            <Textarea
              id="memo"
              placeholder="味の感想は？何か特別なことをしましたか？"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className="min-h-[100px] resize-none"
              rows={4}
            />
          </div>
        </div>
      </main>

      {/* Fixed Save Button */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto">
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 text-base"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                保存中...
              </div>
            ) : (
              "記録を保存"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
