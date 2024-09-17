"use client";

import { deleteData } from '@/Actions/trackingFormActions'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

interface DeleteFnProps {
  id: string;
  onConfirm: () => void;
}

export default function DeleteFn({ id, onConfirm }: DeleteFnProps) {
  const router = useRouter()

  async function handleDelete() {
   
    try {
      const dataDeleted = await deleteData({ id }) 
      toast.success("Report deleted successfully")
      router.push("/reports")
      router.refresh()
      onConfirm() 
        } catch (error) {
      toast.error("Something went wrong. Please try again?") 
      console.log(error)  
    }
  }

  return (
    <button
      type="button"
      className="rounded bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
      onClick={handleDelete}
    >
      Yes, delete
    </button>
  )
}