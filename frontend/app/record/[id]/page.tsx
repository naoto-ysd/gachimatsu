"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
import { ArrowLeft, MoreVertical, Edit, Trash2, Calendar, FileText, Camera } from "lucide-react"
import Image from "next/image"

// サンプルの記録データ（実際のアプリではAPIから取得）
const recordData = {
  id: 1,
  menuName: "牛めし（並）",
  price: 380,
  date: "2025年1月15日",
  memo: "いつも通り美味しかった。紅生姜を多めに追加。久しぶりの松屋だったけど、やっぱり安定の味で満足。次回は大盛りにしてみようかな。",
  image: "/placeholder.svg?height=400&width=400",
  hasImage: true,
  createdAt: "2025年1月15日 12:30",
}

export default function RecordDetail() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleBack = () => {
    console.log("Back button clicked - would navigate to history page")
  }

  const handleEdit = () => {
    console.log("Edit clicked - would navigate to edit form")
  }

  const handleDelete = async () => {
    setIsDeleting(true)

    // 削除処理をシミュレート
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Record deleted - would navigate back to history")
    setIsDeleting(false)
    setShowDeleteDialog(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={handleBack} className="hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <MoreVertical className="h-5 w-5" />
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

      {/* Main Content */}
      <main className="max-w-md mx-auto">
        {/* Image Section */}
        <div className="relative">
          {recordData.hasImage ? (
            <div className="aspect-square w-full bg-gray-100">
              <Image
                src={recordData.image || "/placeholder.svg"}
                alt={recordData.menuName}
                width={400}
                height={400}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          ) : (
            <div className="aspect-square w-full bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">写真がありません</p>
              </div>
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="p-6 bg-white space-y-6">
          {/* Menu Info */}
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">{recordData.menuName}</h1>
              <Badge className="bg-orange-500 hover:bg-orange-600 text-white text-base px-3 py-1 ml-4">
                ¥{recordData.price.toLocaleString()}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Date Info */}
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">記録日時</span>
            </div>
            <p className="text-gray-900 ml-6">{recordData.date}</p>
            <p className="text-gray-500 text-sm ml-6">{recordData.createdAt}</p>
          </div>

          <Separator />

          {/* Memo Section */}
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <FileText className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">メモ</span>
            </div>
            {recordData.memo ? (
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-4">
                  <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">{recordData.memo}</p>
                </CardContent>
              </Card>
            ) : (
              <p className="text-gray-500 text-sm ml-6 italic">メモはありません</p>
            )}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="max-w-sm mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>記録を削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              この操作は取り消すことができません。記録「{recordData.menuName}」を完全に削除します。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {isDeleting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                  削除中...
                </div>
              ) : (
                "削除"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
