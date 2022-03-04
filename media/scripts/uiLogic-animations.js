let state_l = true;
let state_f = false;
let restore_f = false;
let disable_f = false;
let state_lc = false;
let state_fc = false;

let last_state_l = false;
let last_state_f = false;
let last_state_lc = true;
let last_state_fc = false;

function performInitAnimation() {
    disableControls();
    let promise1 = anim_init(infoChart);
    let promise2 = nav_anim_init(navChart);
    Promise.all([promise1, promise2]).then( () => enableControls() );
}

function performAnimation() {
    disableControls();
    let navAnimType = selectNavAnimationType();
    let code = 'let promise1 = ' + makeAnimFunctionName() + '(infoChart);';
    eval(code);
    if (navAnimType == 'switchToLineCount') {
        let code = 'let promise2 = nav_anim_01xx_10xx(navChart, dirFilter.length);';
        eval(code);
    }
    else if (navAnimType == 'switchToFileCount') {
        let code = 'let promise2 = nav_anim_10xx_01xx(navChart, dirFilter.length);';
        eval(code);
    }
    if (promise2 != undefined)
        Promise.all([promise1, promise2]).then( () => enableControls() );
    else
        Promise.all([promise1]).then( () => enableControls());
    updateAnimationVariables();
}

function makeAnimFunctionName() {
    let state = "";
    let lastState = "";
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
    let navAnimationType = 'none';
    if (state_fc && !last_state_fc) {
        navAnimationType = 'switchToFileCount';
        restore_f = state_f;
        state_f = false;
        disable_f = true;
        setFilesChekboxState(true, false);        
    }
    if (!state_fc && last_state_fc) {
        navAnimationType = 'switchToLineCount';
        disable_f = false;
        if (restore_f)
            state_f = true;
        setFilesChekboxState(false, restore_f);
        restore_f = false;
    }
    return navAnimationType;
}

function updateAnimationVariables() {
    last_state_l = state_l;
    last_state_f = state_f;
    last_state_lc = state_lc;
    last_state_fc = state_fc;
}