import * as path from "path";
import * as fs from "fs";
import * as fsPromise from "fs/promises";

export function getFilesDirectory() {
    return path.join(__dirname, "..", "..", "files");
}

export type fileStats = {file: string, date: Date};

const fileCache: fileStats[] = [];

export function getAllFiles() {
    if (fileCache.length > 0) {
        return fileCache;
    }

    for(const file of fs.readdirSync(getFilesDirectory())) {
        const stat = fs.statSync(path.join(getFilesDirectory(), file));
        fileCache.push({file: file, date: stat.mtime});
    }

    fileCache.sort((fileA, fileB) => fileA.date < fileB.date ? 1 : fileA.date > fileB.date ? -1 : 0);
    return fileCache;
}

export async function deleteFile(file: string) {
    try {
        await fsPromise.unlink(path.join(getFilesDirectory(), file));
        for(let i = 0; i < fileCache.length; i++) {
            if (fileCache[i].file === file) {
                fileCache.splice(i, 1);
                return;
            }
        }
    } catch (e) {}
}

function fileName(originalName: string): string {
    const lastPeriod = originalName.lastIndexOf(".");
    let ending = "";
    if (lastPeriod >= 0) {
         ending = originalName.substring(lastPeriod);
    }
    return btoa(Date.now() + "") + ending;
}

export function storeFile(file: File) {

    const newFileName = fileName(file.name);
    Bun.write(path.join(getFilesDirectory(), newFileName), file);
    fileCache.unshift({file: newFileName, date: new Date()});
}