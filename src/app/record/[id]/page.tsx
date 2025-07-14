"use client"

import { useState } from "react"
import { ArrowLeft, MoreVertical, Edit, Trash2, Calendar, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// サンプルデータ（実際の実装では props やAPIから取得）
const recordData = {
  id: 1,
  menuName: "牛めし（並）",
  price: 380,
  date: "2025年7月13日",
  memo: "いつも通り美味しかった。紅生姜を多めに追加。今日は仕事帰りに立ち寄りました。店員さんの接客も良くて気持ちよく食事できました。",
  image: "/placeholder.svg?height=300&width=400",
  createdAt: "14:30",
}

export default function RecordDetail() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleBack = () => {
    console.log("戻るボタンがクリックされました")
    // ここで前の画面への遷移を実装
  }

  const handleEdit = () => {
    console.log("編集ボタンがクリックされました")
    // ここで編集画面への遷移を実装
  }

  const handleDelete = () => {
    console.log("削除が実行されました")
    setShowDeleteDialog(false)
    // ここで実際の削除処理を実装
    alert("記録を削除しました")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b relative z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
                <Edit className="h-4 w-4 mr-2" />
                編集
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setShowDeleteDialog(true)}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                削除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="relative">
        {/* メイン写真 */}
        <div className="relative">
          <img
            src={recordData.image || "/placeholder.svg"}
            alt={recordData.menuName}
            className="w-full h-80 object-cover"
          />
          {/* 写真上のオーバーレイ情報 */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <h1 className="text-2xl font-bold text-white mb-1">{recordData.menuName}</h1>
            <p className="text-yellow-300 font-semibold text-lg">¥{recordData.price.toLocaleString()}</p>
          </div>
        </div>

        {/* 詳細情報 */}
        <div className="p-4 space-y-4">
          {/* 日付・時間カード */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-100 rounded-full p-2">
                  <Calendar className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{recordData.date}</p>
                  <p className="text-sm text-gray-600">{recordData.createdAt}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 価格カード */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 rounded-full p-2">
                  <DollarSign className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">¥{recordData.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">お支払い金額</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* メモカード */}
          {recordData.memo && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <div className="bg-yellow-100 rounded-full p-1 mr-2">
                    <Edit className="h-4 w-4 text-yellow-600" />
                  </div>
                  メモ
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{recordData.memo}</p>
              </CardContent>
            </Card>
          )}

          {/* アクションボタン */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleEdit}
              className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 bg-transparent"
            >
              <Edit className="h-4 w-4 mr-2" />
              編集
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(true)}
              className="border-red-300 text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              削除
            </Button>
          </div>
        </div>
      </div>

      {/* 削除確認ダイアログ */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>記録を削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              この操作は取り消すことができません。「{recordData.menuName}」の記録が完全に削除されます。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
