import type { Metadata } from "next";
// import { Geist } from "next/font/google";
import "@/app/globals.css";
import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
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
    default: "Auth | KRF 2025", // Fallback if a page has no title
    template: "%s | KRE 2026"   
  },
  description: "Secure login and registration for KRE 2026.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        // className={`${geistSans.variable}   antialiased`}
      >
    <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          // theme="dark"
        />
        {children}
    
      </body>
    </html>
  );
}
