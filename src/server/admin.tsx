import Elysia, {t} from "elysia";
import {checkAuthorization} from "./authorization.ts";
import * as fs from "fs/promises";
import {deleteFile, getAllFiles, getFilesDirectory, storeFile} from "./utils.ts";
import Home from "../page/Home.tsx";
import HtmlBoilerplate from "../page/HtmlBoilerplate.tsx";
import {renderToString} from "react-dom/server";
import * as path from "path";

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
        .get("/", ({set}) => {
            const files = getAllFiles();

            set.headers["Content-Type"] = "text/html";

            return renderToString(<HtmlBoilerplate
                title="Homepage"
            >
                <Home files={files}/>
            </HtmlBoilerplate>)
        })
        .get("/logout", () => new Response("", {status: 401}))
        .post("/upload", async ({set, body}) => {
            if (typeof body === "object" && body !== null && "file" in body) {
                const file = body["file"];
                storeFile(file as File);
            }

            set.redirect = "/";
        })
        .post("/delete", async ({set, body}) => {
            if (typeof body === "object" && body !== null && "file" in body) {
                await deleteFile((body as {file: string}).file);
            }

            set.redirect = "/";
        });
}