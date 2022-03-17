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

function performInitAnimation() {
    if (!enterTransientState())
        return;
    let promise1 = anim_init(infoChart);
    let promise2 = nav_anim_init(navChart);
    Promise.all([promise1, promise2]).then( () => leaveTransientState() );
}

function performAnimation() {
    if (!enterTransientState())
        return;
    let promise1 = Promise.resolve();
    let promise2 = Promise.resolve();
    navAnimationType = selectNavAnimationType();
 //   let code = 'promise1 = ' + encodeAnimFunctionName() + '(infoChart);';
 //   eval(code);
    promise1=window[encodeAnimFunctionName()](infoChart);
 //   paralellAnim(promise1);
    serialAnim(promise1);
    updateAnimationVariables();
}

function performFilteringAnimationFw(event) {
    navAnimationType = 'navFw';
    if (event.data.marker != undefined) {
        if (dirMaxDepth > dirFilter.length) {
            setBackLabelState(false);
            let level = dirFilter.length;
            let levelStr = 'Folder level ' + level.toString();
            let filterStr = event.data.marker.categories[levelStr];
            if (dirFilter[dirFilter.length - 1] == filterStr)
                vscode.postMessage({ command: 'showinfo', text: 'No more folder under this level!' });
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

function enterTransientState() {
    if (inTransientState)
        return false;
    disableControls();
    inTransientState = true;
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

function applyFilterFw() {
    enterTransientState();
    let promise1 = nav_anim_record_filter(infoChart, (record) => selectRecord(record));
    let promise2 = nav_anim_record_filter(navChart, (record) => selectRecord(record));
    Promise.all([promise1, promise2]).then(() => {
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
    dirFilter.pop();
    if (dirFilter == 0)
        setBackLabelState(true);
    let promise1 = nav_anim_record_filter(infoChart, (record) => selectRecord(record));
    let promise2 = nav_anim_record_filter(navChart, (record) => selectRecord(record));
    Promise.all([promise1, promise2]).then(() => {
        leaveTransientState();
        let filterStr = dirFilter[dirFilter.length - 1];
        vscode.postMessage({ command: 'showinexplorer', text: filterStr });
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

function paralellAnim(promise1) {
    let promise2 = Promise.resolve();
    if (navAnimationType == 'switchToLineCount') {
        promise2 = nav_anim_01xx_10xx(navChart, dirFilter.length);
    }
    else if (navAnimationType == 'switchToFileCount') {
        promise2 = nav_anim_10xx_01xx(navChart, dirFilter.length);
    }
    Promise.all([promise1, promise2]).then(() => {
        leaveTransientState();
        if (navAnimationType == 'switchToLineCount')
            state_f_restore = false;
    });
}

function serialAnim(promise1) {
    Promise.all([promise1]).then(() => {
        if (navAnimationType == 'switchToLineCount') {
            nav_anim_01xx_10xx(navChart, dirFilter.length).then(() => {
                leaveTransientState();
                state_f_restore = false;
            });
        }
        else if (navAnimationType == 'switchToFileCount') {
            nav_anim_10xx_01xx(navChart, dirFilter.length).then(() => {
                leaveTransientState();
            });
        }
        else
            leaveTransientState();
    });
}
