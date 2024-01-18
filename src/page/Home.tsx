import * as React from "react";
import {fileStats} from "../server/utils.ts";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUpRightFromSquare, faTrash} from "@fortawesome/free-solid-svg-icons";

const itemsPerPage = 20;

export default function ({files}: {files: fileStats[]}) {
    return (
        <div className="p-2">
            <div>
                <form action="/upload" method="POST" encType="multipart/form-data" className="text-center">
                    <div>
                        <input type="file" name="file" className="file-input w-full max-w-xs"/>
                    </div>
                    <div>
                        <button type="submit">Upload</button>
                    </div>
                </form>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Filename</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map(({file}, index) =>
                        <tr key={index}>
                            <td>{file}</td>
                            <td width="1.5em">
                                <form action="/delete" method="POST" className="mb-0">
                                    <input type="hidden" name="file" value={file}/>
                                    <button type="submit"><FontAwesomeIcon width="1em" icon={faTrash} /></button>
                                </form>
                            </td>
                            <td width="1.5em">
                                <a href={"/file/" + file} target="_blank">
                                    <button type="submit"><FontAwesomeIcon width="1em"  icon={faArrowUpRightFromSquare} /></button>
                                </a>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}