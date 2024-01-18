import { Html } from "@elysiajs/html";

export default function (props: { children: any; }) {
    return (
        <html lang="en">
            <head>

            </head>
            <body>
                {props.children}
            </body>
        </html>
    )
}