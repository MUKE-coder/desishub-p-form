import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSingleData } from '@/Actions/trackingFormActions';
import PrintBtn from '@/components/printBtn';


export default async function Page({params:id}:{params:{id:FormData | any}}) {
  const data = await getSingleData( id );
  
  

  if (!data) {
    return <div>No data available</div>;
  }

  return (

   <div className='py-3 '>
     <Card className="w-full max-w-4xl mx-auto bg-[#f3f6fe]">
      <CardHeader>
        <CardTitle className='font-size text-center lg:mb-16 md:mb-12 mb-8 '>Full Performance Report</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-10">
          {/* <p><strong>Date:</strong> {new Date(data.day).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p> */}
          <div className='flex gap-8 flex-column'>
          <div className='flex flex-col gap-3'>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Role:</strong> {data.role}</p>
            <p><strong>Attendance:</strong> {data.attendance === true ? 'Attended' :'Missed'}</p>
          </div>
          <div className='flex flex-col gap-3'>
            <p><strong>Time In:</strong> {data.timeIn}</p>
            <p><strong>Time Out:</strong> {data.timeOut}</p>
          </div>
          </div>

          <div>
            <h3 className="font-semibold mb-8">Performance Metrics (KPI Scores):</h3>
            <table className="w-full bg-transparent">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700">KPI Name</th>
                  <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-700">Score</th>
                </tr>
              </thead>
              <tbody className="bg-gray-50 divide-y divide-gray-200" >
                {Object.entries(data.kpiScores as Record<string, string>).map(([name, score], index) => (
                  <tr key={index} className={index % 2 === 0 ? 'hover:bg-gray-100 transition-colors duration-200' : ''}>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{name}</td>
                    <td className="py-4 px-6 text-sm text-gray-500">{score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>                
          {data.notes && (
            <div>
              <h3 className="font-semibold">Notes:</h3>
              <p>{data.notes}</p>
            </div>
          )}
        </div>
        <div>
          <PrintBtn/>
        </div>
      </CardContent>
    </Card>
   </div>

  );
}