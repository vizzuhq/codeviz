const vscode = acquireVsCodeApi();
let navChart = undefined;
let infoChart = undefined;
let Vizzu = undefined;

(function () {
    window.addEventListener('message', async event => {
        const message = event.data;
        switch (message.command) {
            case 'clear-data-table':
                await resetVizzuCharts();
            break;
            case 'refresh-data-table':
                await initializingVizzuCharts(message.dataTable);
                performInitAnimation(message.dataSummary);
                updateInfoLabelsContent(message.dataSummary);
                dirMaxDepth = message.dataSummary.depth;
            break;
        }
    });
    importVizzuLibAndCreateCharts();
}());

function importVizzuLibAndCreateCharts() {
    if (navChart == undefined || infoChart == undefined) {
        navChart = undefined;
        infoChart = undefined;
        let promise = import('https://cdn.jsdelivr.net/npm/vizzu@~0.4.0/dist/vizzu.min.js');
        promise.then( (lib) => {
            try {
                Vizzu = lib;
                vscode.postMessage({ command: 'vizzu-ready' });
            }
            catch (e) {
                vscode.postMessage({ command: 'showerror', text: 'Vizzu initialization failure: ' + e });
            }
        }).catch( (e) => {
            vscode.postMessage({ command: 'showerror', text: 'Vizzu library import failure: ' + e });
        });
    }
    setBackLabelState(false);
    setBackLabelState(true);
}

async function initializingVizzuCharts(data) {
    navChart = new Vizzu.default('navVizzu');
    infoChart = new Vizzu.default('infoVizzu');
    await infoChart
        .initializing
        .then(infoChart => infoChart.animate({data: data}));
    await navChart
        .initializing
        .then(navChart => navChart.animate({data: data}));
    navChart.on('click', performFilteringAnimationFw);
    navChart.on('plot-axis-label-draw', navLabelDrawHandler);
}

async function resetVizzuCharts() {
    await infoChart.animate({data: {}});
    await navChart.animate({data: {}});
    navChart.off('click');
    navChart.off('plot-axis-label-draw');
    let element1 = document.getElementById("navVizzu");
    while (element1.firstChild) {
      element1.removeChild(element1.firstChild);
    }    
    let element2 = document.getElementById("infoVizzu");
    while (element2.firstChild) {
      element2.removeChild(element2.firstChild);
    }    
    vscode.postMessage({ command: 'vizzu-ready' });
}
