function nav_anim_01xx_filter_bw(chart, dirLevel) {

    let crDir = 'Folder level ' + (dirLevel + 1);
    let prevDir = 'Folder level ' + dirLevel;

    return chart.animate({
        config: {
            channels: {
                y: { set: ['$count'] },
                x: { set: [crDir] },
                label: { set: ['$count'] }
            },
            legend: null
        }},
        { duration: 0.3 }
    )

    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: ['$count', crDir ] }, 
                x: { set: null }
            }
        }
    },
    { duration: 1 }
    ))

    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: ['$count'] }, 
                x: { set: prevDir }
            }
        }
    },
    { duration: 0.3 }
    ))

    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: ['$count'] }, 
                x: { set: [prevDir] },
                label: { set: ['$count'] }
            },
            title: null
        }
    },
    { duration: 0.3 }
    ));
}
