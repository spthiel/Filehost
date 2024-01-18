import Elysia from "elysia";
import * as path from "path";
import {getFilesDirectory} from "./utils.ts";
import * as fs from "fs";

export function register(server: Elysia) {
    return server
        .get("/file/:id", ({params: {id}}) => {
            if (id.match(/[A-Z0-9]\.[A-Z]/i)) {
                const filePath = path.join(getFilesDirectory(), id);
                console.log(filePath)
                return Bun.file(filePath);
            }
            return new Response("Bad filename", {status: 400});
        });
}