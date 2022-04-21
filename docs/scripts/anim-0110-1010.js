function anim_0110_1010(chart) {

    return chart.animate({
        config: {
            channels: {
                y: { set: ['$count'] },
                x: { set: ['Language'] },
                color: { set: ['Language'] },
                label: { set: ['$count'] },
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
        { duration: 0.1 }
    )

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: ['$count', 'File name'] },
                    label: { set: null },
                },
                //  '11 File count + type 3',
            },
            style: {
                plot: {
                    paddingLeft: '9em',
                    marker: { label: { position: 'top' } },
                    xAxis: { label: { angle: -0.7 } }
                }
            }
        },
            { duration: 0.1 }
        ))

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: ['Language'] },
                    x: { set: ['Line count', 'File name'] }
                },
                //  '5 code + types 3'
                reverse: false
            },
            style: {
                plot: {
                    paddingLeft: '9em',
                    marker: { label: { position: 'right' } },
                    yAxis: { label: { paddingRight: '1.2em' } },
                    xAxis: { label: { angle: 0 } }
                }
            }
        },
            { duration: 1.6 }
        ))

        .then(chart => chart.animate({
            config: {
                channels: {
                    x: { set: ['Line count'] },
                    label: { set: ['Line count'] },
                },
                //  '4 code + types 2',
            },
            style: {
                plot: {
                    paddingLeft: '9em',
                    marker: { label: { position: 'right' } },
                    yAxis: { label: { color: null, paddingRight: '1.2em' } },
                    xAxis: { label: { angle: 0 } }
                }
            }
        },
            { duration: 0.5 }
        ));
}
