const vscode = acquireVsCodeApi();
let navChart = undefined;
let infoChart = undefined;

(function () {
    window.addEventListener('message', async event => {
        const message = event.data;
        switch (message.command) {
            case 'refresh-data-table':
                await initializingVizzuCharts(message.dataTable);
                performInitAnimations();
            break;
        }
    });
    importVizzuLibAndCreateCharts();
}());

function importVizzuLibAndCreateCharts() {
    if (navChart == undefined || infoChart == undefined) {
        navChart = undefined;
        infoChart = undefined;
        let promise = import('../../node_modules/vizzu/dist/vizzu.min.js');
        promise.then( (Vizzu) => {
            try {
                navChart = new Vizzu.default('navVizzu');
                infoChart = new Vizzu.default('infoVizzu');
                vscode.postMessage({ command: 'vizzu-ready' });
            }
            catch (e) {
                vscode.postMessage({ command: 'showerror', text: 'Vizzu initialization failure: ' + e });
            }
        }).catch( (e) => {
            vscode.postMessage({ command: 'showerror', text: 'Vizzu library import failure: ' + e });
        });
    }
}

async function initializingVizzuCharts(data) {
    await infoChart
        .initializing
        .then(infoChart => infoChart.animate({data: data}));
    await navChart
        .initializing
        .then(navChart => navChart.animate({data: data}));
    navChart.on('click', onNavChartClick);
}
