import Elysia from "elysia";
import {checkAuthorization} from "./authorization.ts";
import * as fs from "fs/promises";
import {getFilesDirectory} from "./utils.ts";
import Home from "../page/Home.tsx";
import HtmlBoilerplate from "../page/HtmlBoilerplate.tsx";

export function register(server: Elysia) {
    return server
        .derive(({headers}) => {
            return {
                authorized: checkAuthorization(headers['authorization'])
            };
        })
        .guard({
                beforeHandle({authorized}) {
                    if (!authorized) {
                        return new Response("", {
                            headers: {
                                'WWW-Authenticate': 'Basic realm="Login"'
                            },
                            status: 401
                        })
                    }
                }
            },
            paths);

}

function paths(server: Elysia) {

    return server
        .get("/", async () => {
            const files = await fs.readdir(getFilesDirectory());

            return (
                <HtmlBoilerplate >
                    <Home files={files}/>
                </HtmlBoilerplate>
            )
        })
        .get("/logout", () => new Response("", {status: 401}))
        .post("/upload", () => {

        })
        .delete("/:id", () => {

        });
}