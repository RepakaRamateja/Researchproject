var data = {
  "name": "Eve",
  "children": [
    {
      "name": "Cain"
    },
    {
      "name": "Seth",
      "children": [
        {
          "name": "Enos"
        },
        {
          "name": "Noam"
        }
      ]
    },
    {
      "name": "Abel"
    },
    {
      "name": "Awan",
      "children": [
        {
          "name": "Enoch"
        }
      ]
    },
    {
      "name": "Azura"
    }
  ]
};

// Set the dimensions and margins of the diagram
var margin = {top: 40, right: 90, bottom: 50, left: 90},
      w = 660 - margin.left - margin.right,
      h = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select('body').append('svg')
  .attr('width', w + margin.left + margin.right)
  .attr('height', h + margin.top + margin.bottom);

// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var g = svg.append('g')
    .attr('transform',
          'translate(' + margin.left + ',' + margin.top + ')');

// declares a tree layout and assigns the size
var tree = d3.tree()
  .size([w, h]);

// Assigns parent
var nodes = d3.hierarchy(data);

 // Assigns the x and y position for the nodes
nodes = tree(nodes);

// adds the links between the nodes
var link = g.selectAll(".link")
    .data(nodes.descendants().slice(1))
    .enter()
    .append("path")
      .attr("class", "link")
      .attr("d", (d) => {
        return "M" + d.x + "," + d.y
          + "C" + d.x + "," + (d.y + d.parent.y) / 2
          + " " + d.parent.x + "," +  (d.y + d.parent.y) / 2
          + " " + d.parent.x + "," + d.parent.y;
      })
      .attr('fill', 'none')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 2);

// adds each node as a group
var node = g.selectAll('.node')
  .data(nodes.descendants())
  .enter()
  .append('g')
    .attr('class', (d) => {
      return "node" +
        (d.children ? " node--internal" : " node--leaf"); })
    .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")" );

// adds the circle to the node
node.append('circle')
  .attr('r', 10)
  .attr('fill', 'steelblue');

// adds the text to the node
node.append("text")
  .attr("dy", 3)
  .attr("y", (d) => d.children ? -20 : 20 )
  .style("text-anchor", (d) =>  d.children ? "end" : "start" )
  .text((d) => d.data.name );
