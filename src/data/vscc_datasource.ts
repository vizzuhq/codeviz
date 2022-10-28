import { Uri } from "vscode";

export class VSCCDataSource {
    public data: object = Object;
    public folder: String = '';
    public date: String = '';
    private _dataFolderUri: Uri;

    public constructor(wsUri: Uri, targetDir: Uri) {
        this._dataFolderUri = Uri.joinPath(wsUri, '.VSCodeCounter');;
        this._selectDataSourceFolder(wsUri);
        this._readDataSource();
    }

	private _selectDataSourceFolder(wsUri: Uri) {
		let result: {date: String, path: String}[] = [];
		const fs = require('fs');
		const dirPath = fs.readdirSync(this._dataFolderUri.fsPath);
		dirPath.map((item: String) => {
            let path = Uri.joinPath(this._dataFolderUri, item.valueOf());
            result.push({date: item, path: path.fsPath});
		});
        if (result.length) {
            result.sort();
            this.folder = wsUri.path;
            this.date = result[result.length - 1].date;
            let path = result[result.length - 1].path.valueOf();
            this._dataFolderUri = Uri.file(path.valueOf());
        }
	}

    private _readDataSource() {
        if (this._dataFolderUri == undefined)
            return;
        const fs = require('fs');
        let path = Uri.joinPath(this._dataFolderUri, "results.json").fsPath;
        const text = fs.readFileSync(path, {encoding:'utf8', flag:'r'});
        this.data = JSON.parse(text);
    }
}
