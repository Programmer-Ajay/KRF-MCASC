// import { m } from "framer-motion";

// export class AppError extends Error {
//     code:string;
//     status?:number;

//     constructor(message:string,code="UNKNOWN_ERROR",status?:number){
//         super(message),
//         this.code=code;
//         this.status=status;
//     }
// }


export class AppError extends Error {
  public code: string;
  public status: number;

  constructor(message: string, code: string = "UNKNOWN_ERROR", status: number = 400) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.status = status;
  }
}




