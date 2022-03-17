function nav_anim_01xx_10xx(chart, dirLevel) {

    return chart.animate({
        config: {
            channels: {
                y: { set: ['Folder level ' + dirLevel] },
                x: { set: ['Line count'] },
                color: { set: null },
                label: { set: ['Line count'] },
            },
            //  '13 File count 2',
            legend: null,
            title: null
        },
        style: {
            plot: {
                marker: { label: { position: 'right' } },
                xAxis: { label: { angle: 0 } }
            },
            title: {
				paddingTop: null,
				paddingBottom: null
			}
        }
    },
        { duration: 2 }
    );
}
