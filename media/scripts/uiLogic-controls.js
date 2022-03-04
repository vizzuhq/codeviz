function disableControls() {
}

function enableControls() {
}

function onNavChartClick() {
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