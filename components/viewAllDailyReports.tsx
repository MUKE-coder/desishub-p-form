'use client'


import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { fetchFormData } from '@/Actions/trackingFormActions'

type KPI = {
  name: string
  score: string
}

type Report = {
  id: string
  role: string
  day: string | null
  user: string
  attendance: boolean | null
  timeIn: string
  timeOut: string
  notes: string | null
  kpiScores: KPI[]
}

export default function DailyReport() {
  const [reports, setReports] = useState<Report[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const params = useParams()
  const router = useRouter()
  const day = params.day as string

  useEffect(() => {
    async function fetchReports() {
      try {
        setIsLoading(true)
        const result = await fetchFormData()
        const filteredReports = result.reports.filter(report => 
          report.day?.toLowerCase() === day.toLowerCase()
        )
        setReports(filteredReports)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchReports()
  }, [day])

  if (isLoading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-[#0234bd]">{day.charAt(0).toUpperCase() + day.slice(1)} Reports</h1>
      <Button 
        variant="outline" 
        className="mb-4 bg-[#0234bd] text-white hover:bg-[#0234bd]/90"
        onClick={() => router.push('/')}
      >
        Back to Weekly Report
      </Button>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {reports.map((report) => (
          <div key={report.id} className="bg-white shadow rounded-lg p-4 mb-4">
            <h3 className="text-xl font-semibold mb-2">{report.user}</h3>
            <div className='flex flex-col sm:flex-row gap-4 sm:gap-8'>
              <div className='flex flex-col gap-3'>
                <p><strong>Role:</strong> {report.role}</p>
                <p><strong>Attendance:</strong> {report.attendance ? 'Present' : 'Absent'}</p>
              </div>
              <div className='flex flex-col gap-3'>
                <p><strong>Time In:</strong> {report.timeIn}</p>
                <p><strong>Time Out:</strong> {report.timeOut}</p>
              </div>
            </div>
            <h4 className="text-lg font-semibold mt-4 mb-2">KPI Scores</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-[#eaeefa]">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">KPI Name</th>
                    <th className="px-4 py-2 text-center">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {report.kpiScores.map((kpi, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="border px-4 py-2 font-medium">{kpi.name}</td>
                      <td className="border px-4 py-2 text-center">{kpi.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='mt-8'>
              <p><strong>Notes:</strong> {report.notes || 'No notes provided'}</p>
            </div>
          </div>
        ))}
      </div>
      {reports.length === 0 && (
        <p>No reports for this day.</p>
      )}
    </div>
  )
}