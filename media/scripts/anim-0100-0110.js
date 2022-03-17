function anim_0100_0110(chart) {

    return chart.animate({
        config: {
            channels: {
                y: { set: ['$count'] },
                x: { set: null },
                color: { set: null },
                label: { set: ['$count'] },
            },//  '13 File count 2',
            legend: null
        },
        style: {
            plot: {
                paddingLeft: '9em',
                marker: { label: { position: 'center' } },
                xAxis: { label: { angle: -0.7 } }
            }
        }
    },
        { duration: 0.1 }
    )

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: ['$count', 'Language', 'File name'] },
                    x: { set: null },
                    label: { set: null },
                    color: { set: ['Language'] }
                },//  '12 File count 1',
                legend: null
            },
            style: {
                plot: {
                    paddingLeft: '9em',
                    marker: { label: { position: 'center' } },
                    xAxis: { label: { angle: -0.7 } }
                }
            }
        },
            { duration: 0.5 }
        ))

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: ['$count', 'File name'] },
                    x: { set: ['Language'] },
                    color: { set: ['Language'] }
                },//  '9 File count + types 1',
                sort: 'byValue',
                legend: null,
                reverse: true,
            },
            style: {
                plot: {
                    paddingLeft: '9em',
                    marker: { label: { position: 'top' } },
                    xAxis: { label: { angle: -0.7 } }
                }
            }
        },
            { duration: 2 }
        ))

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: ['$count'] },
                    x: { set: ['Language'] },
                    label: { set: ['$count'] },
                    color: { set: ['Language'] }
                },
                //  '10 File count + types 2',
                sort: 'byValue',
                legend: null,
                reverse: true,
            },
            style: {
                plot: {
                    paddingLeft: '9em',
                    marker: { label: { position: 'top' } },
                    xAxis: { label: { angle: -0.7 } }
                }
            }
        },
            { duration: 0.5 }
        ));
}
