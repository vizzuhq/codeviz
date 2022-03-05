let inTransientState = false;
let navAnimationType = 'empty';
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
    let code = 'promise1 = ' + encodeAnimFunctionName() + '(infoChart);';
    eval(code);
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
    updateAnimationVariables();
}

function performFilteringAnimationFw(event) {
    if (event.data.marker != undefined) {
        if (dirMaxDepth > dirFilter.length) {
            setBackLabelState(false);
            let level = dirFilter.length;
            let levelStr = 'Folder level ' + level.toString();
            let filterStr = event.data.marker.categories[levelStr];
            dirFilter.push(filterStr);
            applyFilterFw();
        }
        else
            vscode.postMessage({ command: 'showinfo', text: 'No more folder under this level!' });
    }
}

function performFilteringAnimationBw() {
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
