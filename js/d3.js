//pie chart visualization d3

var diameter = 1360;

var tree = d3.layout.tree()
    .size([360, diameter / 2 - 120])
    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

var diagonal = d3.svg.diagonal.radial()
    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
  .append("g")
    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

d3.json("health-determinants.json", function(error, root) {
  if (error) throw error;

  var nodes = tree.nodes(root),
      links = tree.links(nodes);

  var link = svg.selectAll(".link")
      .data(links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", diagonal);

  var node = svg.selectAll(".node")
      .data(nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

  node.append("circle")
      .attr("r", 4.5);

  node.append("text")
			.attr("class", "nodeText") //attaching a class to the text
      .attr("dy", ".31em")
      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
      .text(function(d) { return d.name; })
			 .on("click",function(d){   //click a node to make all li metrics bold
			 	$("#metricsList li").css({
			 		"font-weight":"bolder"
				});
			});
			d3.select()

			// .on("click",function(d) {
			// 	$(d3.select(this)).css({
			// 		"font-weight":"bolder"
			// 	});
			// });

			// $("").click({
			// 	d3.select()....
			// })

			// d3.selectAll(".node").selectAll("text")
			// 	.attr("font-weight","bolder");


});

d3.select(self.frameElement).style("height", diameter - 150 + "px");
