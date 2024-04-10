import "dotenv/config";

import  multipart  from "@fastify/multipart";
import fastify from "fastify";
import { memoriesRoute } from "./route/memories";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { authRoutes } from "./route/auth";
import { uploadRoutes } from "./route/upload";
import { resolve } from "path";

const app = fastify();

app.register(multipart)

app.register(cors, {
    origin: true,   
})

app.register(jwt, {
    secret: "spacetime",
})


app.register(authRoutes)
app.register(memoriesRoute)
app.register(uploadRoutes)
app.register(require("@fastify/static"), {
    root: resolve(__dirname, "../uploads"),
    prefix: "/uploads",
})


app.listen({
    port: 3333,
    host: "0.0.0.0",

}).then(() => {
    console.log("😁 HTTP runing on http://localhost:3333")
});