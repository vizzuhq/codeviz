let inTransientState = false;
let navAnimationType = 'initial';
let state_f_disabled = false;
let state_f_restore = false;

let state_l = true;
let state_f = false;
let state_lc = true;
let state_fc = false;

let last_state_l = true;
let last_state_f = false;
let last_state_lc = true;
let last_state_fc = false;

let dirFilter = [];
let dirMaxDepth = 0;
let databaseFileCount = 0;
let paralellAnimLimit = 1500;
let currentDirectory = 'workspace';
let statusBarTimer = null;
let progressTimer = null;
let progressState = 0;
let delayBeforeProgress = 4000;

function busyPromise(fn) {
    let _resolve;
    let timeout;
    let promise = new Promise((resolve, reject) => {
        _resolve = resolve;
        timeout = setTimeout(() => {}, 10000);
    });
    return {
        promise,
        exec(ready) {
            fn().then(() => {
                if (ready != undefined)
                    ready();
                clearTimeout(timeout);
                timeout = null;
                _resolve();
            });
        }
    };
};

function performInitAnimation(info) {
    if (!enterTransientState())
        return;
    let promise1 = anim_init(infoChart);
    let promise2 = nav_anim_init(navChart);
    databaseFileCount = info.files;
    Promise.all([promise1, promise2]).then( () => leaveTransientState() );
}

function performAnimation() {
    if (!enterTransientState())
        return;
    navAnimationType = selectNavAnimationType();
    if (databaseFileCount < paralellAnimLimit)
        paralellAnim();
    else
        serialAnim();
    updateAnimationVariables();
}

function performFilteringAnimationFw(event) {
    navAnimationType = 'navFw';
    if (event.data.marker != undefined) {
        if (dirMaxDepth > dirFilter.length) {
            let level = dirFilter.length;
            let levelStr = 'Folder level ' + level.toString();
            let filterStr = event.data.marker.categories[levelStr];
            currentDirectory = 'workspace' + filterStr.substring(1);
            setBackLabelState(false);
            if (dirFilter[dirFilter.length - 1] == filterStr) {
                vscode.postMessage({ command: 'showinfo', text: 'No more folder under this level!' });
                enableControls();
            }
            else {    
                dirFilter.push(filterStr);
                applyFilterFw();
                vscode.postMessage({ command: 'showinexplorer', text: filterStr });
            }
        }
        else
            vscode.postMessage({ command: 'showinfo', text: 'No more folder under this level!' });
    }
}

function performFilteringAnimationBw() {
    navAnimationType = 'navBw';
    if (dirFilter.length > 0) {
        enterTransientState();
        if (dirMaxDepth > dirFilter.length) {
            if (state_lc)
                nav_anim_10xx_filter_bw(navChart, dirFilter.length - 1).then(() => {
                    applyFilterBw();
                });
            else
                nav_anim_01xx_filter_bw(navChart, dirFilter.length - 1).then(() => {
                    applyFilterBw();
                });
        }
        else {
            applyFilterBw();
        }
    }
}

function startProgressIndication() {
    statusBarTimer = setTimeout(() => {
        statusBarTimer = null;
        progressTimer = setInterval(() => {
            let msg = {
                command: 'statusbarmsg',
                text: 'CodeViz animation is in progress',
                timeout: 310
            };
            if (progressState == 0)
                msg.text += '.'
            if (progressState == 1)
                msg.text += '..'
            if (progressState == 2)
                msg.text += '...'
            vscode.postMessage(msg);
            progressState++;
            if (progressState == 3)
                progressState = 0;
        }, 300);
    }, delayBeforeProgress);
}

function stopProgressIndication() {
    if (progressTimer != null)
        clearTimeout(progressTimer);
    progressTimer = null;
    if (statusBarTimer != null) {
        clearTimeout(statusBarTimer);
    }
    else {
        vscode.postMessage({
            command: 'statusbarmsg',
            text: 'CodeViz is ready.',
            timeout: 2000 });
    }
}

function enterTransientState() {
    if (inTransientState)
        return false;
    disableControls();
    inTransientState = true;
    startProgressIndication();
    return true;
}

function leaveTransientState() {
    if (!inTransientState)
        return false;
    enableControls();
    if (navAnimationType == 'switchToLineCount')
        setFilesChekboxState(false, state_f_restore);
    if (state_f_disabled)
        setFilesChekboxState(true, false);
    inTransientState = false;
    stopProgressIndication();
    return true;
}

function encodeAnimFunctionName() {
    let state = '';
    let lastState = '';
    state += state_lc ? '1' : '0';
    state += state_fc ? '1' : '0';
    state += state_l ? '1' : '0';
    state += state_f ? '1' : '0';
    lastState += last_state_lc ? '1' : '0';
    lastState += last_state_fc ? '1' : '0';
    lastState += last_state_l ? '1' : '0';
    lastState += last_state_f ? '1' : '0';
    return 'anim_' + lastState + '_' + state;
}

function selectNavAnimationType() {
    let type = 'none';
    if (state_fc == true && last_state_fc == false) {
        type = 'switchToFileCount';
        state_f_disabled = true;
        state_f_restore = state_f;
        state_f = false;
    }
    if (state_fc == false && last_state_fc == true) {
        type = 'switchToLineCount';
        state_f = state_f_restore;
        state_f_disabled = false;
    }
    return type;
}

function updateAnimationVariables() {
    last_state_l = state_l;
    last_state_f = state_f;
    last_state_lc = state_lc;
    last_state_fc = state_fc;
}

function applyFilter() {
    let filter1 = busyPromise(() => {
        return nav_anim_record_filter(infoChart, (record) => selectRecord(record));
    });
    let filter2 = busyPromise(() => {
        return nav_anim_record_filter(navChart, (record) => selectRecord(record));
    });
    // always paralell
    if (true || databaseFileCount < paralellAnimLimit) {
        filter1.exec();
        filter2.exec();
    }
    else {
        filter1.exec(() => {
            filter2.exec();
        });
    }
    return [ filter1, filter2 ];
}

function applyFilterFw() {
    enterTransientState();
    let promises = applyFilter();
    Promise.all([promises[0].promise, promises[1].promise]).then(() => {
        if (dirMaxDepth > dirFilter.length) {
            if (state_lc)
                nav_anim_10xx_filter_fw(navChart, dirFilter.length).then(() => leaveTransientState());
            else
                nav_anim_01xx_filter_fw(navChart, dirFilter.length).then(() => leaveTransientState());
        }
        else
            leaveTransientState();
    });
}

function applyFilterBw() {
    let filterStr = '';
    dirFilter.pop();
    if (dirFilter == 0)
        setBackLabelState(true);
    else {
        filterStr = dirFilter[dirFilter.length - 1];
        currentDirectory = 'workspace' + filterStr.substring(1);
        setBackLabelState(false);
    }
    let promises = applyFilter();
    Promise.all([promises[0].promise, promises[1].promise]).then(() => {
        leaveTransientState();
        if (filterStr != '') {
            vscode.postMessage({ command: 'showinexplorer', text: filterStr });
        }
    });
}

function selectRecord(record) {
    for(let i = 0; i < dirFilter.length; i++) {
        let name = 'Folder level ' + i;
        let value = dirFilter[i];
        if (record[name] != value)
            return false;
    }
    return true;
}

function navLabelDrawHandler(event) {
    let tmp = [];
    let label = event.data.text;
    if (label == dirFilter[dirFilter.length - 1])
        label =  './';
    else
        tmp = label.split('/');
    if (tmp.length >= 2)
        label = tmp[tmp.length - 2];
    if (label == '.')
        label = './';
    let textRect = event.renderingContext.measureText(label);
    let height = textRect.actualBoundingBoxAscent;
    event.renderingContext.fillText(label,
        event.data.rect.pos.x + event.data.rect.size.x - textRect.width,
        event.data.rect.pos.y + event.data.rect.size.y - height / 2);
  	event.preventDefault();
}

function paralellAnim() {
    let promise1 = Promise.resolve();
    if (navAnimationType == 'switchToLineCount') {
        promise1 = nav_anim_01xx_10xx(navChart, dirFilter.length);
    }
    else if (navAnimationType == 'switchToFileCount') {
        promise1 = nav_anim_10xx_01xx(navChart, dirFilter.length);
    }
    let promise2 = window[encodeAnimFunctionName()](infoChart);
    Promise.all([promise1, promise2]).then(() => {
        leaveTransientState();
        if (navAnimationType == 'switchToLineCount')
            state_f_restore = false;
    });    
}

function serialAnim() {
    let fnName = encodeAnimFunctionName();
    if (navAnimationType == 'switchToLineCount') {
        nav_anim_01xx_10xx(navChart, dirFilter.length).then(() => {
            window[fnName](infoChart).then(() => {
                leaveTransientState();
                state_f_restore = false;
            });
        });
    }
    else if (navAnimationType == 'switchToFileCount') {
        nav_anim_10xx_01xx(navChart, dirFilter.length).then(() => {
            window[fnName](infoChart).then(() => {
                leaveTransientState();
            });
        });
    }
    else {
        window[fnName](infoChart).then(() => {
            leaveTransientState();
        });
    }
}
