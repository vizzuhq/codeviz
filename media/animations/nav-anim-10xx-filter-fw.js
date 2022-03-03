function nav_anim_10xx_filter_fw(chart, dirLevel) {

    let crDir = 'Folder level ' + (dirLevel - 1);
    let nextDir = 'Folder level ' + dirLevel;

    return chart.animate({
        config: {
            channels: {
                y: { set: null, range: { min: '0%', max: '100%' } },
                x: { set: ['Line count', nextDir] },
                color: { set: null },
                label: { set: null }
            },
            title: null,
            legend: null
        },
        style: {
            plot: {
                marker: { label: { position: 'right' } },
                xAxis: { label: { angle: 0 } }
            }
        }
    },
        { duration: 0.4 }
    )

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: [nextDir], range: { min: '0%', max: '100%' } },
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
            { duration: 0.4 }
        ))

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: [nextDir], range: { min: '0%', max: '100%' } },
                    x: { set: ['Line count'] },
                    label: { set: ['Line count'] }
                }
            },
            style: {
                plot: {
                    marker: { label: { position: 'right' } },
                    xAxis: { label: { angle: 0 } }
                }
            }
        },
            { duration: 0.4 }
        ));
}
