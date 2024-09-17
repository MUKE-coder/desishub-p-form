// "use client";

// import { Search, ListFilter, File } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Tabs, TabsContent } from "@/components/ui/tabs";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableHead,
//   TableRow,
//   TableCell,
// } from "@/components/ui/table";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuCheckboxItem,
// } from "@/components/ui/dropdown-menu";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import { useEffect, useState } from "react";
// import { FormData } from "@prisma/client";
// import WeeklyAttendanceTable from "./WeeklyAttendanceTable ";

// export function ActivityReport({ data }: { data: FormData[] | null }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;
//   const totalItems = data?.length || 0;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   const [currentDate, setCurrentDate] = useState(new Date());

//   useEffect(() => {
//     const updateDate = () => {
//       const now = new Date();
//       setCurrentDate(now);
//     };

//     updateDate(); // Set initial date

//     const timer = setInterval(updateDate, 86400000); // Update once per day (24 hours in milliseconds)

//     return () => {
//       clearInterval(timer);
//     };
//   }, []);



//   const formatDate = (date: Date) => {
//     return date.toLocaleDateString('en-US', {
//       day: 'numeric',
//       month: 'long',
//       year: 'numeric'
//     });
//   };
   



 











//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   const getCurrentPageData = () => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return data?.slice(startIndex, endIndex) || [];
//   };

//   return (
//     <div className="flex min-h-screen w-full flex-col bg-muted/40">
//       <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
//         <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
//           <div className="relative ml-auto flex-1 md:grow-0">
//             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//             <Input
//               type="search"
//               placeholder="Search..."
//               className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
//             />
//           </div>
//         </header>

//         <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
//           <Tabs defaultValue="all">
//             <div className="flex items-center">
//               <div className="ml-auto flex items-center gap-2">
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="outline" size="sm" className="h-7 gap-1">
//                       <ListFilter className="h-3.5 w-3.5" />
//                       <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
//                         Filter
//                       </span>
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end">
//                     <DropdownMenuLabel>Filter by</DropdownMenuLabel>
//                     <DropdownMenuSeparator />
//                     <DropdownMenuCheckboxItem checked>
//                       Active
//                     </DropdownMenuCheckboxItem>
//                     <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
//                     <DropdownMenuCheckboxItem>
//                       Archived
//                     </DropdownMenuCheckboxItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//                 <Button size="sm" variant="outline" className="h-7 gap-1">
//                   <File className="h-3.5 w-3.5" />
//                   <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
//                     Export
//                   </span>
//                 </Button>
//               </div>
//             </div>
//             <TabsContent value="all">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="mb-4 flex justify-between">Daily Performance Tracking
//                   <span className="text-sm text-muted-foreground">
//                     Current Date:<span className="text-[1.5rem]"> {currentDate.toLocaleDateString('en-GB')}</span>
//                   </span>
//                   </CardTitle>
                  
//                   <CardDescription >
//                     Consistency is the secret to success{","} and daily
//                     performance tracking is the compass that keeps you on
//                     course.
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <WeeklyAttendanceTable data={getCurrentPageData()} />
//                 </CardContent>
//                 <CardFooter className="flex items-center justify-between">
//                   <div className="text-xs text-muted-foreground">
//                     Showing{" "}
//                     <strong>
//                       {Math.min(
//                         (currentPage - 1) * itemsPerPage + 1,
//                         totalItems
//                       )}
//                       -{Math.min(currentPage * itemsPerPage, totalItems)}
//                     </strong>{" "}
//                     of <strong>{totalItems}</strong> products
//                   </div>
//                   <Pagination>
//                     <PaginationContent>
//                       <PaginationItem>
//                         {!currentPage === (1 as any) && (
//                           <PaginationPrevious
//                             href="#"
//                             onClick={() =>
//                               handlePageChange(Math.max(1, currentPage - 1))
//                             }
//                           />
//                         )}
//                       </PaginationItem>
//                       {[...Array(totalPages)].map((_, index) => (
//                         <PaginationItem key={index}>
//                           <PaginationLink
//                             href="#"
//                             onClick={() => handlePageChange(index + 1)}
//                             isActive={currentPage === index + 1}
//                           >
//                             {index + 1}
//                           </PaginationLink>
//                         </PaginationItem>
//                       ))}
//                       <PaginationItem>
//                         <PaginationNext
//                           href="#"
//                           onClick={() =>
//                             handlePageChange(
//                               Math.min(totalPages, currentPage + 1)
//                             )
//                           }
//                         />
//                       </PaginationItem>
//                     </PaginationContent>
//                   </Pagination>
//                 </CardFooter>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </main>
//       </div>
//     </div>
//   );
// }
