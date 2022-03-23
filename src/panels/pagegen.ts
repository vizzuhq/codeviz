import { Console } from "console";
import { Disposable, Webview, WebviewPanel, window, Uri, ViewColumn, workspace } from "vscode";
import { getUri } from "../utilities/geturi";

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
        const toolkitUri = getUri(this._view, this._extensionUri,
            [ "node_modules", "@vscode", "webview-ui-toolkit", "dist", "toolkit.js"]);
        const htmlPathOnDisk = Uri.joinPath(this._extensionUri, 'media', 'main.html');
        let doc = await workspace.openTextDocument(htmlPathOnDisk);
        this._content = doc.getText();
        const scripts = this._collectScripts(Uri.joinPath(this._pathOnDisk, 'scripts').path);
        const stylesControlPath = Uri.joinPath(this._extensionUri, 'media', 'main.css');
        const styleMain = this._view.asWebviewUri(stylesControlPath);
        const logoPath = Uri.joinPath(this._extensionUri, 'assets', 'vizzu_logo.png');
        const logo = this._view.asWebviewUri(logoPath);
        this._content = this._content.replace('${styleMain}', styleMain.toString());
        this._content = this._content.replace('${scriptToolkit}', toolkitUri.toString());
        this._content = this._content.replace('${scripts}', scripts.toString());
        this._content = this._content.replace('${logo}', logo.toString());
    }

    public getHtmlContent() {
        return this._content.valueOf();
    }

	private _collectScripts(root: String) {
		let result: String = '';
		const fs = require('fs');
		const directories = fs.readdirSync(root);
		directories.map((item: String) => {
			let path = Uri.joinPath(this._pathOnDisk, 'scripts');
			path = Uri.joinPath(path, item.toString());
			const scriptUri = path.with({ 'scheme': 'vscode-resource' });
			result += '<script src="' + scriptUri.toString() + '"></script>\n';
		});
		return result;
	}
}