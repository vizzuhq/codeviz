const vscode = acquireVsCodeApi();
let navChart = undefined;
let infoChart = undefined;

window.addEventListener("load", main);

function main() {
    vscode = acquireVsCodeApi();
    window.addEventListener('message', event => {
        const message = event.data;
        switch (message.command) {
            case 'prepare-charts':
                importAndInitializeVizzu();
            break;
        }
    });
}

function onBackClick() {
    vscode.postMessage({ command: 'showinfo', text: 'aaaaaaaaaa' });
}

function importAndInitializeVizzu() {
    vscode.postMessage({ command: 'showinfo', text: 'aaaaaaaaaa' });
    let promise = import('../node_modules/vizzu/dist/vizzu.min.js');
    promise.then( (Vizzu) => {
        try {
            navChart = new Vizzu.default('navVizzu');
            infoChart = new Vizzu.default('infoVizzu');
        }
        catch (e) {
            vscode.postMessage({ command: 'showerror', text: 'Vizzu init failure: ' + e });
        }
    }).catch( (e) => {
        vscode.postMessage({ command: 'showerror', text: 'Vizzu import failure: ' + e });
    });
}