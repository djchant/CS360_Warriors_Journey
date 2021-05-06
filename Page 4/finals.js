var padding = 100;
var barPadding = 2;
height = 300
width = 1400

// overall svg
svg = d3.select("body")
    .append("svg")
    .attr("id", "mainsvg")
    .attr("height", height)
    .attr("width", width)
    .attr('transform', 'translate(130, 600)');

// creating sub-svg's
svg1 = d3.select("svg#mainsvg")
    .append('g')
    .attr('transform', 'translate(50,0)')
    .append("svg")
    .attr("id", "svg1")
    .attr("height", height)
    .attr("width", width);

svg2 = d3.select("svg#mainsvg")
    .append("g") // group to move svg sideways
    .attr("transform", "translate(" + (780) + ",0)")
    .append("svg")
    .attr("id", "svg2")
    .attr("height", height)
    .attr("width", width);

var div = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style('visibility', 'hidden');

d3.csv("regseason.csv", function(d) {
    return {
        date_2015: d['Date_2015'],
        margin_2015: +d['Margin_2015'],
        opp_2015: d['Opp_2015'],
        score_2015: d['Score_2015'],
        date_2016: d['Date_2016'],
        margin_2016: +d['Margin_2016'],
        opp_2016: d['Opp_2016'],
        score_2016: d['Score_2016']
    }
}).then(function(data) {

//graph 1
//scales
    var yScale1 = d3.scaleLinear()
        .domain([0, 50])
        .range([0, (height / 1.5) - 10]);

//bars
    svg1.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
            return i * (5 + barPadding);
        })
        .attr("width", 5)
        .attr("y", d => (height / 3) - (Math.max(0, yScale1(d.margin_2015))))
        .attr("height", d => Math.abs(yScale1(d.margin_2015)))
        .attr("fill", function(d) {
            if(d.margin_2015 > 0) {
                return '#FFC72C';
            } else {
                return '#006BB6';
            }
        })
        .attr('transform', 'translate(0,110)')
        .on('mouseover', function() {
            div.style('visibility','visible')
        })
        .on("mousemove", function(event, d) {
            div.transition()
                .duration(20)
                .style("opacity", .9);

            if(d.margin_2015 > 0) {
                div.html(d.date_2015 + "<br/>"  + d.opp_2015 + '<br/>' + d.score_2015)
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY - 50) + "px");
            } else {
                div.html(d.date_2015 + "<br/>"  + d.opp_2015 + '<br/>' + d.score_2015)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY + 10) + "px");
            }

        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });

//graph 2
//scales
    var yScale2 = d3.scaleLinear()
        .domain([0, 50])
        .range([0, (height / 1.5) - 10]);

//bars
    svg2.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
            return i * (5 + barPadding);
        })
        .attr("width", 5)
        .attr("y", d => (height / 3) - (Math.max(0, yScale2(d.margin_2016))))
        .attr("height", d => Math.abs(yScale2(d.margin_2016)))
        .attr("fill", function(d) {
            if(d.margin_2016 > 0) {
                return '#FFC72C';
            } else {
                return '#006BB6';
            }
        })
        .attr('transform', 'translate(0,110)')
        .on('mouseover', function() {
            div.style('visibility','visible')
        })
        .on("mousemove", function(event, d) {
            div.transition()
                .duration(20)
                .style("opacity", .9);

            if(d.margin_2016 > 0) {
                div.html(d.date_2016 + "<br/>"  + d.opp_2016 + '<br/>' + d.score_2016)
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY - 50) + "px");
            } else {
                div.html(d.date_2016 + "<br/>"  + d.opp_2016 + '<br/>' + d.score_2016)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY + 10) + "px");
            }

        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });

})