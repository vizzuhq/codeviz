
function nav_anim_init(chart) {

    return chart.animate({
        config: {
            channels: {
                y: { set: ['Folder level 0'] },
                x: { set: ['Line count'], range: { min: '0%', max: '110%' } },
                color: { set: null },
                label: { set: ['Line count'] },
            },
            title: null,
            legend: null
        },
        style: {
//            fontSize:'0.8em',
            backgroundColor: '#00000000',
            logo: { filter: 'opacity(0)' },
            plot: {
                paddingLeft: '6em',
                paddingRight: '2em',
                marker: { 
                    label: { fontSize:'0.8em' }
                },
                yAxis: {
                    color: 'rgba(130,130,130,0.2)',
                    interlacing: { color: 'rgba(126,126,126,0.08)' },
                    label: { fontSize:'0.8em', paddingRight: '1.2em' },
                    title: { color: 'rgba(130,130,130,0)' }
                },
                xAxis: {
                    color: 'rgba(130,130,130,0.2)',
                    interlacing: { color: 'rgba(126,126,126,0.08)' },
                    label: { fontSize:'0.8em', paddingTop: '0.9em', angle: 0 }, 
                    title: { paddingTop: '2.2em', color: 'rgba(130,130,130,0)' }
                }
            },
            title: {
				paddingTop: null,
				paddingBottom: null
			}
        }
    },
        {
            duration: 0.1
        })

        .then(chart => {
            chart.feature('tooltip', true);
            return chart;
        })

        ;
}