import { getCurrentUserWithRole } from "@/lib/auth/getCurrentUserWithRole";
import { getCertificateDownloadData } from "@/server/services/certificate-service";
import {renderToStream} from "@react-pdf/renderer"
import { CertificateDocument } from "@/components/templates/certificate-template";

export async function GET(req:Request){
    try {
        const {user} = await getCurrentUserWithRole();
        
        if (!user) return new Response("Unauthorized", { status: 401 });

        const {searchParams}=new URL(req.url);
        const certId =searchParams.get('certId');

        if (!certId) return new Response("Missing Cert ID", { status: 400 });

        // 1 call the service  to get the data
        const {data , fileName}= await getCertificateDownloadData(certId,user.sub)

        if(!data){
             return new Response("No data found", { status: 400 });
        }

        // 2 generate the streams 
        const stream = await renderToStream(<CertificateDocument certificates={data}/>);

        //3 return the stream
        return new Response(stream as any,{
            "headers":{
            "Content-Type":"application/pdf",
            "Content-Disposition": `attachment; filename="${fileName}"`,
        },
        })
    } catch (error: any) {
    console.error("Download Error:", error);
    const message = error.message === "Unauthorized access to this certificate" 
        ? "Forbidden" 
        : "Internal Server Error";
    
    return new Response(message, { status: error.message === "Unauthorized access to this certificate" ? 403 : 500 });
  }
}