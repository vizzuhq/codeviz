function anim_0100_1000(chart) {

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
        { duration: 2 }
    );
}
