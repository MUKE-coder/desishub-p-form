"use server"
import { db } from "@/lib/db";
import { MemberProps } from "@/types/nav";
import { error } from "console";

export async function createMember(data: MemberProps) {
  try {
    const { name, slug } = data;
    const existingMember = await db.user.findUnique({
      where: {
        slug: slug,
      },
    });

    if(existingMember){
        return{
            data:null,
            error:`the member with this ${slug} already exists.`,
            status:409
        }
    }
 
   const createdMember = await db.user.create({
    data:{
        name,
        slug
    }
   }) 
   console.log(createdMember)
return{
    data:createdMember,
    error:null,
    status:201
}

  } catch (error) {
    console.log(error)
  }
}
 

export async function getMembers(){
  try {
    const fetchedMembers = await db.user.findMany()
    // console.log(fetchedMembers)
    return fetchedMembers
  } catch (error) {
    console.log(error)
  }
}