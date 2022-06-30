import { commands, Disposable, Webview, WebviewPanel, window, Uri, ViewColumn, env } from "vscode";
import { PageGenerator } from "./pagegen";
import { Summary } from "../data/vscc_result";
import { Console } from "console";

export class CCVizzuPanel {
    public static currentPanel: CCVizzuPanel | undefined;
    private _pageGen: PageGenerator;
    private readonly _panel: WebviewPanel;
    private _disposables: Disposable[] = [];
    private _dataTable: any;
    private _dataSummary: any;

    private constructor(panel: WebviewPanel, extensionUri: Uri) {
        this._panel = panel;
        this._panel.onDidDispose(this.dispose, null, this._disposables);
        this._setWebviewMessageListener(this._panel.webview);
        this._pageGen = new PageGenerator(panel, extensionUri);
    }

    public static export(folderPath: string) {
        if (CCVizzuPanel.currentPanel && this.currentPanel) {
            if (this.currentPanel._dataTable != undefined)
                CCVizzuPanel.currentPanel._jsonDataExport(folderPath);
            else
                window.showErrorMessage("No data to export");
        }
    }

    public static import(folderPath: string) {
        if (CCVizzuPanel.currentPanel) {
            CCVizzuPanel.currentPanel._jsonDataImport(folderPath);
            if (this.currentPanel != undefined) {
                let panel = this.currentPanel._panel;
                panel.webview.postMessage({
                    command: 'clear-data-table'
                });
            }
        }
    }

    public static refresh(data: Object, summ: Summary) {
        if (this.currentPanel != undefined) {
            this.currentPanel._dataTable = data;
            this.currentPanel._dataSummary = summ;
            let panel = this.currentPanel._panel;
            panel.reveal(ViewColumn.One);
        }
    }

    public static async render(extensionUri: Uri) {
        if (CCVizzuPanel.currentPanel) {
            CCVizzuPanel.currentPanel._panel.reveal(ViewColumn.One);
        }
        else {
            const panel = window.createWebviewPanel(
                "CodeViz", "CodeViz",
                ViewColumn.One, {
                    enableScripts: true,
            });
            let vizzu = new CCVizzuPanel(panel, extensionUri);
            CCVizzuPanel.currentPanel = vizzu;
            await vizzu._pageGen.generatePage();
            vizzu._panel.webview.html = vizzu._pageGen.getHtmlContent();
        }
    }

    public dispose() {
        CCVizzuPanel.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const disposable = this._disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }
    }

    private _setWebviewMessageListener(webview: Webview) {
        webview.onDidReceiveMessage(
            (message: any) => {
                const command = message.command;
                const text = message.text;
                switch (command) {
                    case "vizzu-ready":
                        this._panel.webview.postMessage({
                            command: 'refresh-data-table',
                            dataTable: this._dataTable,
                            dataSummary: this._dataSummary
                        });
                        return;
                    case "showinexplorer":
                        let uri = Uri.parse(this._dataSummary.rootDir);
                        uri = Uri.joinPath(uri, text);
                        commands.executeCommand('revealInExplorer', uri);
                        return;
                    case "openlink":
                        env.openExternal(Uri.parse(text));
                        return;
                    case "showinfo":
                        window.showInformationMessage(text);
                        return;
                    case "showerror":
                        window.showErrorMessage(text);
                        return;
                    case "statusbarmsg":
                        window.setStatusBarMessage(text,
                            new Promise((resolve, reject) => {
                                setTimeout(() => { resolve(true); }, message.timeout);
                            }));
                }
            },
            undefined,
            this._disposables
        );
    }

    private _jsonDataImport(rootDir: string) {
        if (rootDir.endsWith('/'))
            rootDir = rootDir.substring(0, rootDir.length - 1);
        this._dataTable = {};
        this._dataSummary = {};
        const fs = require('fs');
        const text1 = fs.readFileSync(rootDir + '/data.json', {encoding:'utf8', flag:'r'});
        this._dataTable = JSON.parse(text1);
        const text2 = fs.readFileSync(rootDir + '/datasum.json', {encoding:'utf8', flag:'r'});
        this._dataSummary = JSON.parse(text2);
    }
    
    private _jsonDataExport(rootDir: string) {
        if (rootDir.endsWith('/'))
            rootDir = rootDir.substring(0, rootDir.length - 1);
        var fs = require('fs');
        fs.writeFile(rootDir + '/data.json',
            JSON.stringify(this._dataTable), function(err: Object) {
                if (err)
                    console.log(err);
            }
        );
        var fs = require('fs');
        fs.writeFile(rootDir + '/datasum.json',
            JSON.stringify(this._dataSummary), function(err: Object) {
                if (err)
                    console.log(err);
            }
        );
    }
}
