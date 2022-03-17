function anim_1000_1001(chart) {

    return chart.animate({
        config: {
            channels: {
                y: { set: null },
                x: { set: ['Line count', 'File name'] },
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
                yAxis: { label: { color:'#12345600', paddingRight: '1.2em' } },
                xAxis: { label: { angle: 0 } }
            }
        }
    },
        { duration: 0.5 }
    )

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: ['File name'] },
                    x: { set: ['Line count'] },
                    label: { set: null },
                    color: { detach: ['Language'] }
                },
                //  '7 code+ Files 1',
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
            { duration: 2 }
        ));
}
