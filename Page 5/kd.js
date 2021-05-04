height = 500
width = 750
padding = 60

svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('transform', 'translate(745,400)')

var div = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style('visibility', 'hidden');

d3.csv('kd_graph.csv', function(d) {
    return {
        players: d.Player,
        points: +d['PTS'],
        perc: +d['TS%'],
        year: +d.Year,
        team: d.Team
    }
}).then(function(data) {
    var xScale = d3.scaleLinear()
        .domain([20, 40])
        .range([0, width - (padding * 5)])

    var yScale = d3.scaleLinear()
        .domain([0.5, 0.7])
        .range([height - padding, padding * 2])

    g = svg.append('g')
        .attr('transform', 'translate(100,0)')

    g.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.points))
        .attr('cy', d => yScale(d.perc))
        .attr('r', 5)
        .attr('stroke', '#3E3C3C')
        // .style('fill', 'red')
        .style('fill', function(d) {
            if(((d.players == 'Durant') && (d.year == 2014)) ||
                (d.players == 'Durant') && (d.year == 2015)) {
                return '#002D62';
            } else if (d.players == 'Durant'){
                return '#F13B0E';
            } else if (((d.players == 'Curry') && (d.year == 2014)) ||
                ((d.players == 'Curry') && (d.year == 2015))){
                return '#FFC72C';
            } else if (d.players == 'Curry') {
                return '#0784DC'
            } else {
                return '#9A9594';
            }
        })
        .on('mouseover', function() {
            div.style('visibility','visible')
        })
        .on("mousemove", function(event, d) {
            div.transition()
                .duration(20)
                .style("opacity", .9);
            div.html(d.players + '<br/>' + d.team + '<br/>' + d.year + "<br/>"
                + 'PTS: ' + d.points + '<br/>' + 'TS%: ' + d.perc)
                .style("left", "1240px")
                .style("top", (event.pageY - 25) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });


    //x axis
    g.append('g')
        .call(d3.axisBottom(xScale))
        .attr('transform', 'translate(0,' + (height - padding) + ')')

    //y axis
    g.append('g')
        .call(d3.axisLeft(yScale))

    //x axis title
    g.append('text')
        .text('Points per Game')
        .attr('x', 170)
        .attr('y', (height - 10))

    //y axis title
    g.append('text')
        .text('True Shooting %')
        .attr('transform', 'translate(-50, 335) rotate(-90)');


//legend
    legend = svg.append('g')
        .attr('transform', 'translate(600,' + (height / 2) + ')')

//legend-dots
    legend.append('circle')
        .attr('r', 5)
        .style('fill', '#002D62')

    legend.append('circle')
        .attr('r', 5)
        .style('fill', '#FFC72C')
        .attr('transform', 'translate(0,15)')

    legend.append('circle')
        .attr('r', 5)
        .style('fill', '#F13B0E')
        .attr('transform', 'translate(0,30)')

    legend.append('circle')
        .attr('r', 5)
        .style('fill', '#0784DC')
        .attr('transform', 'translate(0,45)')

    legend.append('circle')
        .attr('r', 5)
        .style('fill', '#9A9594')
        .attr('transform', 'translate(0,60)')

//legend-text
    legend.append('text')
        .text('- Durant on Thunder')
        .attr('transform', 'translate(15, 3)')
        .style('font-size', 13)

    legend.append('text')
        .text('- Curry w/o Durant')
        .attr('transform', 'translate(15, 18)')
        .style('font-size', 13)

    legend.append('text')
        .text('- Durant on Warriors')
        .attr('transform', 'translate(15, 33)')
        .style('font-size', 13)

    legend.append('text')
        .text('- Curry w/ Durant')
        .attr('transform', 'translate(15, 48)')
        .style('font-size', 13)

    legend.append('text')
        .text('- Everyone Else')
        .attr('transform', 'translate(15, 63)')
        .style('font-size', 13)

//legend-title
    legend.append('text')
        .text('Players')
        .attr('transform', 'translate(35, -20)')
        .attr('text-decoration', 'underline')


})
