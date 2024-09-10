"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import TextInput from './formInputs/textInput'
import SubmitButton from './formInputs/submitButton'
import { useForm } from 'react-hook-form'
import { MemberProps } from '@/types/nav'
import { createRole } from '@/Actions/roleActions'
import toast from 'react-hot-toast'

export default function AddRole() {
const {register,reset,handleSubmit,formState:{errors}} = useForm<MemberProps>()
const [loading,setLoading] = useState(false)
const [roleErr,setRoleErr]  = useState("")

async function submitRole(data:MemberProps){
  data.slug = data.name.trim().split(" ").join("-").toLowerCase()
try {
 setLoading(true)
 const res = await createRole(data)
 if (res && res.status === 409){
    toast.error("Role already exists")
   setRoleErr("Role entered already exists")
   reset()
 } else if(res && res.status === 201){
    toast.success("Role saved successfully.")
    reset()
 }  
} catch (error) {
    toast.error("something went wrong")
   console.log(error) 
}finally{
    setLoading(false)
}
}

  return (
<Card className="mx-auto max-w-sm mt-28">
      <CardHeader>
        <CardTitle className="text-2xl">Add New Role</CardTitle>
        <CardDescription>
          Enter the role of a member below;
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submitRole)} className="grid gap-4">
          <div className="grid gap-2">
            <TextInput
              register={register}
              errors={errors}
              label="Role of a Member"
              name="name"
            />
          {roleErr && (
              <span className="text-xs my-2 text-red-600">{roleErr}</span>
            )}
          </div>
          <div>
            <SubmitButton
              className="w-full"
              title="Save Role"
              loadingTitle="Saving role...."
              loading={loading}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
