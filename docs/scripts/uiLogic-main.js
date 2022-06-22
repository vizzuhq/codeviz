const params = new URLSearchParams(window.location.search);
const project = params.get('project');
const vscode = acquireVsCodeApi(project);
let navChart = undefined;
let infoChart = undefined;

function setTitle(project) {
    const title = project 
    ? `CodeViz demo: ${project}`
    : 'CodeViz demo';

    document.title = title;
    document.getElementById('label_title').innerText = title;
}

setTitle(project);

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
    setBackLabelState(false);
    setBackLabelState(true);
}

async function initializingVizzuCharts(data) {
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
}
