import { commands, window, ExtensionContext, workspace, Uri } from "vscode";
import { CCVizzuPanel } from "./panels/ccVizzuPanel";
import { VSCCDataSource } from "./data/VSCC_DataSource";

export function activate(context: ExtensionContext) {
    const showCommand = commands.registerCommand("ccVizzu.show", () => {
        let wsPath: Uri;
        window.showInformationMessage('Preparing workspace information...');
        workspace.workspaceFolders?.map((folder) => {
            if (wsPath == undefined)
                wsPath = folder.uri;
        });
        commands.executeCommand('extension.vscode-counter.countInWorkspace').then(() => {
            CCVizzuPanel.render(context.extensionUri).then(() => {
                let data: VSCCDataSource;
                data = new VSCCDataSource(wsPath);
                CCVizzuPanel.reveal();
            });
        });
    });
    context.subscriptions.push(showCommand);
}
