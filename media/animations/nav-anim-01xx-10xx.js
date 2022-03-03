function nav_anim_01xx_10xx(chart, dirLevel) {

    return chart.animate({
        config: {
            channels: {
                y: { set: ['Folder level ' + dirLevel], range: { min: '0%', max: '100%' } },
                x: { set: ['Line count'] },
                color: { set: null },
                label: { set: ['Line count'] },
            },
            title: null, //  '13 File count 2',
            legend: null
        },
        style: {
            plot: {
                marker: { label: { position: 'right' } },
                xAxis: { label: { angle: 0 } }
            }
        }
    },
        { duration: 2 }
    );
}
