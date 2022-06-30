import { commands, window, ExtensionContext, workspace, Uri } from "vscode";

import { CCVizzuPanel } from "./panels/ccvizzupanel";
import { VSCCDataSource } from "./data/vscc_datasource";
import { VSCCDataPrep } from "./data/vscc_dataprep";
import { Summary } from "./data/vscc_result";

export function activate(context: ExtensionContext) {
    const importCommand = commands.registerCommand("CodeViz.import", async () => {
        let wsPath: Uri;
        workspace.workspaceFolders?.map((folder) => {
            if (wsPath == undefined)
                wsPath = folder.uri;
        });
        const folderPath = await window.showInputBox({ 
            placeHolder: "import path",
            prompt: "Enter import data path",
            value: ""
        });
        if (folderPath) {
            CCVizzuPanel.render(context.extensionUri).then(() => {
                CCVizzuPanel.import(folderPath);
            });
        }
    });
    const exportCommand = commands.registerCommand("CodeViz.export", async () => {
        const folderPath = await window.showInputBox({ 
            placeHolder: "export path",
            prompt: "Enter export data path",
            value: ""
        });
        if (folderPath) {
            CCVizzuPanel.export(folderPath);
        }
    });
    const showCommand = commands.registerCommand("CodeViz.show", () => {
        let wsPath: Uri;
        workspace.workspaceFolders?.map((folder) => {
            if (wsPath == undefined)
                wsPath = folder.uri;
        });
        commands.executeCommand('extension.vscode-counter.countInWorkspace').then(() => {
            setTimeout(() => {
                CCVizzuPanel.render(context.extensionUri).then(() => {
                    let source: VSCCDataSource;
                    source = new VSCCDataSource(wsPath);
                    if (source.data != undefined) {
                        let data = new VSCCDataPrep();
                        data.makeDataTable(source.data);
                        CCVizzuPanel.refresh(data.getDataTable(), new Summary(source, data));
                    }
                    else
                        window.showErrorMessage('\'Code Counter\' data is not awailable!');
                });                    
            }, 1000);
        });
    });
    context.subscriptions.push(showCommand);
    context.subscriptions.push(importCommand);
    context.subscriptions.push(exportCommand);
}
