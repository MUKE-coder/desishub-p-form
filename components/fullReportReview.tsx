import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSingleData } from '@/Actions/trackingFormActions';


interface AttendancePerformanceDisplayProps {
  id: string; // Assuming the ID is a string, adjust if it's a different type
}

export default async function AttendancePerformanceDisplay({ id }: FormData | any) {
  const data = await getSingleData({ id });

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Attendance and Performance Report</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* <p><strong>Date:</strong> {new Date(data.day).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p> */}
          <div>
            <h3 className="font-semibold">User Information:</h3>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Role:</strong> {data.role}</p>
          </div>
          <div>
            <h3 className="font-semibold">Attendance:</h3>
            <p><strong>Attendance Status:</strong> {data.attendance}</p>
            <p><strong>Time In:</strong> {data.timeIn}</p>
            <p><strong>Time Out:</strong> {data.timeOut}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Performance Metrics (KPI Scores):</h3>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">KPI Name</th>
                  <th className="text-left">Score</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.kpiScores as Record<string, string>).map(([name, score], index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                    <td className="py-2">{name}</td>
                    <td className="py-2">{score}</td>
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
      </CardContent>
    </Card>
  );
}