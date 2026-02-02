// "use server"
// import { success ,failure } from "@/lib/error-and-res/response";
// import { getEventList } from "../services/get-competiton-details";

// export async function getEventListAction(){
//  try {
//      const res= await getEventList();
//      return  success("Event list is fetch:",res);
//     //  console.log("response ::",res);
//  } catch (error:any) {
//     console.log("Error in fetching the  list",error);
//      return failure("Error:Not fetching the Event list");
//  }
// }