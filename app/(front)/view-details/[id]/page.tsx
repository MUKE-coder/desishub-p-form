import React from 'react'
import { getSingleData } from '@/Actions/trackingFormActions';
import PrintDocument from '@/components/printDoc';



export default async function Page({params:id}:{params:{id:FormData | any}}) {
  const data = await getSingleData( id );
  
  

  if (!data) {
    return <div>No data available</div>;
  }

  return (
     <div>
      <PrintDocument data={data}/>
     </div>
  );
}