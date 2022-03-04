function nav_anim_record_filter(chart, filterFn) {
    return chart.animate({
		data: {
			filter: record => filterFn(record)
		}
    },
    { duration: 0.5 });
}
