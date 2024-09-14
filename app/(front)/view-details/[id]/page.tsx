import AttendancePerformanceDisplay from '@/components/fullReportReview'
import React from 'react'

interface AttendancePerformanceDisplayProps {
  id: string | any; // Assuming the ID is a string, adjust if it's a different type
}

export default function page({params:id}:{params:{id:FormData | any}}) {
  return (
    <div>
      <AttendancePerformanceDisplay id={id}/>
    </div>
  )
}
