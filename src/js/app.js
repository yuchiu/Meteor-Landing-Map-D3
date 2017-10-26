var margin = {
        top: 50,
        left: 50,
        right: 50,
        bottom: 50
    },
    height = 700 - margin.top - margin.bottom,
    width = window.innerWidth - margin.left - margin.right

var svg = d3.select("#map")
    .append("svg")
    .attr('height', height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

d3.queue()
    .defer(d3.json, "../data/world.topojson")
    .await(ready)

var projection = d3.geoMercator()
    .translate([width / 2, height / 2])
    .scale(300)

var path = d3.geoPath().projection(projection)

function ready(error, data) {
    const countries1 = topojson.feature(data, data.objects.countries1).features
    const countries2 = topojson.feature(data, data.objects.countries2).features
    const countries = countries1.concat(countries2)

    svg.selectAll('.country')
        .data(countries)
        .enter().append("path")
        .attr('class', "country")
        .attr('d', path)
        .on('mouseover', function (d) {
            d3.select(this).classed("selected", true)
        })
        .on('mouseout', function (d) {
            d3.select(this).classed("selected", false)
        })
}