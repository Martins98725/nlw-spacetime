import type { Metadata } from "next";
import { Roboto_Flex as Roboto, Bai_Jamjuree as BaiJamjuree } from "next/font/google";
import "./globals.css";
import { SingIn } from "@/components/singIn";
import { Profile } from "@/components/profile";
import { Hero } from "@/components/hero";
import { Copyright } from "@/components/copyright";
import { cookies } from "next/headers";



const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto" });
const baijamjuree = BaiJamjuree({ subsets: ["latin"], weight: "700", variable: "--font-bai-jamjuree" });

export const metadata: Metadata = {
  title: "NLW Spacetime",
  description: "Uma capsula do tempo construida com React, Next.js, TawindCSS e TypeScript",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {

  const isAuthenticated = cookies().has("token")

  return (
          <html lang="en">
            <body className={`${roboto.variable} ${baijamjuree.variable} font-sans bg-gray-900 text-gray-100`}>

              

              <main className="grid grid-cols-2 min-h-screen">
            {/* Left */}
            <div className="flex flex-col items-start justify-between px-28 py-16 relative overflow-hidden bg-[url(../assets/bg-stars.svg)]">
                {/* Blur */}
              <div className="absolute right-0 top-1/2 h-[288px] w-[526px] 
              -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full  border-white/10"/>

                <div className="absolute right-2 top-0 bottom-0 w-2  bg-stripes"></div>

                {isAuthenticated ? <Profile></Profile> :<SingIn  />}
                  <Hero/>
                  <Copyright/>

            </div>

              <div className="flex flex-col p-16 bg-[url(../assets/bg-stars.svg)] bg-cover">
              {children}
            </div>
              </main>
      
      </body>
    </html>
  );
}
