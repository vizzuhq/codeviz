import { Uri } from "vscode";
import { getUri } from "../utilities/getUri";

export class VSCCDataSource {
    private _dataFolderUri: Uri;

    public constructor(wsUri: Uri) {
        this._dataFolderUri = Uri.joinPath(wsUri, '.VSCodeCounter');;
        this._selectSourceFolder(wsUri);
    }

	private _selectSourceFolder(wsUri: Uri) {
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
            //this._dataFolderUri = vsccFolder result[result.length - 1];
        }
	}
}
