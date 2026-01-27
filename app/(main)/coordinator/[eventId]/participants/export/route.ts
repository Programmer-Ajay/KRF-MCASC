import { NextRequest,NextResponse } from "next/server";
import ExcelJS from "exceljs"
import { getExportData ,type ExportRegistrationData } from "@/server/services/export-list";
      export const dynamic = 'force-dynamic';

// this is a route handler
export async function GET(
    req:NextRequest,
    { params }: { params: Promise<{ eventId: string }> }
){
    try{
          
        const {eventId}=  await params;

        //get the raw data
        const response= await getExportData(eventId);
         
        // console.log("Response of export list:",response?.data);
        if(!response.success || !response.data){
            return NextResponse.json({
                success:false, message:response.message || "no data found"}, 
                {status:404}
            )
        }

        const registrations:ExportRegistrationData[]=response.data;

        // prepare the excel file
        const workbook=  new ExcelJS.Workbook();
        const worksheet =workbook.addWorksheet("Registrations");

        // define the columns

            
          if(registrations[0].registrationType==="solo"){
               // solo participant
            worksheet.columns=[
            // {header:"Sr.No",key:"srno",width:15},
            // {header:"Team Name",key:"teamName",width:15},
            // {header:"Role",key:"role",width:15},
            {header:"Participant Name",key:"pName",width:25},
            {header:"mobile No",key:"mobileNo",width:15},
            {header:"college Name",key:"collegeName",width:25},
            {header:"Class",key:"class",width:15},
            {header:"course",key:"course",width:15},
            {header:"category",key:"category",width:15},
            {header:"Sign",key:"sign",width:15}
        ];
          } 
          else{
        worksheet.columns=[
            // {header:"Sr.No",key:"srno",width:15},
            {header:"Team Name",key:"teamName",width:15},
            {header:"Role",key:"role",width:15},
            {header:"Participant Name",key:"pName",width:25},
            {header:"mobile No",key:"mobileNo",width:15},
            {header:"college Name",key:"collegeName",width:25},
            {header:"Class",key:"class",width:15},
            {header:"course",key:"course",width:15},
            {header:"category",key:"category",width:15},
            {header:"Sign",key:"sign",width:15}
        ];
    }
        // process rows
        registrations.forEach((reg)=>{
            const isTeam =reg.registrationType==="team";
             
            if(!isTeam){
                //solo logic
                const p= reg.participant;
                
                worksheet.addRow({
            teamName: "N/A",
            role: "Participant",
           pName: p?.fullName ?? "Unknown",
           mobileNo: p?.mobileNo ?? "N/A",
           collegeName: p?.collegeName ?? "N/A",
           class: p?.class ?? "N/A",
           course: p?.courseName ?? "N/A",
           category:p?.category??"N/A",
           sign: "",
        });
            }

            else{
               // team logic
               const teamName=reg?.team?.teamName ?? "Unammed team";
               // get all members and leaderID
               const memberData=reg?.team?.members ||[];
               const leaderId=reg?.team?.leaderProfileId;

               // flaltten the array
               const participants= memberData.map((m)=>m.participant);

               // sort the array where leader should be at top
               participants.sort((a,b)=>{
                if(a.profileId==leaderId) return -1 // leader goes up
                if(b.profileId===leaderId) return 1;
                return 0;
               });

               participants.forEach((member,index)=>{
                const isLeader=member.profileId===leaderId;
                const isFirstRow=index===0;
                
                 const row = worksheet.addRow({
                    teamName:isFirstRow? teamName :"",
                    role:isLeader?"Leader" :"Member",
                    pName: member.fullName ?? "Unknown",
                     mobileNo: member.mobileNo ?? "N/A",
                    collegeName: member.collegeName ?? "N/A",
                     class: member.class ?? "N/A",
                    course: member.courseName ?? "N/A",
                    category:member?.category ?? "N/A",
                     sign: "",
                    
                 });

                 // style the leader
                 if(isFirstRow){
                    row.getCell("teamName").font={bold:true};
                    row.getCell("role").font={bold:true};
                 }
               });
               worksheet.addRow({}); // separation row

            }
        });


        // global style
        const headerRow=worksheet.getRow(1);
        headerRow.font={bold:true,color:{argb:'FFFFFFFF'}};
        headerRow.fill={
            type:'pattern',
            pattern:'solid',
            fgColor:{argb:'FF333333'}
        };

        // Borders & Alignment for all cells
      worksheet.eachRow((row) => {
       row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
        cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
      });
    });
     
    const buffer =await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer,{
        headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="Export-${eventId}.xlsx"`,
      },
    });

    }catch(error){
     console.error("Export Route Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" }, 
      { status: 500 },
    );
   }
}