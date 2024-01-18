import * as path from "path";

export function getFilesDirectory() {
    return path.join(__dirname, "..", "..", "files");
}