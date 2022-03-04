function nav_anim_10xx_filter_bw(chart, dirLevel) {

    let crDir = 'Folder level ' + (dirLevel + 1);
    let prevDir = 'Folder level ' + dirLevel;

    return chart.animate({
        config: {
            channels: {
                y: { set: [crDir] }, 
                x: { set: ['Line count'] },
                label: { set: null }
            }
        }},
        { duration: 0.4 }
    )

    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: null }, 
                x: { set: ['Line count', crDir] }
            }
        }
    },
    { duration: 0.4 }
    ))

    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: [prevDir] }, 
                x: { set: ['Line count'] }
            }
        },
        style: {
            plot: {
                xAxis: { label: { fontSize: '1em' } }
            }
        }
    },
    { duration: 0.4 }
    ))

    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: [prevDir] }, 
                x: { set: ['Line count'] }
            },
            label: { set: ['Line count'] }
        }
    },
    { duration: 0.4 }
    ));
}
