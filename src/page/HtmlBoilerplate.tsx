import * as React from "react";
import {ReactNode} from "react";

export default function (props: { children: ReactNode, title: string }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8"/>
                <title>{props.title}</title>
                <link href="/style.css" rel="stylesheet" type="text/css" />
            </head>
            <body>
                {props.children}
            </body>
        </html>
    )
}