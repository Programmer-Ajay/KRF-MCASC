import { User, Mail, Building2, Calendar,PhoneIcon, Users, GraduationCap, RotateCcw, PhoneForwarded, Phone } from "lucide-react";
import { COLLEGES } from "@/config/college";
import { COURSE } from "@/config/course";
import { useState } from "react";
import { ClASSYEAR } from "@/config/classYear";

type Props={
  namePrefix?:string,
  getError:(fieldName:string)=>string[];
  onClearError:(name:string)=>void
}


export default function CommonFields({namePrefix="",getError,onClearError}:Props) {

  // state to track the if user wants to select the college name is manually 
  const [isManualCollege,setIsManualCollege]=useState(false)
  const [isManualCourse,setIsManualCourse]=useState(false)
  const [isManualClass,setIsManualClass]=useState(false)
  
  const fields = [
    {
      name: "fullName",
      label: "Full Name",
      placeholder: "Enter full name",
      icon: User,
      required: true,
      type: "text"
    },
    {
      name: "email",
      label: "Email Address",
      placeholder: "your.email@example.com",
      icon: Mail,
      required: true,
      type: "email"
    },
    {
      name: "mobileNo",
      label: "Mobile No",
      placeholder: "10-digit number",
      icon: Phone,
      required: true,
      type: "tel"
    },
    {
      name: "gender",
      label: "Gender",
      icon: Users, // Or a gender icon
      required: true,
      type: "select",
      options: ["male", "female", "other"]
    },
    {
      name: "guardianMobile",
      label: "Guardian Mobile",
      placeholder: "Parent's number (Optional)",
      icon: PhoneForwarded,
      required: false,
      type: "tel"
    },
    {
      name: "collegeName",
      label: "College Name",
      placeholder: "Enter college name",
      icon: Building2,
      required: true,
      type: isManualCollege? "text" :"select",
      options:isManualCollege? null :[...COLLEGES,"Other"]
    },
    {
      name: "courseName",
      label: "Course",
      placeholder: "e.g. BCA, B.Tech , Science",
      icon: GraduationCap,
      required: true,
      type: isManualCourse? "text":"select",
      options:isManualCourse ? null :[...COURSE,"Other"]
    },
    {
      name: "class",
      label: "Class / Year",
      placeholder: "e.g. FY, SY, Final Year",
      icon: Calendar,
      required: true,
      type: isManualClass? "text" :"select",
      options:isManualClass ? null:[...ClASSYEAR,"Other"],

    },
    {
      name: "category",
      label: "Category",
      icon: Users,
      required: true,
      type: "select",
      options: ["ug", "pg", "junior college"] // Update based on your Enum
    },
  ];

  // helper func

     // to check if the specifice is in currently in mannual or not
     const isFieldManual=(fieldName:string)=>{
      if(fieldName==="collegeName") return isManualCollege;
      if(fieldName==="courseName") return isManualCourse;
      if(fieldName==="class") return isManualClass;

      return false;
     }
     
     //  TO turn off the manual mode
     const disableManualMode=(fieldName:string)=>{
      if(fieldName==="collegeName") setIsManualCollege(false)
      if(fieldName==="courseName") setIsManualCourse(false)
      if(fieldName==="class") setIsManualClass(false)
     }

      //  TO turn off the manual mode

      const enableManualMode=(fieldName:string)=>{
      if(fieldName==="collegeName") setIsManualCollege(true)
      if(fieldName==="courseName") setIsManualCourse(true)
      if(fieldName==="class") setIsManualClass(true)
     }


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
      {fields.map((field) => {
        const Icon = field.icon;
        const inputName=namePrefix?`${namePrefix}.${field.name}`:field.name
        const error=getError(inputName)
        const hasError=error.length>0

        // check if the specifice field is in manual mode
        const isManual= isFieldManual(field.name);

        return (
          <div key={inputName} className="relative group"> 
          <div className=" flex gap-9"> 
            <label htmlFor={field.name} className="block text-xs sm:text-sm font-medium text-gray-200 mb-2">
              {field.label}
              {field.required && <span className="text-pink-500 ml-1">*</span>}
            </label>
            
            {/* show the back button if manaul mode is ON for this field */}

            {isManual &&(
              <button
                        type="button"
                        onClick={() => disableManualMode(field.name)}
                        className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 mb-2"
                    >
                        <RotateCcw size={12} /> Select from List
                    </button>
            )}


             </div>
            <div className="relative">
              <Icon className="absolute left-3 top-2.5 sm:top-3.5 w-4 sm:w-5 h-4 sm:h-5 text-gray-400 pointer-events-none group-focus-within:text-pink-500 transition-colors" />

               
               {field.type === "select" ? (
                <select
                  id={inputName}
                  name={inputName}
                  onChange={(e) =>{ 
                    onClearError(inputName);
                    if(e.target.value==="Other"){
                      enableManualMode(field.name);
                    }
                  }}

                  required={field.required}
                  className={`w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 bg-white/5 border rounded-lg sm:rounded-xl text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm appearance-none cursor-pointer
                    ${hasError ? "border-red-500 focus:ring-red-500" : "border-white/10"}`}
                >
                  <option value="" className="bg-gray-900 text-gray-400">Select {field.label}</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt} className="bg-gray-900 text-white">
                      {opt==="Other"? "Other(Type Manually)" : opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={inputName}
                  name={inputName}
                  type={field.type}
                  placeholder={field.placeholder}
                  onChange={() => onClearError(inputName)}
                  required={field.required}
                  className={`w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 bg-white/5 border rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm
                    ${hasError ? "border-red-500 focus:ring-red-500" : "border-white/10"}`}
                />
              )}

              {/* Error Message */}
              {hasError && (
                <p className="mt-1 text-sm text-red-400">
                  {error.join(", ")}
                </p>
              )}


              {/* Glow effect */}
              <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-linear-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity -z-10 blur"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}





{/* <input
                id={inputName}
                name={inputName}
                type={field.type || "text"}
                placeholder={field.placeholder}
                onChange={()=>onClearError(inputName)}
                required={field.required}
                
                className={`w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm
                 input ${error.length?"border-red-500 focus:ring-red-500" : ""}`}
              />

              {error.length > 0 && (
           <p className="mt-1 text-sm text-red-400">
           {error.join(", ")}
            </p>
            )} */} 

