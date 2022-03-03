function anim_1010_0110(chart) {

    return chart.animate({
        config: {
            channels: {
                y: { set: ['Language'], range: { min: '0%', max: '100%' } },
                x: { set: ['Line count'] },
                color: 'Language',
                label: { set: ['Line count'] },
            },
            title: null, //  '4 code + types 2',
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
                    y: { set: ['Language'], range: { min: '0%', max: '100%' } },
                    x: { set: ['Line count', 'File name'] },
                    color: 'Language',
                    label: null
                },
                title: null, //  '5 code + types 3'
                legend: null,
                sort: 'byValue',
            },
            style: {
                plot: {
                    paddingLeft: '9em',
                    yAxis: { label: { fontSize: '0em', paddingRight: '1.2em' } },
                    xAxis: { label: { angle: 0 } }
                }
            }
        },
            { duration: 0.1 }
        ))

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
            { duration: 1.6 }
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
            { duration: 0.5 }
        ));
}
