import { commands, window, ExtensionContext, workspace, Uri } from "vscode";

import CCVizzuPanel from "./panels/ccVizzuPanel";
import VSCCDataSource from "./data/VSCC_DataSource";
import VSCCDataPrep from "./data/VSCC_DataPrep";

export function activate(context: ExtensionContext) {
    const showCommand = commands.registerCommand("ccVizzu.show", () => {
        let wsPath: Uri;
        window.showInformationMessage('Preparing \'Code Counter\' data...');
        workspace.workspaceFolders?.map((folder) => {
            if (wsPath == undefined)
                wsPath = folder.uri;
        });
        commands.executeCommand('extension.vscode-counter.countInWorkspace').then(() => {
            CCVizzuPanel.render(context.extensionUri).then(() => {
                let source: VSCCDataSource;
                source = new VSCCDataSource(wsPath);
                if (source.data != undefined) {
                    let data = new VSCCDataPrep();
                    data.makeDataTable(source.data);
                    CCVizzuPanel.reveal(data.getDataTable());
                }
                else
                    window.showErrorMessage('\'Code Counter\' data is not awailable!');
            });
        });
    });
    context.subscriptions.push(showCommand);
}
