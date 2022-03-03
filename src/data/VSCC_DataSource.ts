import { Uri } from "vscode";

export default class VSCCDataSource {
    public data: object = Object;
    private _dataFolderUri: Uri;

    public constructor(wsUri: Uri) {
        this._dataFolderUri = Uri.joinPath(wsUri, '.VSCodeCounter');;
        this._selectDataSourceFolder(wsUri);
        this._readDataSource();
    }

	private _selectDataSourceFolder(wsUri: Uri) {
		let result: {data: String, path: String}[] = [];
        let vsccFolder = Uri.joinPath(wsUri, '.VSCodeCounter');
		const fs = require('fs');
		const dirPath = fs.readdirSync(this._dataFolderUri.path);
		dirPath.map((item: String) => {
            let path = Uri.joinPath(this._dataFolderUri, item.valueOf());
            result.push({data: item, path: path.path});
		});
        if (result.length) {
            result.sort();
            this._dataFolderUri = Uri.file(result[result.length - 1].path.valueOf());
        }
	}

    private _readDataSource() {        
        if (this._dataFolderUri == undefined)
            return;
        const fs = require('fs');
        let path = Uri.joinPath(this._dataFolderUri, "results.json").path;
        const text = fs.readFileSync(path, {encoding:'utf8', flag:'r'});
        this.data = JSON.parse(text);
    }
}
