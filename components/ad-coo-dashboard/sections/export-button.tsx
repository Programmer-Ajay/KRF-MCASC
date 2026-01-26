"use client"

import { useState } from "react";
import { Download,Loader } from "lucide-react";
import {toast} from "react-toastify"
interface DownloadButtonProps{
    eventId:string;
}

const ExportButton= ({eventId}:DownloadButtonProps)=>{
    const [isLoading ,setIsLoading]= useState(false);

    const handleDownload= async()=>{
        try{
            setIsLoading(true);
            toast.info("Generating Excel file...");
            const response =await fetch(`/coordinator/${eventId}/participants/export?t=${Date.now()}`,{
                method:"GET",
               headers: {
               "Cache-Control": "no-cache", // Tell the server we want fresh data
  }
            });
           
            if(!response.ok){
                const errorData =await response.json() ;
                throw new Error(errorData.message ||"Download failed");
            }

            // convert the resposne to blob(Binary large object)
            const blob=await response.blob();
            
            // creating a invislbe download link
            const url=window.URL.createObjectURL(blob);
            const a =document.createElement("a");
            a.href=url;
            a.download=`Event-Registrations-${new Date().toISOString().split("T")[0]}.xlsx`;
            document.body.appendChild(a);

            // triner click and cleanup
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
             toast.success("Download complete!");
        }
        catch (error: any) {
      console.error("Download Error:", error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }

    }
    return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <Loader size={18} className="animate-spin" />
      ) : (
        <Download size={18} />
      )}
      {isLoading ? "Exporting..." : "Export List"}
    </button>
  );
}
export default ExportButton;