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