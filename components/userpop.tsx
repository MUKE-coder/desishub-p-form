"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import TextInput from "./formInputs/textInput";
import SubmitButton from "./formInputs/submitButton";
import { MemberProps } from "@/types/nav";
import { createMember } from "@/Actions/memberActions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function UserForm() {
  const [loading,setLoading]= useState(false)
  const {register,reset,handleSubmit,formState:{errors}}= useForm<MemberProps>()
  const [createErr, setCreateErr] = useState("")
  const router = useRouter()

async function submitMember(data:MemberProps){
  data.slug = data.name.trim().split(" ").join("-").toLowerCase()
try {
  setLoading(true)
const res = await createMember(data)
if (res && res.status === 409){
  setCreateErr("the member already exists") 
  } else if (res && res.status== 201){
    toast.success("Member saved successfully.")
    router.push("/")
    router.refresh()
    reset()
  }
} catch (error) {
  console.log(error)
  toast.error("something went wrong. try again.")
}finally{
  setLoading(false)
}
}
  return (
    <Card className="mx-auto max-w-sm mt-28">
      <CardHeader>
        <CardTitle className="text-2xl">Add New Member</CardTitle>
        <CardDescription>
          Enter the name of the new member below;
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submitMember)} className="grid gap-4">
          <div className="grid gap-2">
            <TextInput
              register={register}
              errors={errors}
              label="Name of a Member"
              name="name"
            />
          {createErr && (
              <span className="text-xs my-2 text-red-600">{createErr}</span>
            )}
          </div>
          <div>
            <SubmitButton
            className="w-full"
            title="Save Member"
             loadingTitle="Saving member...."
              loading={loading}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
