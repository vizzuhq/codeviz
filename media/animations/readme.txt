Data series names:
    Old             New
    ---------------------
    Line count      code
    Languages       type
    File name       file


10xx = Line count
01xx = File count

10xx-01xx = Line count 2 File count

File tetején= chart, dirLevel



Control state transitions:
    1000-1001 Line count + Files (Final 6)
    1001-1000 Line count - Files (Final 6)

    1001-1011 Line count, Files + Languages (Final 5)
    1011-1001 Line count, Files - Languages (Final 5)

    1011-1010 Line count, Files, Languages - Files (Final 4)
    1010-1011 Line count, Languages + Files (Final 4)

    1010-1000 Line count, Languages - Languages (Final 3)
    1000-1010 Line count + Languages (Final 3)

    1000-0100 Line count <-> File count (Final 1)
    0100-1000 File count <-> Line count (Final 1)

    0100-0110 File count + Languages (Final 2)
    0110-0100 File count, Languages - Languages (Final 2)

    0110-1010 File count, Languages <-> Line count (Final 7)
    1010-0110 Line count, Languages <-> File count (Final 7)

    0100-1001 File count <-> Line count + Files (Final 9)
    1001-0100 Line count, Files <-> File count - Files (Final 9)

    1011-0110 Line count, Languages, Files <-> File count - Files (Final 8)
    0110-1011 File count, Languages <-> Line count + Files (Final8)




Animation with one step:
    chart.animate({
        config: {
            ...
        },
        style: {
            ...
        }},
        { duration: 1 }
    );

Animation with two steps:
    chart.animate({
        config: {
            ...
        },
        style: {
            ...
        }},
        { duration: 1 }
    )
    .then(chart => chart.animate({
        config: {
            ...
        },
        style: {
            ...
        }},
        { duration: 1 }
    ))
    .then(chart => chart.animate({
        config: {
            ...
        },
        style: {
            ...
        }},
        { duration: 1 }
    ))
    .then(chart => chart.animate({
        config: {
            ...
        },
        style: {
            ...
        }},
        { duration: 1 }
    ))   
    ;
}
