height = 400
width = 500
padding = 60

svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('transform', 'translate(1100, 30)')

d3.csv('Klay.csv', function(d) {
    return {
        players: d.Player,
        makes: +d['3P']
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

    //y axis
    g.append('g')
        .call(d3.axisLeft(yScale))
        .attr('translate', 'transform(50,0)')

    //x axis title
    g.append('text')
        .text('Most Number of 3-Pointers in a Game')
        .attr('x', 55)
        .attr('y', (height - 10))
//
//     //y axis title
//     g.append('text')
//         .text('True Shooting %')
//         .attr('transform', 'translate(-50, 335) rotate(-90)');
//
//
// //legend
//     legend = svg.append('g')
//         .attr('transform', 'translate(600,' + (height / 2) + ')')
//
// //legend-dots
//     legend.append('circle')
//         .attr('r', 5)
//         .style('fill', '#002D62')
//
//     legend.append('circle')
//         .attr('r', 5)
//         .style('fill', '#FFC72C')
//         .attr('transform', 'translate(0,15)')
//
//     legend.append('circle')
//         .attr('r', 5)
//         .style('fill', '#F13B0E')
//         .attr('transform', 'translate(0,30)')
//
//     legend.append('circle')
//         .attr('r', 5)
//         .style('fill', '#006BB6')
//         .attr('transform', 'translate(0,45)')
//
//     legend.append('circle')
//         .attr('r', 5)
//         .style('fill', '#9A9594')
//         .attr('transform', 'translate(0,60)')
//
// //legend-text
//     legend.append('text')
//         .text('- Durant on Thunder')
//         .attr('transform', 'translate(15, 3)')
//         .style('font-size', 13)
//
//     legend.append('text')
//         .text('- Curry w/o Durant')
//         .attr('transform', 'translate(15, 18)')
//         .style('font-size', 13)
//
//     legend.append('text')
//         .text('- Durant on Warriors')
//         .attr('transform', 'translate(15, 33)')
//         .style('font-size', 13)
//
//     legend.append('text')
//         .text('- Curry w/ Durant')
//         .attr('transform', 'translate(15, 48)')
//         .style('font-size', 13)
//
//     legend.append('text')
//         .text('- Everyone Else')
//         .attr('transform', 'translate(15, 63)')
//         .style('font-size', 13)
//
// //legend-title
//     legend.append('text')
//         .text('Players')
//         .attr('transform', 'translate(35, -20)')
//         .attr('text-decoration', 'underline')
//

})
