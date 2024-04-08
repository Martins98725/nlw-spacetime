import { FastifyInstance } from "fastify";
import axios from "axios";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function authRoutes(app: FastifyInstance){
    app.post("/register", async (request) =>{
        const bodySchema = z.object({
            code: z.string(),
        })

        const { code } = bodySchema.parse(request.body)

        const acessTokenResponse = await axios.post(
            "https://github.com/login/oauth/access_token", 
            null,
            {
                params: {
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secrets: process.env.GITHUB_CLIENT_SECRET,
                    code,
                },
                headers:{
                    Accept: "aplications/json",
                },
            }
        )
        const { accesToken } = acessTokenResponse.data

        const userResponse = await axios.get("https://api.github.com/user", {
            headers:{
                Authorization: `Bearer ${accesToken}`,
            }
        })

        const userSchema = z.object({
            id: z.number(),
            login: z.string(),
            name: z.string(),
            avatarUrl: z.string().url(),
        })

        const userInfo = userSchema.parse(userResponse.data)

        let user = await prisma.user.findUnique({
            where:{
                githubId: userInfo.id
            }
        })

        if(!user){
            user = await prisma.user.create({
                data:{
                    githubId: userInfo.id,
                    login: userInfo.login,
                    name: userInfo.name,
                    avatrUrl: userInfo.avatarUrl,
                },
            })
        }

        return{
            user,
        }
    })
}