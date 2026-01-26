"use server"
import { getCurrentUserWithRole } from "@/lib/auth/getCurrentUserWithRole";
import { MarkAttendanceService , AttendanceUpdate} from "../services/attendance";
import { revalidatePath } from "next/cache";
import { failure,success } from "@/lib/error-and-res/response";

export async function MarkAttendanceAction(
    eventId:string,
    teamId:string | null,
    updates: AttendanceUpdate[],
    currentPath:string
){

    try {
        // Authenctication
        const {user} = await getCurrentUserWithRole();

        if(!user || !user.sub){
         return failure("Unauthorized: Please log in.");
        }

        // 2 call service 
        // we pass the plain data + userId
        await MarkAttendanceService(eventId,teamId,updates,user.sub);

        // 3 revalidate the UI
        // refresh the particpant list page to show the new status
        revalidatePath(currentPath);
        return success("Attendance updated successfully");
    } catch (error:any) {
        return failure(error.message || "Failed to update attendance.");
    }
}