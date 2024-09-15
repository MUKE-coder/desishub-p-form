'use client'

import React, { useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"
import { useReactToPrint } from 'react-to-print'


export default function PrintBtn() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className='py-3'>
     <Button onClick={handlePrint} className="w-full" aria-label="Print report">
            <Printer className=" h-4 w-4" />
            Print
          </Button>
    </div>
  )
}