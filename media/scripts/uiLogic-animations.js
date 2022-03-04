function performInitAnimations() {
    disableControls();
    let promise1 = anim_init(infoChart);
    let promise2 = nav_anim_init(navChart);
    Promise.all([promise1, promise2]).then(enableControls());
}
