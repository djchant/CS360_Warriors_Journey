height = 300
width = 250

// overall svg
svg = d3.select("body")
    .append("svg")
    .attr("id", "mainsvg")
    .attr("height", height * 1.4)
    .attr("width", width * 4)
	.attr('transform', 'translate(545, 480)');

// creating sub-svg's
svg1 = d3.select("svg#mainsvg")
    .append("svg")
    .attr("id", "svg1")
    .attr("height", height * 2)
    .attr("width", width + 150);
svg2 = d3.select("svg#mainsvg")
    .append("g") // group to move svg sideways
    .attr("transform", "translate(" + (width+75) + ")")
    .append("svg")
    .attr("id", "svg2")
    .attr("height", height * 2)
    .attr("width", width + 150);
svg3 = d3.select("svg#mainsvg")
	.append("g") // group to move svg sideways
	.attr("transform", "translate(" + ((width+75) * 2) + ")")
	.append("svg")
	.attr("id", "svg3")
	.attr("height", height * 2)
	.attr("width", width + 150);

//div for tooltip of bars
var div = d3.select("body")
	.append("div")
	.attr("class", "tooltip")
	.style("opacity", 0)
	.style('visibility', 'hidden');


d3.csv('3P.csv', function(d) {
	return {
		player: d.Player,
		threeP: +d['3P'],
		threePA: +d['3PA'],
		threePerc: +d['3P%'],
		team: d.Team
	}
}).then(function(data) {

//first graph
	//scales for first graph
	var xScale1 = d3.scaleBand()
        .range([0, width])
        .domain(data.map(d => d.player))
        .padding(0.1);

    var yScale1 = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 6]);

	//creating bars for first graph
    svg1.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) {
        	return xScale1(d.player);
        })
        .attr("width", xScale1.bandwidth())
        .attr("y", function(d) { 
        	return yScale1(d.threeP);
        })
        .attr("height", function(d) { 
        	return height - yScale1(d.threeP);
        q})
		.attr("fill", function(d) {
			if (d.player == 'Curry') {
				return "#006BB6";
			} else if (d.player == 'Thompson') {
				return "#006BB6";
			} else if (d.player == 'Lillard') {
				return "#E03A3E";
			} else if (d.player == 'Harden') {
				return "#BA0C2F";
			} else if (d.player == 'Lowry') {
				return "#CE1141";
			} else if (d.player == 'Redick') {
				return "#BEC0C2";
			}
		})
		.attr('transform', 'translate(100, 50)')
		.on('mouseover', function() {
			div.style('visibility','visible')
		})
		.on("mousemove", function(event, d) {
			div.transition()
				.duration(20)
				.style("opacity", .9);
			div.html(d.player + "<br/>"  + d.threeP + '<br/>' + d.team)
				.style("left", (event.pageX) + "px")
				.style("top", (event.pageY - 50) + "px");
		})
		.on("mouseout", function(d) {
			div.transition()
				.duration(500)
				.style("opacity", 0);
		});

  // add the x Axis
    svg1.append("g")
        .attr("transform", "translate(100," + (height + 50) + ")")
        .call(d3.axisBottom(xScale1));

	// add the y Axis
    svg1.append("g")
        .call(d3.axisLeft(yScale1))
		.attr('transform', 'translate(100, 50)');

    // add the x Axis title
	svg1.append('text')
		.text('Players')
		.attr('x', (width / 2) + 50)
		.attr('y', height + 100);

	// add the y Axis title
	svg1.append('text')
		.text('3 Point Makes per Game')
		.attr('x', 0)
		.attr('y', (height / 2) + 45)
		.attr('transform', 'translate(-140, 280) rotate(-90)');



//second graph
	//scales for second graph
	var xScale2 = d3.scaleBand()
		.range([0, width])
		.domain(data.map(d => d.player))
		.padding(0.1);

	var yScale2 = d3.scaleLinear()
		.range([height, 0])
		.domain([0, 12]);

	//creating bars for second graph
	svg2.selectAll("rect")
		.data(data)
		.enter()
		.append("rect")
		.attr("x", function(d) {
			return xScale2(d.player);
		})
		.attr("width", xScale2.bandwidth())
		.attr("y", function(d) {
			return yScale2(d.threePA);
		})
		.attr("height", function(d) {
			return height - yScale2(d.threePA);
			q})
		.attr("fill", function(d) {
			if (d.player == 'Curry') {
				return "#006BB6";
			} else if (d.player == 'Thompson') {
				return "#006BB6";
			} else if (d.player == 'Lillard') {
				return "#E03A3E";
			} else if (d.player == 'Harden') {
				return "#BA0C2F";
			} else if (d.player == 'Lowry') {
				return "#CE1141";
			} else if (d.player == 'Redick') {
				return "#BEC0C2";
			}
		})
		.attr('transform', 'translate(100, 50)')
		.on('mouseover', function() {
			div.style('visibility','visible')
		})
		.on("mousemove", function(event, d) {
			div.transition()
				.duration(20)
				.style("opacity", .9);
			div.html(d.player + "<br/>"  + d.threePA + '<br/>' + d.team)
				.style("left", (event.pageX - 30) + "px")
				.style("top", (event.pageY - 50) + "px");
		})
		.on("mouseout", function(d) {
			div.transition()
				.duration(500)
				.style("opacity", 0);
		});

	// add the x Axis
	svg2.append("g")
		.attr("transform", "translate(100," + (height + 50) + ")")
		.call(d3.axisBottom(xScale2));

	// add the y Axis
	svg2.append("g")
		.call(d3.axisLeft(yScale2))
		.attr('transform', 'translate(100, 50)');

	// add the x Axis title
	svg2.append('text')
		.text('Players')
		.attr('x', (width / 2) + 50)
		.attr('y', height + 100);

	// add the y Axis title
	svg2.append('text')
		.text('3 Point Attempts per Game')
		.attr('x', 0)
		.attr('y', (height / 2) + 45)
		.attr('transform', 'translate(-130, 287) rotate(-90)');


//third graph
	//scales for third graph
	var xScale3 = d3.scaleBand()
		.range([0, width])
		.domain(data.map(d => d.player))
		.padding(0.1);

	var yScale3 = d3.scaleLinear()
		.range([height, 0])
		.domain([0, 0.5]);

	//creating bars for third graph
	svg3.selectAll("rect")
		.data(data)
		.enter()
		.append("rect")
		.attr("x", function(d) {
			return xScale3(d.player);
		})
		.attr("width", xScale3.bandwidth())
		.attr("y", function(d) {
			return yScale3(d.threePerc);
		})
		.attr("height", function(d) {
			return height - yScale3(d.threePerc);
			q})
		.attr("fill", function(d) {
			if (d.player == 'Curry') {
				return "#006BB6";
			} else if (d.player == 'Thompson') {
				return "#006BB6";
			} else if (d.player == 'Lillard') {
				return "#E03A3E";
			} else if (d.player == 'Harden') {
				return "#BA0C2F";
			} else if (d.player == 'Lowry') {
				return "#CE1141";
			} else if (d.player == 'Redick') {
				return "#BEC0C2";
			}
		})
		.attr('transform', 'translate(100, 50)')
		.on('mouseover', function() {
			div.style('visibility','visible')
		})
		.on("mousemove", function(event, d) {
			div.transition()
				.duration(20)
				.style("opacity", .9);
			div.html(d.player + "<br/>"  + d.threePerc + '<br/>' + d.team)
				.style("left", (event.pageX - 60) + "px")
				.style("top", (event.pageY - 50) + "px");
		})
		.on("mouseout", function(d) {
			div.transition()
				.duration(500)
				.style("opacity", 0);
		});

	// add the x Axis
	svg3.append("g")
		.attr("transform", "translate(100," + (height + 50) + ")")
		.call(d3.axisBottom(xScale3));

	// add the y Axis
	svg3.append("g")
		.call(d3.axisLeft(yScale3))
		.attr('transform', 'translate(100, 50)');

	// add the x Axis title
	svg3.append('text')
		.text('Players')
		.attr('x', (width / 2) + 50)
		.attr('y', height + 100);

	// add the y Axis title
	svg3.append('text')
		.text('3 Point Percentage per Game')
		.attr('x', 0)
		.attr('y', (height / 2) + 45)
		.attr('transform', 'translate(-140, 295) rotate(-90)');

})





