// var mydata = [
//     {date:'4/01/2019', low: 55, high: 78},
//     {date:'4/02/2019', low: 53, high: 88},
//     {date:'4/03/2019', low: 54, high: 58},
//     {date:'4/04/2019', low: 55, high: 68},
//     {date:'4/05/2019', low: 52, high: 78},
//     {date:'4/06/2019', low: 51, high: 58},
//     {date:'4/07/2019', low: 52, high: 68},
//     {date:'4/08/2019', low: 50, high: 58},
// ];

// d3.select('tbody')
// .selectAll('tr')
// .data(mydata)
// .enter().append('tr')
// .html(function(d){
//     return '<th scope="row">' + d.date +
//            '</th><td>' + d.low +
//            '</td><td>' + d.high + '</td>'
// });


// d3.select('#viz')
// .append('svg')
// .attr('width', 600)
// .attr('height', 400)
// .style('background', '#93A1A1')
// .append('rect')
// .attr('x', 200)
// .attr('y', 100)
// .attr('height', 200)
// .attr('width', 200)
// .style('fill', '#CB4B19');

// d3.select('#viz svg')
// .append('circle')
// .attr('cx', 300)
// .attr('cy', 200)
// .attr('r', 50)
// .style('fill', '#840043')


var bardata = [];
for (var i = 0; i<10; i++){
    bardata.push(Math.random() * 30);
}
var height = 400,
    width = 600,
    barWidth = 50,
    barOffset = 5,
    tempColor;

var yScale = d3.scaleLinear()
    .domain([0, d3.max(bardata)])
    .range([0, height]);

var xScale= d3.scaleBand()
    .domain(bardata)
    .paddingInner(.5)
    .paddingOuter(.5)
    .range([0, width]);

var colors = d3.scaleLinear()
    .domain([0, bardata.length *.33,
        bardata.length *.66,
        bardata.length ])
    .range(['#FFB832', '#C61C6F', '#FFFF03']);
var tooltip = d3.select('body')
    .append('div')
    .style('position', 'absolute')
    .style('padding', '0 10px')
    .style('background', 'white')
    .style('oppacity', 0)

var myChart=
d3.select('#viz').append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', '#C9D7D6')
    .selectAll('rect').data(bardata)
    .enter().append('rect')
    .attr('fill', function(d,i){
        return colors(i);
    })
    .attr('width', barWidth)
    .attr('height', function(d){
        return yScale(d);
    })
    .attr('x', function(d, i){
        return xScale(d);
    })
    .attr('y', function(d){
        return height - yScale(d);
    })
    .on('mouseover', function(d){
        tempColor = this.style.fill;
        d3.select(this)
        .transition()
        .delay(200)
        .style('opacity', .5)
        .style('fill', 'yellow')
    })
    .on('mouseout', function(d){
        d3.select(this)
        .transition()
        .style('opacity', 1)
        .style('fill', tempColor)
    });
    
    

    myChart.transition()
    .attr('height', function(d){
        return yScale(d);
    })
    .attr('y', function(d){
        return height -yScale(d);
    })
    .delay(function(d, i){
        return i * 20;
    })
    .duration(1000)
    .ease(d3.easeBounceOut)