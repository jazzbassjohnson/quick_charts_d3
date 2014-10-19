(function linearChart(){
  var width = 960,
    height = 500;

  var y = d3.scale.linear()
      .range([height, 0]);

  var chart = d3.select(".chart")
      .attr("width", width)
      .attr("height", height);

  d3.tsv("data/data.csv", type, function(error, data) {
    // console.log(data)
    y.domain([0, d3.max(data, function(d) { return d.value; })]);
    var barWidth = width / data.length;

    // add bars to the chart bars a data object
    var bar = chart.selectAll("g")
        .data(data)
      .enter().append("g")
        // translate is a type of trnsform that places the element on a new point in relation to the x- and y-axis
        .attr("transform", function(d, i) { return "translate(" + i * barWidth + ", 0)"; });

    bar.append("rect")
      // y(d.value) returns the scaled data value
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .attr("width", barWidth - 1);

    bar.append("text")
        .attr("y", function(d) { return y(d.value) + 13; })
        .attr("x", barWidth / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d.value; });
  });

  // extracts correct data from the data object
  function type(d) {
    d.value = +d.value; // coerce to number
    return d;
  }

})();

(function ordinal() {
  var width = 960,
    height = 500;

  var x = d3.scale.ordinal()
    // returns width of each bar with a computed position that snaps crisply to exact pixel position
    // the last param applies a small padding between the bars
    .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
    .range([height, 0]);

  var chart = d3.select(".chart_two")
    .attr("width", width)
    .attr("height", height);

  d3.tsv("data/data.csv", type, function(error, data) {
    x.domain(data.map(function(d) { return d.name; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);
    console.log(data);
    
    var bar = chart.selectAll("g")
      .data(data)
      .enter().append("g")
      .attr("transform", function(d) { return "translate("+ x(d.name) + ",0)" });

    bar.append("rect")
      .attr("y", function(d) { return y(d.value) })
      .attr("height", function(d) { return height - y(d.value) })
      .attr("width", x.rangeBand());

    bar.append("text")
      .attr("x", x.rangeBand()/2)
      .attr("y", function(d) { return y(d.value) + 3; })
      .attr("dy", ".75em")
      .text(function(d) { return d.name; });

  });

  function type(d) {
    d.value = +d.value; // coerce to number
    return d;
  }
})();

(function() {
  var margin = {top: 20, right: 30, bottom: 30, left: 40};
  var width = 960 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;
  var color = d3.scale.category20();

  // x scale range, below the domain will influence this number
  var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(function(d) { return d + "%"; });

  var chart = d3.select(".chart_three")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + ", "+ margin.top + ")");

  d3.tsv("data/data.csv", type, function(error, data) {
    // returns an array of mapped names
    x.domain(data.map(function(d) { return d.name; }));
    y.domain([0, d3.max(data, function(d) { return d.value })]);

    chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0, "+ height + " )")
      .call(xAxis);

    chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Frequency");

    chart.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", ".bar")
      .attr("x", function(d) { return x(d.name); })
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value) })
      .attr("width", x.rangeBand())
      .style("fill", function(d) { return "" + color(d.value); });

  });

  function type(d) {
    d.value = +d.value;
    return d;
  }
})();

(function plots() {
  var margin = {top: 20, right: 30, bottom: 30, left: 40};
  var width = 960 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;
  var color = d3.scale.category20();

  var x = d3.scale.ordinal()
    .rangePoints([0, width], 1);

  var y = d3.scale.linear()
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  var chart = d3.select(".chart_four")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("class", "chart_container")
    .attr("transform", "translate("+margin.left + ", " + margin.top + ")");


  d3.tsv("data/data.csv", type, function(error, data) {
    var maxValue = d3.max(data, function(d) { return d.value; });
    margin.top = margin.top + (maxValue/2)+3;
    margin.left = margin.left + (maxValue/2)+3;
    margin.right = margin.right + (maxValue/2)+3;
    margin.bottom = margin.bottom + (maxValue/2)+3;


    x.domain(data.map(function(d) { return d.name; }));
    y.domain([0, maxValue]);

     // taking in to account large circles that may extend beyond the chart's height
    
    d3.select(".chart_four")
      .attr("width", width + margin.left + margin.right )
      .attr("height", height + margin.top + margin.bottom );

    chart.attr("transform", "translate("+margin.left + ", " + margin.top + ")");
    
    chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate( " + x.rangeBand() + ", " +height + ")")
      .call(xAxis);

    chart.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    chart.selectAll(".point")
      .data(data)
    .enter().append("circle")
      .attr("class", "point")
      .attr("cx", function(d) { return x(d.name); })
      .attr("cy", function(d) { return y(d.value) })
      .attr("r", function(d) { return d.value; })
      .style("fill", function(d) { return color(d.name) + ""; });

  });

  function type(d) {
    d.value = +d.value;
    return d;
  }
})();

(function() {

  // create varius accessor functions that specify the four deminions of the data to be visualized
  function x(d) { return d.income; }
  function y(d)  { return d.lifeExpectancy; }
  function radius(d) { return d.population; }
  function color(d) { return d.region; }
  function key(d) { return d.name; }

  //Create chart dementions
  var margin = {top: 19.5, right: 19.5, bottom: 19.5, left: 39.5};
  var width = 960 - margin.right;
  var height = 500 - margin.top - margin.bottom;

  // make various scales
  var xScale = d3.scale.log()
    .domain([300, 1e5])
    .range([0, width]);
  var yScale = d3.scale.linear()
    .domain([10, 85])
    .range([height, 0]);
  var radiusScale = d3.scale.sqrt()
    .domain([0, 5e8])
    .range([0, 40]);
  var colorScale = d3.scale.category10();

















})();