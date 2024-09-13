"use client";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FormSelectInput from "./formInputs/selectInput";
import { getMembers } from "@/Actions/memberActions";
import { getRoles } from "@/Actions/roleActions";
import { createFormData } from "@/Actions/trackingFormActions";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

interface KPI {
  name: string;
  explanation: string;
  example: string;
}


interface FormData {
  name: string;
  role: string;
  day: string;
  kpiScores: { [key: string]: string };
  attendance: boolean;
  timeIn: string;
  timeOut: string;
  notes: string;
  userId: string;
  roleId: string
}

const kpis: KPI[] = [
  {
    name: "Task Completion Rate",
    explanation:
      "The percentage of assigned tasks completed within the given timeframe.",
    example: "Completed 4 out of 5 assigned tasks today. Score: 4",
  },
  {
    name: "Code Quality",
    explanation:
      "The cleanliness, readability, and efficiency of the code produced.",
    example:
      "Wrote well-documented, efficient code that passed all reviews. Score: 5",
  },
  {
    name: "Collaboration",
    explanation:
      "How well you work with team members, contribute to discussions, and support others.",
    example:
      "Actively participated in team meetings and helped a colleague debug an issue. Score: 4",
  },
  {
    name: "Learning and Growth",
    explanation:
      "Your efforts to acquire new skills, knowledge, or improve existing ones.",
    example:
      "Spent an hour learning a new framework relevant to our project. Score: 3",
  },
  {
    name: "Problem-Solving Skills",
    explanation:
      "Your ability to identify, analyze, and resolve issues effectively.",
    example:
      "Successfully debugged a complex issue that had been affecting the team for days. Score: 5",
  },
  {
    name: "Communication",
    explanation:
      "How clearly and effectively you communicate with team members and stakeholders.",
    example:
      "Clearly explained a technical concept to non-technical stakeholders. Score: 4",
  },
  {
    name: "Time Management",
    explanation:
      "How well you prioritize tasks and manage your time to meet deadlines.",
    example:
      "Efficiently managed time to complete all high-priority tasks before deadline. Score: 4",
  },
  {
    name: "Initiative",
    explanation:
      "Your proactiveness in taking on responsibilities or suggesting improvements.",
    example:
      "Proposed and implemented a new feature that improved the user experience. Score: 5",
  },
];



const PerformanceTrackingForm: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    role: "",
    day:"",
    kpiScores: {},
    attendance: false,
    timeIn: "",
    timeOut: "",
    notes: "",
    userId:"",
    roleId:""
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleKPIChange = (kpi: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      kpiScores: { ...prevState.kpiScores, [kpi]: value },
    }));
  };
  const [loading,setLoading] = useState(false)
  const [formErr,setFormErr] = useState("")
  const  handleSubmit = async () => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const dayName = daysOfWeek[today.getDay()];
    
  
    formData.name = selectedMember.label
    formData.role = selectedRole.label
    formData.userId =selectedMember.value
    formData.roleId = selectedRole.value
    formData.day =dayName
   
    try {
      setLoading(true)
     const res = await createFormData(formData)
      if(res && res.status===409){
        toast.error("Report with this name was already created today. Check your records!")
        setFormErr("Report with this name was already created today. Check your records!")
        setSelectedMember("");
      } else if(res && res.status===201){
        toast.success("Report created successfully!"); 
        setFormData({
          name: "",
          role: "",
          day: "",
          kpiScores: {},
          attendance: false,
          timeIn: "",
          timeOut: "",
          notes: "",
          userId: "",
          roleId: ""
        });
        setSelectedMember("");
        setSelectedRole("");
      }
    } catch (error) {
      console.log(error)
      toast.error("failed to create the report. Please try again.");
      setFormData({
        name: "",
        role: "",
        day: "",
        kpiScores: {},
        attendance: false,
        timeIn: "",
        timeOut: "",
        notes: "",
        userId: "",
        roleId: ""
      });
      setSelectedMember("");
      setSelectedRole(""); 
    }finally{
      setLoading(false)
    }
  };
  
  
  const [selectedMember, setSelectedMember] = useState<any>("");
  const [members, setMembers] = useState<any>([]);
  useEffect(() => {
    async function fetchMembers() {
      const fetchedMembers = await getMembers();
      if (fetchedMembers) {
        setMembers(fetchedMembers);
        
      }
    }
    fetchMembers();
  }, []);

  const selectUser = members.map((member:any) => ({
    value: member.id,
    label: member.name, // Assuming the user object has a 'name' field
  }));

const [roles, setRoles] = useState<any>([])
const [selectedRole, setSelectedRole] = useState<any>("");
useEffect(()=>{
  async function fetchRoles(){
    const fetchedRoles = await getRoles()
    // console.log(fetchedRoles)
    if(Array.isArray(fetchedRoles) && fetchedRoles.length > 0){
      setRoles(fetchedRoles)
      // console.log(fetchedRoles)
    }
  }
fetchRoles()
}, [])

const selectRole = roles.map((role: any) => ({
  value: role.id, 
  label: role.name, 
}));



  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Daily_Performance_Tracking_Form",
  });

  return (
    <div className="container container-media lg:mx-auto md:mx-0 mx-0 lg:p-6 md:p-4 p-4 lg:max-w-6xl md:max-w-full max-w-full">
      <div
        id="performanceForm"
        ref={componentRef}
        className="bg-white shadow-lg rounded-lg lg:p-6 md:p-4 p-4"
      >
        <h1 className="lg:text-3xl md:text-2xl text-[1.1rem] font-bold mb-2 text-center text-blue-600">
          Daily Performance Tracking
        </h1>
        <h2 className="text-xl font-bold mb-6 text-center text-blue-500">
          {formattedDate}
        </h2>

        <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-6 mb-6">
          <div>
               <FormSelectInput
     label="name"
    
     options={selectUser}
     option={selectedMember}
     setOption={setSelectedMember}
     toolTipText="Add New member"
     href="/add-user"
   />
    {formErr && (
              <span className="text-xs my-2 text-red-600">{formErr}</span>
          )}
          </div>
          <div>
       <FormSelectInput
     label="role"
     options={selectRole}
     option={selectedRole}
     setOption={setSelectedRole}
     toolTipText="Add New Role"
     href="/add-role"
   />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Performance Metrics</h3>
          <p className="text-sm text-gray-600 mb-3">
            Rate each metric from 1 (needs improvement) to 5 (excellent).
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/5">Metric</TableHead>
                <TableHead className="w-1/3">Explanation</TableHead>
                <TableHead className="w-1/3">Example</TableHead>
                <TableHead className="w-1/10">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kpis.map((kpi, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{kpi.name}</TableCell>
                  <TableCell>{kpi.explanation}</TableCell>
                  <TableCell>{kpi.example}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      value={formData.kpiScores[kpi.name] || ""}
                      onChange={(e) =>
                        handleKPIChange(kpi.name, e.target.value)
                      }
                      placeholder="1-5"
                      className="w-16"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mb-6">
          <div className="flex items-center">
            <Checkbox
              id="attendance"
              checked={formData.attendance}
              onCheckedChange={(checked: boolean) =>
                setFormData((prevState) => ({
                  ...prevState,
                  attendance: checked,
                }))
              }
            />
            <Label htmlFor="attendance" className="ml-2">
              Attendance
            </Label>
          </div>
          <div>
            <Label htmlFor="timeIn">Time In</Label>
            <Input
              type="time"
              id="timeIn"
              name="timeIn"
              value={formData.timeIn}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="timeOut">Time Out</Label>
            <Input
              type="time"
              id="timeOut"
              name="timeOut"
              value={formData.timeOut}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mb-6">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Enter any additional notes or comments about today's performance"
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-between mt-6">
        {
          loading ?( <Button disabled onClick={handleSubmit} className="w-1/2 mr-2 flex gap-2 items-center">
           <Loader className="animate-spin"/><span> Submiting...</span>
        </Button>) : (<Button onClick={handleSubmit} className="w-1/2 mr-2">
          Submit
        </Button>)
        }
        <Button onClick={handlePrint} className="w-1/2 ml-2" variant="outline">
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default  PerformanceTrackingForm;