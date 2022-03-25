function nav_anim_10xx_filter_fw(chart, dirLevel) {

    let crDir = 'Folder level ' + (dirLevel - 1);
    let nextDir = 'Folder level ' + dirLevel;

    return chart.animate({
        config: {
            channels: {
                y: { set: null },
                x: { set: ['Line count', nextDir] },
                color: { set: null },
                label: { set: ['Line count'] }
            },
            legend: null
        },
        style: {
            plot: {
                marker: { label: { position: 'right' } },
                xAxis: { label: { angle: 0 } }
            }
        }
    },
        { duration: 0.3 }
    )

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: [nextDir] },
                    x: { set: ['Line count'] }
                }
            },
            style: {
                plot: {
                    marker: { label: { position: 'right' } },
                    xAxis: { label: { angle: 0 } }
                }
            }
        },
            { duration: 0.6 }
        ))

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: [nextDir] },
                    x: { set: ['Line count'] },
                    label: { set: ['Line count'] }
                },
                title: null
            },
            style: {
                plot: {
                    marker: { label: { position: 'right' } },
                    xAxis: { label: { angle: 0 } }
                }
            }
        },
            { duration: 0.3 }
        ));
}
