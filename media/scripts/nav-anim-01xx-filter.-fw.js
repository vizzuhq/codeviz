function nav_anim_01xx_filter_fw(chart, dirLevel) {

    let crDir = 'Folder level ' + (dirLevel - 1);
    let nextDir = 'Folder level ' + dirLevel;

    return chart.animate({
        config: {
            channels: {
                y: { set: ['$count', nextDir], range: { min: '0%', max: '100%' } },
                x: { set: null },
                color: { set: null },
                label: { set: null }
            },
            title: null,
            legend: null
        },
        style: {
            plot: {
                marker: { label: { position: 'top' } },
                xAxis: { label: { angle: -0.7 } }
            }
        }
    },
        { duration: 0.4 }
    )

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: ['$count'], range: { min: '0%', max: '100%' } },
                    x: { set: [nextDir] }
                }
            },
            style: {
                plot: {
                    marker: { label: { position: 'top' } },
                    xAxis: { label: { angle: -0.7, fontSize: '0.7em' } }
                }
            }
        },
            { duration: 0.4 }
        ))

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: ['$count'], range: { min: '0%', max: '100%' } },
                    x: { set: [nextDir] },
                    label: { set: ['$count'] }
                }
            },
            style: {
                plot: {
                    marker: { label: { position: 'top' } },
                    xAxis: { label: { angle: -0.7, fontSize: '0.8em' } }
                }
            }
        },
            { duration: 0.4 }
        ));
}
