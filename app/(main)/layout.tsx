import type { Metadata } from "next";
// import { Geist} from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { ToastContainer } from "react-toastify";

import WhatsAppWidget from "@/components/common/whatsappWidget";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  metadataBase: new URL("https://kremcasc.in"),
  title: {
    default:"Kartikeya Rindani Event | KRE-MCASC",
    template:"%s | KRE-MCASC",
  },
  description: "Kartikeya Rindani Event (KRE 2026) is an inter-collegiate cultural and technical festival organized by Modern College of Arts, Science & Commerce (Autonomous), Shivajinagar pune-411005. The fest features competitions, Seminar, and performances designed to promote innovation, talent, and student engagement.",

  keywords:[
    "KRE MCASC",
    "kre mcasc",
    "krf mcasc",
    "kre 2026",
    "krf 2026",
    "kremcasc",
    "KRF 2026",
    "KRE 2026",
    "Kartikeya Rindani Event",
    "Kartikeya Rindani",
    "MCASC Pune",
    "Modern college Shivajinagar",
    "kremcasc",
    "kre event",
    "rindani events",
    "modern college cs department",

  ],
  authors:[{name:"Team codeCrafters"}],
  creator:"codeCrafters",
  publisher:"PES's Modern College of Arts, Science And Commerce",
  icons:{
    icon:"/favicon.ico",
    shortcut:"/favicon.ico",
    apple: "/apple-touch-icon.png"
  },
  openGraph:{
    type:"website",
    locale:"en_IN",
    url:"https://kremcasc.in",
    title:"KRE 2026 | The Ultimate Tech and Cultural Event",
    description: "Register for Quiz, Coding, Debate, and Project competitions. Win exciting prizes!",
    siteName:"KRE 2026",
    images:[
      {
        url:"/images/logo.png",
        width:1200,
        height:630,
        alt:"KRE 2026" 
      }
    ]
  },
  twitter:{
    card:"summary_large_image",
    title:"KRE 2026 | Register Now",
    description:"Join us at Modern College for KRF 2025. Events, Fun, and Tech!",
    images:["/images/logo.png"]
  },

  robots:{
    index:true,
    follow:true,
    googleBot:{
      index:true,
      follow:true,
      "max-video-preview":-1,
      "max-image-preview":'large',
      "max-snippet":-1
    }
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable}  antialiased`}
      >
        <Header/>
        {children}
        <ToastContainer />
        <WhatsAppWidget/>
        <Footer/>
      </body>
    </html>
  );
}
