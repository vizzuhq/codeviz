function nav_anim_01xx_filter_bw(chart, dirLevel) {

    let crDir = 'Folder level ' + (dirLevel + 1);
    let prevDir = 'Folder level ' + dirLevel;

    return chart.animate({
        config: {
            channels: {
                y: { set: ['$count'], range: {min: '0%', max: '100%' } },
                x: { set: [crDir] },
                label: { set: null }
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
        },
        style: {
            title: {
                paddingTop: null,
                paddingBottom: null
            }
        }
    },
    { duration: 0.3 }
    ));
}
