import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";

const WeeklyAttendanceTable = ({ data }: any) => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const getAttendanceForDay = (person: any, day: any) => {
    if (person.day.toLowerCase() === day.toLowerCase()) {
      return (
        <div className="relative">
          <span className="font-medium text-sm text-green-600">Attendend</span>
          <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="absolute top-[-65%] right-[52%]">
                  <Link href='#'>
                  <SquareArrowOutUpRight className="w-4 h-4" />
                  </Link>
                </TooltipTrigger>
                     <TooltipContent>
                         <p>View report Details</p>
                   </TooltipContent>
               </Tooltip>
          </TooltipProvider>
        </div>
      );
    }
    return (
      <div>
        <span className="text-red-400 text-sm">No Report</span>
      </div>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/5">Name</TableHead>
          {daysOfWeek.map((day) => (
            <TableHead key={day} className="w-1/5">
              {day}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((person: any) => (
          <TableRow key={person.id}>
            <>
              <TableCell className="w-1/5">{person.name}</TableCell>
              {daysOfWeek.map((day) => (
                <TableCell key={`${person.id}-${day}`} className="w-1/5">
                  {getAttendanceForDay(person, day)}
                </TableCell>
              ))}
            </>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default WeeklyAttendanceTable;
