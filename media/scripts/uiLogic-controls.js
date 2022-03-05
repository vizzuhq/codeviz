let backLabelDisabled = true;

function allDescendants(node, fn) {
    if (node == undefined || fn == undefined)
        return;
    for (var i = 0; i < node.childNodes.length; i++) {
      var child = node.childNodes[i];
      allDescendants(child, fn);
      fn(child);
    }
}

function disableControls() {
    let ctrlDiv = document.getElementById("idControlDiv");
    allDescendants(ctrlDiv, function(child) {
        child.disabled = true;
    });
}

function enableControls() {
    let ctrlDiv = document.getElementById("idControlDiv");
    allDescendants(ctrlDiv, function(child) {
        if (child.id == 'idBackLabel') {
            child.disabled = backLabelDisabled;
        }
        child.disabled = false;
    });
}

function onDisplayTypeChanged() {
    readAnimationVariables();
    performAnimation();
}

function onLabelBack() {
    performFilteringAnimationBw();
}

function onLabelShowFiles() {
}

function onCheckboxLanguages() {
    readAnimationVariables();
    performAnimation();
}

function onCheckboxFiles() {
    readAnimationVariables();
    performAnimation();
}

function onLabelShowFiles() {
}

function onCheckboxSelectFolder() {
}

function updateInfoLabelsContent(info) {
    let lines = info.codeCount + info.blankCount + info.commentCount;
    const date_label =  (document.getElementById('label_date'));
    const dir_label =  (document.getElementById('label_dir'));
    const files_label =  (document.getElementById('label_files'));
    const lines_label =  (document.getElementById('label_lines'));
    const code_label =  (document.getElementById('label_code'));
    const comment_label = (document.getElementById('label_comment'));
    const blank_label =  (document.getElementById('label_blank'));
    date_label.textContent = info.date;
    dir_label.textContent = info.rootDir;
    files_label.textContent = info.files.toString();
    lines_label.textContent = lines.toString();
    code_label.textContent = info.codeCount.toString();
    comment_label.textContent = info.commentCount.toString();
    blank_label.textContent = info.blankCount.toString();
}

function readAnimationVariables() {
    const ctrl1 = document.getElementById('idLineCount');
    state_lc = ctrl1.selected;
    const ctrl2 = document.getElementById('idFileCount');
    state_fc = ctrl2.selected;
    const ctrl3 = (document.getElementById('idChkBoxFiles'));
    state_f = ctrl3.checked;
    const ctrl4 = (document.getElementById('idChkBoxLang'));
    state_l = ctrl4.checked;
}

function setFilesChekboxState(disabled, checked) {
    const ctrl = (document.getElementById('idChkBoxFiles'));
    ctrl.disabled = disabled;
    ctrl.checked = checked;
}

function setBackLabelState(disabled) {
    const ctrl = (document.getElementById('idBackLabel'));
    ctrl.disabled = disabled;
    if (disabled)
        ctrl.textContent = 'Click on folder below to open!';
    else
        ctrl.textContent = 'Click here to step back!';
    backLabelDisabled = disabled;
}