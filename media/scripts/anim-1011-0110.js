function anim_1011_0110(chart) {

    return chart.animate({
        config: {
            channels: {
                y: { set: ['Language', 'File name'], range: { min: '0%', max: '100%' } },
                x: { set: ['Line count'] },
                color: { set: ['Language'] }
            },
            title: null, //  '6 code + types + Files 1',
            legend: 'color',
            sort: 'none',
            reverse: true,
        },
        style: {
            plot: {
                paddingLeft: '0em',
                yAxis: { label: { fontSize: '0em' } },
                xAxis: { label: { angle: 0 } }
            }
        }
    },
        { duration: 0.2 }
    )

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: ['$count', 'File name'], range: { min: '0%', max: '110%' } },
                    x: { set: ['Language'] },
                    color: { set: ['Language'] }
                },
                title: null, //  '9 File count + types 1',
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
            { duration: 1.8 }
        ))

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: ['$count'], range: { min: '0%', max: '110%' } },
                    x: { set: ['Language'] },
                    color: { set: ['Language'] },
                    label: { set: ['$count'] },
                },
                title: null, //  '10 File count + types 2',
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
            { duration: 0.2 }
        ));
}
