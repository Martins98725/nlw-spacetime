
import { Copyright } from "@/components/copyright";
import { EmptyMemories } from "@/components/empytMemorie";
import { Hero } from "@/components/hero";
import { SingIn } from "@/components/singIn";

export default function Home() {
  return (
    <main className="grid grid-cols-2 min-h-screen">
      {/* Left */}
      <div className="flex flex-col items-start justify-between px-28 py-16 relative overflow-hidden bg-[url(../assets/bg-stars.svg)]">
           {/* Blur */}
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] 
        -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full  border-white/10"/>

           <div className="absolute right-2 top-0 bottom-0 w-2  bg-stripes"></div>

           <SingIn/>
            <Hero/>
            <Copyright/>

      </div>

      <div className="flex flex-col p-16 bg-[url(../assets/bg-stars.svg)] bg-cover">
      <EmptyMemories/>
      </div>
    </main>
  );
}