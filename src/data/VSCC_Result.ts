import { Uri } from "vscode";

export default class Result {
    public code: number = 0;
    public comment: number = 0;
    public blank: number = 0;
    public uri: Uri = Uri.file('');
    public filename: string = '';
    public language: string = '';
};
