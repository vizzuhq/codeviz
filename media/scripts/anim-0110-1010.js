function anim_0110_1010(chart) {

    return chart.animate({
        config: {
            channels: {
                y: { set: ['$count'], range: { min: '0%', max: '100%' } },
                x: { set: ['Language'] },
                color: { set: ['Language'] },
                label: { set: ['$count'] },
            },
            //  '10 File count + types 2',
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
        { duration: 0.1 }
    )

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: ['$count', 'File name'], range: { min: '0%', max: '100%' } },
                    x: { set: ['Language'] },
                    label: { set: null },
                },
                //  '11 File count + type 3',
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
            { duration: 0.1 }
        ))

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: ['Language'], range: { min: '0%', max: '100%' } },
                    x: { set: ['Line count', 'File name'] },
                    color: 'Language',
                    label: null,

                },
                //  '5 code + types 3'
                legend: null,
                sort: 'byValue',
                reverse: false
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
            { duration: 1.6 }
        ))

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: ['Language'], range: { min: '0%', max: '100%' } },
                    x: { set: ['Line count'] },
                    color: 'Language',
                    label: { set: ['Line count'] },
                },
                //  '4 code + types 2',
                legend: null,
                sort: 'byValue',
                reverse: false
            },
            style: {
                plot: {
                    paddingLeft: '9em',
                    marker: { label: { position: 'right' } },
                    yAxis: { label: { fontSize: '1em', paddingRight: '1.2em' } },
                    xAxis: { label: { angle: 0 } }
                }
            }
        },
            { duration: 0.5 }
        ));
}
