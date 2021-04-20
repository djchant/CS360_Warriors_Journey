var w = 1000;
var h = 700;
var padding = 60;

d3.csv("finance.csv").then(function(data) {
    data.forEach(function(d) {
        d.state = d.State;
        d.year = +d.Year;
        d.tax = +d["Totals.Sales tax"];
    });

    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    var xScale = d3.scaleLinear()
        .domain([1996, 2013])
        .range([padding, w - padding * 2]);

    var minTax = d3.min(data, d => d.tax);
    var maxTax = d3.max(data, d => d.tax);

    var yScale = d3.scaleLinear()
        .domain([0, maxTax])
        .range([h - padding * 2, padding]);

    g = svg.append("g")
        .attr("transform", "translate(" + (padding + 40) + "," + padding + ")");

//line
    g.append("path")
        .datum(data)
        .attr("class", "path")
        .attr("d", d3.line()
            .x(d => xScale(d.year))
            .y(d => yScale(d.tax)));

//dots
    g.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.tax))
        .attr("r", 5)
        .append("title")
        .text(d => "State: " + d.state + "\nTax: " + d.tax
                    + "\nYear: " + d.year); //hover over point for about 2 seconds

//axes
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    g.append("g")
        .attr("transform", "translate(0," + (h - padding * 2) + ")")
        .call(xAxis);

    g.append("g")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

//titles & labels
    title_g = svg.append("g")
        .attr("text-anchor", "middle");
//title
    title_g.append("text")
        .text("Sales Tax per Year in California")
        .attr("class", "bigTitle")
        .attr("x", (w + padding) / 2)
        .attr("y", 30);

//x axis title
    title_g.append("text")
        .text("Year")
        .attr("x", (w + padding) / 2)
        .attr("y", 680);

//y axis title
    title_g.append("text")
        .text("Sales Tax")
        .attr("x", 50)
        .attr("y", (h + padding) / 2);

    title_g.append("text")
        .text("(dollars)")
        .attr("x", 50)
        .attr("y", (h + padding + 30) / 2);

})
