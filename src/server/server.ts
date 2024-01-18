import Elysia from "elysia";

const port = process.env.PORT ?? 3001;

const server = new Elysia()
    .on("start", (data) => {
        console.log("Started server on port " + data.server.port);
    })
    .on("request", (data) => {
        console.log(`[${data.request.method}] ${data.request.url}`)
    })


export default server

export function start(server: Elysia) {
    server
        .listen(port);
}