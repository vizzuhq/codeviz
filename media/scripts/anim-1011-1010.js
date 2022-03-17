function anim_1011_1010(chart) {

    return chart.animate({
        config: {
            channels: {
                y: { set: ['Language'] },
                x: { set: ['Line count', 'File name'] },
                color: 'Language',
                label: null
            },
            //  '5 code + types 3'
            legend: null,
            reverse: false,
            sort: 'byValue'
        },
        style: {
            plot: {
                paddingLeft: '9em',
                yAxis: { label: { color: '#12345600', paddingRight: '1.2em' } },
                xAxis: { label: { angle: 0 } }
            }
        }
    },
        { duration: 2 }
    )

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: ['Language'] },
                    x: { set: ['Line count'] },
                    color: 'Language',
                    label: { set: ['Line count'] },
                },
                //  '4 code + types 2',
                legend: null,
                reverse: false,
                sort: 'byValue'
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
