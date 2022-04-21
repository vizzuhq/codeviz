function anim_1010_0110(chart) {

    return chart.animate({
        config: {
            channels: {
                y: { set: ['Language'] },
                x: { set: ['Line count'] },
                color: 'Language',
                label: { set: ['Line count'] },
            },
            //  '4 code + types 2',
            legend: null,
            sort: 'byValue',
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
        { duration: 0.1 }
    )

        .then(chart => chart.animate({
            config: {
                channels: {
                    x: { set: ['Line count', 'File name'] },
                    label: null
                },
                //  '5 code + types 3'
            },
            style: {
                plot: {
                    paddingLeft: '9em',
                    yAxis: { label: { paddingRight: '1.2em' } },
                    xAxis: { label: { angle: 0 } }
                }
            }
        },
            { duration: 0.1 }
        ))

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: ['$count', 'File name'] },
                    x: { set: ['Language'] }
                },
                //  '9 File count + types 1',
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
            { duration: 1.6 }
        ))

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: ['$count'] },
                    label: { set: ['$count'] },
                },
                //  '10 File count + types 2',
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
