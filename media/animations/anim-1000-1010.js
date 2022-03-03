function anim_1000_1010(chart) {

    return chart.animate({
        config: {
            channels: {
                y: { set: null, range: { min: '0%', max: '100%' } },
                x: { set: ['Line count'], range: { min: '0%', max: '100%' } },
                color: { set: null },
                label: { set: ['Line count'] },
            },
            title: null, //1 code 1
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
        { duration: 0.1 }
    )

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: null, range: { min: '0%', max: '100%' } },
                    x: { set: ['Language', 'Line count'], range: { min: '0%', max: '100%' } },
                    color: 'Language',
                    label: null
                },
                title: null, // 2 code 2
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
            { duration: 0.5 }
        ))

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: ['Language'], range: { min: '0%', max: '100%' } },
                    x: { set: ['Line count'] },
                    color: 'Language',
                    label: { set: null },
                },
                title: null, // 3 code + types 1
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
            { duration: 2 }
        ))

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: ['Language'], range: { min: '0%', max: '100%' } },
                    x: { set: ['Line count'] },
                    color: 'Language',
                    label: { set: ['Line count'] },
                },
                title: null, //  '4 code + types 2',
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
            { duration: 0.5 }
        ));
}
