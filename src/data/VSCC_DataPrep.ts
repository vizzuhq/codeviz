import { Uri } from "vscode";
import { Result } from "./VSCC_Result";

interface IStringIndex {
    [key: string]: any
}

export class VSCCDataPrep {
    public fileCount: number = 0;
	public codeLinesCount: number = 0;
	public blankLinesCount: number = 0;
	public commentLinesCount: number = 0;
	public dirStructureDepth: number = 0;
	private _vizzuDataTable: any = {};
	private _pathFragments: Array<Array<String>> = [];

	public constructor() {
		this._vizzuDataTable = { series: [], records: [] };
	}

	makeDataTable(rawData: Object) {
        let data = rawData as IStringIndex;
        let codeCounterData: Result[] = [];
        for(var propertyName in rawData) {
            let item: Result = new Result;
            item.uri = Uri.parse(propertyName);
            item.language = data[propertyName]['language'];
            item.code = data[propertyName]['code'];
            item.blank = data[propertyName]['blank'];
            item.comment = data[propertyName]['comment'];
            item.filename = item.uri.path;
            codeCounterData.push(item);
        }
		this.preparePathFragments(codeCounterData);
		this.removeRedundantPathFragments();
		this.dirStructureDepth = this.getDirStructureDepth();
		this.generatePathSequences();
		this.generateTableStructure();
		this.generateRecords(codeCounterData);
	}

	sortByLanguagesAndLinesCount(codeCounterData: Result[]) {
		let sorted: Array<Result> = [];
		let temp: Array<Array<Result>> = [];
		for(let i = 0; i < codeCounterData.length; i++) {
			let inserted: boolean = false;
			let record = codeCounterData[i];
			for(let j = 0; j < temp.length; j++) {
				if (temp[j][0].language == record.language) {
					for(let k = 0; k < temp[j].length; k++) {
						if (record.code > temp[j][k].code) {
							temp[j].splice(k, 0, record);
							inserted = true;
							break;
						}
					}
					if (!inserted) {
						temp[j].push(record);
						inserted = true;
						break;
					}
				}
			}
			if (!inserted) {
				let empty = [];
				empty.push(record);
				temp.push(empty);
			}
		}
		for(let i = 0; i < temp.length; i++)
			for(let j = 0; j < temp[i].length; j++)
				sorted.push(temp[i][j]);
		return sorted;
	}

	generateRecords(codeCounterData: Result[]) {
		for(let i = 0; i < codeCounterData.length; i++) {
			let vizzuRecord = new Array<String>();
			let ccRecord = codeCounterData[i];
			let file = new String(ccRecord.uri.toString().split('/').pop());
			vizzuRecord.push(new String(file));
			vizzuRecord.push(new String(ccRecord.language));
			vizzuRecord.push(new String(ccRecord.code.toString()));
			vizzuRecord.push(new String(ccRecord.comment.toString()));
			vizzuRecord.push(new String(ccRecord.blank.toString()));
			let frags = this._pathFragments[i];
			let depth = frags.length;
			for(let j = 0; j < depth; j++)
				vizzuRecord.push(frags[j]);
			vizzuRecord[0] = new String(frags[depth - 1].valueOf() + vizzuRecord[0]);
			this._vizzuDataTable.records.push(vizzuRecord);
			this.fileCount++;
			this.codeLinesCount += ccRecord.code;
			this.blankLinesCount += ccRecord.blank;
			this.commentLinesCount += ccRecord.comment;
		}
	}

	generateTableStructure() {
		this._vizzuDataTable.series.push({ name: 'File name', type: 'dimension' });
		this._vizzuDataTable.series.push({ name: 'Language', type: 'dimension' });
		this._vizzuDataTable.series.push({ name: 'Line count', type: 'measure' });
		this._vizzuDataTable.series.push({ name: 'blank', type: 'measure' });
		this._vizzuDataTable.series.push({ name: 'comment', type: 'measure' });
		for(let i = 0; i < this.dirStructureDepth; i++) {
			this._vizzuDataTable.series.push({ name: 'Folder level ' + i, type: 'dimension' });
		}
	}

	preparePathFragments(codeCounterData: Result[]) {
		this._pathFragments = [];
		codeCounterData.forEach(
			({ uri }) => {
				let path = uri.toString();
				let frags = path.split('/');
				let storage = new Array();
				frags.pop();
				frags.splice(0, 3);
				frags.forEach((str) => storage.push(new String(str)));
				this._pathFragments.push(storage);
			}
		);
	}

	removeRedundantPathFragments() {
		let ref = this._pathFragments[0];
		for(let same = true; same;) {
			this._pathFragments.forEach(
				(comp) => {
					if (comp[0] == undefined)
						same = false;
					if (same && ref[0].valueOf() != comp[0].valueOf())
						same = false;
				}
			);
			if (same)
			this._pathFragments.forEach(
					(item) => item.splice(0, 1)
				);
		}
	}

	getDirStructureDepth() {
		let depth = 0;
		this._pathFragments.forEach(
			(frags) => {
				if (frags.length > depth)
					depth = frags.length;
			}
		);
		return depth;
	}

	generatePathSequences() {
		for(let i = 0; i < this._pathFragments.length; i++) {
			let prefix = './';
			let currentDepth = 0;
			var frags = this._pathFragments[i];
			for(let j = 0; j < frags.length; j++) {
				currentDepth++;
				let temp = frags[j];
				frags[j] = new String(prefix + frags[j] + '/');
				if (prefix.length != 0)
					prefix = prefix + temp + '/';
				else
					prefix = temp.valueOf() + '/';
			}
			for(let i = this.dirStructureDepth - currentDepth; i > 0; i--)
				frags.push(new String(prefix));
		}
	}

	getDataTable() {
		return this._vizzuDataTable;
	}
}
