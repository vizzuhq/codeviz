function anim_1010_1000(chart) {

    return chart.animate({
        config: {
            channels: {
                y: { set: ['Language'] },
                x: { set: ['Line count'] },
                color: 'Language',
                label: { set: ['Line count'] },
            },
            //  '4 code + types 2',
            sort: 'byValue',
            reverse: false,
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
                    y: { set: ['Language'] },
                    x: { set: ['Line count'] },
                    color: 'Language',
                    label: { set: null },
                },
                // 3 code + types 1
                sort: 'byValue',
                reverse: false,
            },
            style: {
                plot: {
                    paddingLeft: '9em',
                    marker: { label: { position: 'right' } },
                    xAxis: { label: { angle: 0 } }
                }
            }
        },
            { duration: 0.5 }
        ))

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: null },
                    x: { set: ['Language', 'Line count'] },
                    color: 'Language',
                    label: null
                },
                // 2 code 2
                sort: 'byValue',
                legend: null
            },
            style: {
                plot: {
                    paddingLeft: '9em',
                    marker: { label: { position: 'center' } },
                    yAxis: { label: { paddingRight: '1.2em' } },
                    xAxis: { label: { angle: 0 } }
                }
            }
        },
            { duration: 2 }
        ))

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: null },
                    x: { set: ['Line count'] },
                    color: { set: null },
                    label: { set: ['Line count'] },
                },
                //1 code 1
            },
            style: {
                legend: { paddingLeft: '5.789473684' },
                plot: {
                    paddingLeft: '9em',
                    marker: { label: { position: 'center' } },
                    yAxis: { label: { paddingRight: '1.2em' } },
                    xAxis: { label: { angle: 0 } }
                }
            }
        },
            { duration: 0.5 }
        ));
}
