function nav_anim_01xx_filter_fw(chart, dirLevel) {

    let crDir = 'Folder level ' + (dirLevel - 1);
    let nextDir = 'Folder level ' + dirLevel;

    return chart.animate({
        config: {
            channels: {
                y: { set: ['$count', nextDir] },
                x: { set: null },
                color: { set: null },
                label: { set: ['$count'] }
            },
            legend: null
        },
        style: {
            plot: {
                marker: { label: { position: 'top' } },
                xAxis: { label: { angle: -0.7 } }
            }
        }
    },
        { duration: 0.3 }
    )

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: ['$count'] },
                    x: { set: [nextDir] }
                }
            },
            style: {
                plot: {
                    marker: { label: { position: 'top' } },
                    xAxis: { label: { angle: -0.7 } }
                }
            }
        },
            { duration: 0.6 }
        ))

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: ['$count'] },
                    x: { set: [nextDir] },
                    label: { set: ['$count'] }
                },
                title: null
            },
            style: {
                plot: {
                    marker: { label: { position: 'top' } },
                    xAxis: { label: { angle: -0.7 } }
                }
            }
        },
            { duration: 0.3 }
        ));
}
