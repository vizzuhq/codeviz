function anim_1000_0100(chart) {

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
        { duration: 2 }
    );
}
