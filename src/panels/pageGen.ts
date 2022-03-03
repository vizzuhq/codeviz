import { Disposable, Webview, WebviewPanel, window, Uri, ViewColumn, workspace } from "vscode";
import { getUri } from "../utilities/getUri";

export class PageGenerator {
    private _view: Webview;
    private _panel: WebviewPanel;
    private _extensionUri: Uri;
    private _pathOnDisk: Uri;
    private _content: String = '';

	public constructor(panel: WebviewPanel, extensionUri: Uri) {
        this._panel = panel;
        this._view = panel.webview;
        this._extensionUri = extensionUri;
        this._pathOnDisk = Uri.joinPath(this._extensionUri, 'media');
    }

    public async generatePage() {
        const htmlPathOnDisk = Uri.joinPath(this._extensionUri, 'media', 'main.html');
        let doc = await workspace.openTextDocument(htmlPathOnDisk);
        this._content = doc.getText();
        const animScripts = this._collectAnimationScripts(Uri.joinPath(this._pathOnDisk, 'animations').path);
        const toolkitUri = getUri(this._view, this._extensionUri,
            [ "node_modules", "@vscode", "webview-ui-toolkit", "dist", "toolkit.js"]);
        const pathOnDisk = Uri.joinPath(this._extensionUri, 'media');
        const scriptPathOnDisk = Uri.joinPath(pathOnDisk, 'main.js');
        const scriptUri = (scriptPathOnDisk).with({ 'scheme': 'vscode-resource' });
        const styleResetPath = Uri.joinPath(this._extensionUri, 'media', 'reset.css');
        const stylesPathMainPath = Uri.joinPath(this._extensionUri, 'media', 'vscode.css');
        const stylesControlPath = Uri.joinPath(this._extensionUri, 'media', 'controls.css');
        const stylesResetUri = this._view.asWebviewUri(styleResetPath);
        const stylesMainUri = this._view.asWebviewUri(stylesPathMainPath);
        const stylesCtrlUri = this._view.asWebviewUri(stylesControlPath);
        this._content = this._content.replace('${toolkitUri}', toolkitUri.toString());
        this._content = this._content.replace('${stylesCtrlUri}', stylesCtrlUri.toString());
        this._content = this._content.replace('${scriptUri}', '<script src="' + scriptUri.toString() + '"></script>');
        this._content = this._content.replace('${scriptAnim}', animScripts.toString());
        console.log(this._content);
    }

    public getHtmlContent() {
        return this._content.valueOf();
    }

	private _collectAnimationScripts(dir: String) {
		let result: String = '';
		const fs = require('fs');
		const dirPath = fs.readdirSync(dir);
		dirPath.map((item: String) => {
			let path = Uri.joinPath(this._pathOnDisk, 'animations');
			path = Uri.joinPath(path, item.toString());
			const scriptUri = path.with({ 'scheme': 'vscode-resource' });
			result += '<script src="' + scriptUri.toString() + '"></script>\n';
		});
		return result;
	}
}