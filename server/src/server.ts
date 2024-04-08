import fastify from "fastify"
import "dotenv/config"
import { memoriesRoute } from "./route/memories";
import cors from "@fastify/cors";
import { authRoutes } from "./route/auth";

const app = fastify();

app.register(cors, {
    origin: true,   
})

app.register(memoriesRoute)
app.register(authRoutes)


app.listen({
    port: 3333,

}).then(() => {
    console.log("😁 HTTP runing on http://localhost:3333")
});