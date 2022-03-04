import { Uri } from "vscode";
import { VSCCDataSource } from "./VSCC_DataSource";
import { VSCCDataPrep } from "./VSCC_DataPrep";

export class Result {
    public code: number = 0;
    public comment: number = 0;
    public blank: number = 0;
    public uri: Uri = Uri.file('');
    public filename: string = '';
    public language: string = '';
};

export class Summary {
    public rootDir: String = '';
    public date: String = '';
    public files: number = 0;
    public lines: number = 0;
    public commentCount: number = 0;
    public blankCount: number = 0;
    public codeCount: number = 0;
    public depth: number = 0;

    public constructor(source: VSCCDataSource, data: VSCCDataPrep) {
        this.rootDir = source.folder;
        this.date = source.date;
        this.files = data.fileCount;
        this.lines = data.codeLinesCount + data.commentLinesCount + data.blankLinesCount;
        this.codeCount = data.codeLinesCount;
        this.commentCount = data.commentLinesCount;
        this.blankCount = data.blankLinesCount;
        this.depth = data.dirStructureDepth;
    }
};
