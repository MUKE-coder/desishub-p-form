'use client'

import React, { useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useReactToPrint } from 'react-to-print';
import { ArrowBigLeft, Printer } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import BoldHeading from './BoldHeading';
 
interface User {
  id: string;
  name: string;
  slug: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

interface Role {
  id: string;
  name: string;
  slug: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

interface KPIScores {
  [key: string]: string;
}

interface PerformanceData {
  name: string;
  role: string;
  attendance: boolean | null;
  timeIn: string;
  timeOut: string;
  kpiScores: KPIScores | null;
  notes?: string;
  day?: string | number | Date;
  User: User | null;
  Role: Role | null;
}
interface DataProps {
  data:PerformanceData
}




export default function PrintDocument({data}:DataProps | any) {
  const router = useRouter()
  const invoiceRef = useRef<HTMLDivElement>(null);
 const handlePrint = useReactToPrint({
        content: () => invoiceRef.current,
      });

function backToReports(){
  router.back()
}

  // Calculate the total number of KpiScores and sum of scores
  const totalKpiScores = data.kpiScores ? Object.keys(data.kpiScores).length : 0;
  const sumOfScores = data.kpiScores
    ? Object.values(data.kpiScores).reduce((sum, score) => sum as number + parseFloat(score as string), 0)
    : 0;

const finalMark = (sumOfScores as number*100)/40

const finalMarkColor = finalMark >= 50 ? 'text-green-500' : 'text-red-500 '

  const borderColor = finalMark >= 50 ? 'border-green-500' : 'border-red-500'

 return(
<div className='py-3'>
<div className='py-3 w-full max-w-4xl mx-auto'>
<div ref={invoiceRef} className='py-3 w-full max-w-4xl mx-auto'>
 
<div className="flex flex-col lg:gap-8 md:gap-6 gap-4">
        <div className="text-center">
          <BoldHeading heading="Desishub Daily Performance Report" />
        </div>
        <h1 className="lg:text-3xl md:text-2xl text-[1.1rem] font-bold mb-2 text-center text-blue-600">
          Daily Performance Tracking
        </h1>
      </div>

  <Card  className="w-full relative lg:mt-12 md:mt-8 mt-4 max-w-4xl mx-auto bg-white shadow-lg">
     <div className={`absolute absolute-set lg:h-36 md:h-36 h-16 lg:w-36 md:w-36 w-16 rounded-full flex justify-center items-center px-4 border-solid border-[1px] ${borderColor}`}>
     <p className={`lg:text-[3.6rem] md:text-[2.5rem] text-[1.5rem] ${finalMarkColor}`}>

        {finalMark.toFixed(0)}%
       </p>
  </div>
   <CardHeader>
     <CardTitle className='font-size text-center lg:mb-8 md:mb-8 mb-8 '>Full Performance Report</CardTitle>
   </CardHeader>
   <CardContent>
     <div className="space-y-10">
       <div className='flex gap-8 flex-column'>
       <div className='flex flex-col gap-2'>
         <p><strong>Name:</strong> {data.name}</p>
         <p><strong>Role:</strong> {data.role}</p>
         <p><strong>Attendance:</strong> {data.attendance === true ? 'Attended' :'Missed'}</p>
       </div>
       <div className='flex flex-col gap-2'>
         <p><strong>Time In:</strong> {data.timeIn}</p>
         <p><strong>Time Out:</strong> {data.timeOut}</p>
       </div>
       </div>

       <div>
       {data.kpiScores && Object.keys(data.kpiScores).length > 0 ? (
         <div>
           <h3 className="font-semibold mb-8">Performance Metrics (KPI Scores):</h3>
           <table className="w-full bg-transparent">
             <thead className="bg-gray-100">
               <tr>
                 <th className="py-3 lg:px-6 md:px-6 px-4 text-left text-xs font-medium uppercase tracking-wider text-gray-700">KPI Name</th>
                 <th className="py-3 lg:px-6 md:px-6 px-4 text-left text-xs font-medium uppercase tracking-wider text-gray-700">Score</th>
               </tr>
             </thead>
             <tbody className="bg-gray-50 divide-y divide-gray-200">
               {Object.entries(data.kpiScores as Record<string, string>).map(([name, score], index) => (
                 <tr key={index} className={index % 2 === 0 ? 'hover:bg-gray-100 transition-colors duration-200' : ''}>
                   <td className="py-4 lg:px-6 md:px-6 px-4 text-sm font-medium text-gray-900">{name}</td>
                   <td className="py-4 lg:px-6 md:px-6 px-4 text-sm text-gray-500">{score}</td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       ) : (
         <p>No KPI scores available</p>
       )}
       </div>                
       {data.notes && (
         <div>
           <h3 className="font-semibold">Notes:</h3>
           <p>{data.notes}</p>
         </div>
       )}
     </div>
     </CardContent>
 </Card>
 
</div>
<div className='flex justify-between items-center lg:gap-8 md:gap-4 gap-4 lg:mt-8 md:mt-4 mt-4'>
       <Button onClick={backToReports} className="w-full" aria-label="back">
       <ArrowBigLeft className="h-4 w-4"/>
            back to reports
          </Button>
       <Button onClick={handlePrint} className="w-full" aria-label="Print report">
            <Printer className=" h-4 w-4" />
            Print
          </Button>
    </div>
</div>
</div>
 )

}