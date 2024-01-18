import server, {start} from "./server/server";
import * as admin from "./server/admin";
import * as user from "./server/user";

let app = server;

app = admin.register(app);
app = user.register(app);

app = app
    .all("*", ({set}) => {
        set.status = 404;

        return "Page not found";
    })

start(app);