'use client'

import { fetchFormData } from '@/Actions/trackingFormActions'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

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

export default function WeeklyActivityReport() {
  const [reports, setReports] = useState<Report[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  useEffect(() => {
    async function fetchReports() {
      try {
        setIsLoading(true)
        const result = await fetchFormData()
        setReports(result.reports)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchReports()
  }, [])

  if (isLoading) return <div className="p-4">Loading...</div>
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>

  return (
    <div className="p-4 flex flex-col gap-8">
      {days.map((day) => {
        const dayReports = reports.filter(report => report.day === day)
        const lastThreeReports = dayReports.slice(-2)

        return (
          <div key={day} className="mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-[#0234bd]">{day}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-white shadow rounded-lg'>
              {lastThreeReports.map((report) => (
                <div key={report.id} className="p-4 mb-4">
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
            {dayReports.length > 3 && (
              <div className="mt-4">
                <Link href={`/daily-report/${day.toLowerCase()}`} passHref>
                  <Button variant="outline" className="bg-[#0234bd] text-white hover:bg-[#0234bd]/90">
                    View All {day}{"'"}s Reports ({dayReports.length})
                  </Button>
                </Link>
              </div>
            )}
            {dayReports.length === 0 && (
              <p>No reports for this day.</p>
            )}
          </div>
        )
      })}
    </div>
  )
}