import server, {start} from "./server/server";
import * as admin from "./server/admin";
import * as user from "./server/user";
import {getAllFiles} from "./server/utils.ts";
import * as path from "path";

let app = server;

app = admin.register(app);
app = user.register(app);

app = app
    .get("/style.css", () => Bun.file(path.join(__dirname, "dist", "page.css")))

getAllFiles();

start(app);