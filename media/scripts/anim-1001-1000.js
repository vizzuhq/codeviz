function anim_1001_1000(chart) {

    return chart.animate({
        config: {
            channels: {
                y: { set: ['File name'], range: { min: '0%', max: '100%' } },
                x: { set: ['Line count'] },
                label: { set: null },
                color: { detach: ['Language'] }
            },
            title: null, //  '7 code+ Files 1',
            sort: 'byValue',
            legend: null,
            reverse: false,
        },
        style: {
            plot: {
                paddingLeft: '9em',
                yAxis: { label: { fontSize: 0 } },
                xAxis: { label: { angle: 0 } }
            }
        }
    },
        { duration: 0.1 }
    )

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: null, range: { min: '0%', max: '100%' } },
                    x: { set: ['Line count', 'File name'], range: { min: '0%', max: '100%' } },
                    color: { set: null },
                    label: { set: null },
                },
                title: null, //1 code1
                sort: 'byValue'
            },
            style: {
                legend: { paddingLeft: '5.789473684' },
                plot: {
                    paddingLeft: '9em',
                    marker: { label: { position: 'center' } },
                    yAxis: { label: { fontSize: 0, paddingRight: '1.2em' } },
                    xAxis: { label: { angle: 0 } }
                }
            }
        },
            { duration: 2 }
        ))

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: null, range: { min: '0%', max: '100%' } },
                    x: { set: ['Line count'], range: { min: '0%', max: '100%' } },
                    color: { set: null },
                    label: { set: ['Line count'] },
                },
                title: null
            },
            style: {
                legend: { paddingLeft: '5.789473684' },
                plot: {
                    paddingLeft: '9em',
                    marker: { label: { position: 'center' } },
                    yAxis: { label: { fontSize: null, paddingRight: '1.2em' } },
                    xAxis: { label: { angle: 0 } }
                }
            }
        },
            { duration: 0.5 }
        ));
}
