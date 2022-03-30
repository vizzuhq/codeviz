import { commands, window, ExtensionContext, workspace, Uri } from "vscode";

import { CCVizzuPanel } from "./panels/ccvizzupanel";
import { VSCCDataSource } from "./data/vscc_datasource";
import { VSCCDataPrep } from "./data/vscc_dataprep";
import { Summary } from "./data/vscc_result";

export function activate(context: ExtensionContext) {
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
}
