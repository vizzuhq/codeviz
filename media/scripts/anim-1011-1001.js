function anim_1011_1001(chart) {

    return chart.animate({
        config: {
            channels: {
                y: { set: ['Language', 'File name'] },
                x: { set: ['Line count'] },
                color: { set: ['Language'] }
            },
            //  '8 code + types + Files 2',
            sort: 'none',
            legend: 'color',
            reverse: true,
        },
        style: {
            plot: {
                paddingLeft: '0em',
                yAxis: { label: { color:'#12345600' } },
                xAxis: { label: { angle: 0 } }
            }
        }
    },
        { duration: 0.1 }
    )

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
            { duration: 2 }
        ));
}
