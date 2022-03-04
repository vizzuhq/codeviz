
function anim_init(chart) {

    return chart.animate({
        config: {
            channels: {
                y: { set: ['Language'], range: { min: '0%', max: '100%' } },
                x: { set: ['Line count'], range: { min: '0%', max: '100%' } },
                color: { set: 'Language' },
                label: { set: ['Line count'] }
            },
            legend: null,
            sort: 'none',
            reverse: true,
        },
        style: {
//            fontSize:'1.1em',
            backgroundColor: '#00000000',
            logo: { filter: 'opacity(0)' },
            legend: { width: '9em', marker: { size: '11' }, paddingLeft: '0', paddingRight: '0' },
            plot: {
                paddingLeft: '9em',
                marker: { 
 //                   colorPalette: '#03ae71 #f4941b #f4c204 #d49664 #f25456 #9e67ab rgb(188,166,4) rgb(132,110,28) rgb(252,118,60) rgb(180,98,172) rgb(244,146,252) rgb(188,74,148) rgb(156,126,244) rgb(156,82,180) rgb(108,162,252) rgb(92,110,188) rgb(124,134,140) rgb(172,150,140) rgb(76,116,80) rgb(172,122,76) rgb(124,174,84) rgb(76,116,80) rgb(156,26,108) rgb(172,62,148) rgb(180,18,4)',
                    label: { position: 'right' } 
                },
                yAxis: {
                    color: 'rgba(130,130,130,0.2)',
                    interlacing: { color: 'rgba(126,126,126,0.08)' },
                    label: { paddingRight: '1.2em' },
                    title: { color: 'rgba(130,130,130,0)' }
                },
                xAxis: {
                    color: 'rgba(130,130,130,0.2)',
                    interlacing: { color: 'rgba(126,126,126,0.08)' },
                    label: { paddingTop: '0.9em', angle: 0 }, 
                    title: { paddingTop: '2.2em', color: 'rgba(130,130,130,0)' }
                }
            }
        }
    },
        {
            duration: 1
        })

        .then(chart => {
            chart.feature('tooltip', true);
            return chart;
        })

        ;
}