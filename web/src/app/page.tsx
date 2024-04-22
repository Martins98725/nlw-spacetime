import { EmptyMemory } from "@/components/empytMemory";
import { api } from "@/lib/api";
import dayjs from "dayjs";
import { cookies } from "next/headers";
import ptbr from "dayjs/locale/pt-br";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

dayjs.locale(ptbr)

interface Memory{
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}



export default async function Home() {

  const isAuthenticated = cookies().has("token")

  if(!isAuthenticated){
    return <EmptyMemory/>

  }  

  const token =  cookies().get("token")?.value


  const response = await api.get("/memories",{
    headers:{
      Authorization: `Bearer ${token}`,
    }
  })

  const memories: Memory[] = response.data

  if(memories.length === 0){
    return <EmptyMemory/>
  }

  return(
    <div  className="flex flex-col gap-10 p-8">
      {memories.map(memory => {
        return(
          <div key={memory.id} className="space-y-4">
            <time className="flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 -ml-8">
              {dayjs(memory.createdAt).format("D[ de ]MMMM[, ]YYYY")}
              </time>
              <Image 
              src={memory.coverUrl} width={592} height={280} className="w-full aspect-video object-cover rounded-lg" alt=""
              />
              <p className="text-lg leading-relaxed text-gray-100">
                {memory.excerpt}
              </p>

              <Link href={`/memories/${memory.id}`} className="flex items-center gap-2 text-gray-200 hover:text-gray-100">
              Ler mais
              <ArrowRight className="w-4 h-4"/>
              </Link>
              
          </div>
        )
      })}
    </div>
  )


}
