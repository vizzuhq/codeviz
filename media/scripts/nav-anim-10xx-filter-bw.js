function nav_anim_10xx_filter_bw(chart, dirLevel) {

    let crDir = 'Folder level ' + (dirLevel + 1);
    let prevDir = 'Folder level ' + dirLevel;

    return chart.animate({
        config: {
            channels: {
                y: { set: [crDir] }, 
                x: { set: ['Line count'] },
                label: { set: ['Line count'] }
            }
        }},
        { duration: 0.3 }
    )

    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: null }, 
                x: { set: ['Line count', crDir] }
            }
        }
    },
    { duration: 1 }
    ))

    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: [prevDir] }, 
                x: { set: ['Line count'] }
            }
        }
    },
    { duration: 0.3 }
    ))

    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: [prevDir] }, 
                x: { set: ['Line count'] },
                label: { set: ['Line count'] }
            },
            title: null  
        }
    },
    { duration: 0.3 }
    ));
}
