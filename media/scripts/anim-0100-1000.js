function anim_0100_1000(chart) {

    return chart.animate({
        config: {
            channels: {
                y: { set: null },
                x: { set: ['Line count'] },
                color: { set: null },
                label: { set: ['Line count'] },
            },
            //1 code 1
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
