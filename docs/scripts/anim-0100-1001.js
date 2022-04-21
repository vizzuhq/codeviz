function anim_0100_1001(chart) {

    return chart.animate({
        config: {
            channels: {
                y: { set: ['$count'] },
                x: { set: null },
                color: { set: null },
                label: { set: ['$count'] },
            },
            //  '13 File count 2',
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
    )

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: ['$count', 'Language', 'File name'] },
                    x: { set: null },
                    color: { detach: ['Language'] },
                    label: { set: null }
                },
                //  '7 code + Files 1',
                sort: 'byValue',
                legend: null,
                reverse: false,
            },
            style: {
                plot: {
                    paddingLeft: '9em',
                    yAxis: { label: { color:'#12345600' } },
                    xAxis: { label: { angle: 0 } }
                }
            }
        },
            { duration: 0.2 }
        ))

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: ['Language', 'File name'] },
                    x: { set: ['Line count'] },
                    color: { detach: ['Language'] },
                    label: { set: null }
                },
                //  '7 code + Files 1',
                sort: 'byValue',
                legend: null,
                reverse: false,
            },
            style: {
                plot: {
                    paddingLeft: '9em',
                    yAxis: { label: { color:'#12345600' } },
                    xAxis: { label: { angle: 0 } }
                }
            }
        },
            { duration: 1.8 }
        ));
}
