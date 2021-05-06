height = 400
width = 500
padding = 60

svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('transform', 'translate(1100, 30)')

var div = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style('visibility', 'hidden');

d3.csv('Klay.csv', function(d) {
    return {
        players: d.Player,
        makes: +d['3P'],
        team: d.Team,
        date: d.Date
    }
}).then(function(data) {
    var xScale = d3.scaleLinear()
        .domain([0, 16])
        .range([0, width - 150])

    var yScale = d3.scaleBand()
        .domain(data.map(d => d.players))
        .range([35, height - 50])

    g = svg.append('g')
        .attr('transform', 'translate(100,0)')


    //gridlines
    g.append('g')
        .attr('transform', 'translate(0, 350)')
        .call(d3.axisBottom(xScale)
            .ticks(6)
            .tickSize(-315))
        .call(g => g.select(".domain").remove())


    g.selectAll('.tick line').attr('opacity', 0.2)


    //circles
    g.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.makes))
        .attr('cy', function(d,i) {
            return (i * (70) + 35);
        })
        .attr('r', 8)
        // .style('fill', 'red');
        .style('fill', function(d) {
            if(d.players == 'Klay Thompson') {
                return '#006BB6';
            } else if (d.players == 'Zach Lavine'){
                return '#CE1141';
            } else if ((d.players == 'Stephen Curry1') || (d.players == 'Stephen Curry2')){
                return '#006BB6';
            } else {
                return '#552583';
            }
        })
        .on('mouseover', function() {
            div.style('visibility','visible')
        })
        .on("mousemove", function(event, d) {
            div.transition()
                .duration(20)
                .style("opacity", .9);
            div.html('Team: ' + d.team + "<br/>"  + "Date: " + d.date)
                .style("left", (event.pageX + 15) + "px")
                .style("top", (event.pageY - 50) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });

    //y axis
    g.append('g')
        .call(d3.axisLeft(yScale))
        .attr('translate', 'transform(50,0)')

    //x axis title
    g.append('text')
        .text('Most Number of 3-Pointers in a Game')
        .attr('x', 55)
        .attr('y', (height - 10))


})
