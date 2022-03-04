function anim_1001_0100(chart) {

    return chart.animate({
        config: {
            channels: {
                y: { set: ['File name', 'Language'], range: { min: '0%', max: '100%' } },
                x: { set: ['Line count'] },
                color: { detach: ['Language'] },
                label: { set: null }
            },
            title: null, //  '7 code + Files 1',
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
        { duration: 0.2 }
    )

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: ['$count', 'File name', 'Language'], range: { min: '0%', max: '100%' } },
                    x: { set: null },
                    color: { detach: ['Language'] },
                    label: { set: null }
                },
                title: null, //  '7 code + Files 1',
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
            { duration: 1.8 }
        ))

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: ['$count'], range: { min: '0%', max: '100%' } },
                    x: { set: null },
                    color: { set: null },
                    label: { set: ['$count'] },
                },
                title: null, //  '13 File count 2',
                legend: null
            },
            style: {
                plot: {
                    paddingLeft: '9em',
                    marker: { label: { position: 'center' } },
                    xAxis: { label: { angle: 0 } }
                }
            }
        },
            { duration: 0.2 }
        ));
}
