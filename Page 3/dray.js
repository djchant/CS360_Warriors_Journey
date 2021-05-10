height = 400;
width = 500;

svg1 = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('transform', 'translate(615, 460)')


d3.csv('Dray.csv', function(d) {
    return {
        season: d.Season,
        reb: +d['REB'],
        ast: +d['AST'],
        pts: +d['PTS']
    }
}).then(function(data) {

    //scales
    var xScale = d3.scaleBand()
        .domain(data.map(d => d.season))
        .range([0, width-100])

    var yScale = d3.scaleLinear()
        .domain([0,16])
        .range([height-50, 50])

    g = svg1.append('g')
        .attr('transform', 'translate(20,20)')

    //lines
    g.append('path')
        .datum(data)
        .attr('class', 'pts')
        .attr('d', d3.line()
            .x(d => xScale(d.season))
            .y(d => yScale(d.pts)))
        .attr('transform', 'translate(25,-30)')

    g.append('path')
        .datum(data)
        .attr('class', 'ast')
        .attr('d', d3.line()
            .x(d => xScale(d.season))
            .y(d => yScale(d.ast)))
        .attr('transform', 'translate(25,-30)')

    g.append('path')
        .datum(data)
        .attr('class', 'reb')
        .attr('d', d3.line()
            .x(d => xScale(d.season))
            .y(d => yScale(d.reb)))
        .attr('transform', 'translate(25,-30)');



    //axis
    g.append('g')
        .attr('transform', 'translate(0,' + (height-80) + ')')
        .call(d3.axisBottom(xScale))

    g.append('g')
        .attr('transform', 'translate(0,' + (-30) + ')')
        .call(d3.axisLeft(yScale))

    g.append('text')
        .text('Season')
        .attr('x', 180)
        .attr('y', height - 30)

    //legend-circles
    g.append('circle')
        .attr('cx', 340)
        .attr('cy', 250)
        .attr('r', 5)
        .style('fill', 'black')

    g.append('circle')
        .attr('cx', 340)
        .attr('cy', 265)
        .attr('r', 5)
        .attr('fill', '#FFC72C')

    g.append('circle')
        .attr('cx', 340)
        .attr('cy', 280)
        .attr('r', 5)
        .attr('fill', '#006BB6')

    //legend-text
    g.append('text')
        .text('Points')
        .attr('x', 350)
        .attr('y', 255)

    g.append('text')
        .text('Rebounds')
        .attr('x', 350)
        .attr('y', 270)

    g.append('text')
        .text('Assists')
        .attr('x', 350)
        .attr('y', 285)
})