var drawPlot = function(HumanCost,target,graph,yScale)
{   

    d3.select("svg")
    .select("#graph")
    .append("g")
    .selectAll("rect")
    .data(HumanCost)
    .enter()
    .append("rect")
    .attr("x", function(d, i)
         { 
        
        return i*(graph.width/HumanCost.length)+5;
    }
         )
    .attr("y", function(d)
         { 
          
        return yScale(parseInt(d.Civilian_Casualty))
         })
    .attr("width", 30)
    .attr("height", function(d)
         { 
        return graph.height-yScale(parseInt(d.Civilian_Casualty))
        })
    .attr("fill", "red")
    
    
     .on("mouseenter" ,function(hope)
      {
        
      var xPos = d3.event.pageX;
      var yPos = d3.event.pageY;
      
        d3.select("#tooltip")
        .classed("hidden",false)
        .style("top",yPos+"px")
        .style("left",xPos+"px")
        
        d3.select("#Year")
        .text(hope.Year);
        
        d3.select("#D")
        .text(parseInt(hope.Civilian_Deaths))
        
        d3.select("#I")
        .text(parseInt(hope.Civilian_Injuries))    
      })
    .on("mouseleave",function()
    {
        d3.select("#tooltip")    
        .classed("hidden",true);
    })
}

var drawLabels=function(graph,HumanCost,yScale)

{    
    var labels=d3.select("#graph")
    .append("g")
    .attr("id", "labels")
    .selectAll("text")
    .data(HumanCost)
    .enter()
    
    labels.append("text")
    .text(function(HumanCost){
        
    return   parseInt(HumanCost.Civilian_Casualty)})

    .attr("x", function(d, i)
         { 
        return i*(graph.width/HumanCost.length)+40;
    }) 
          
    .attr("y",  function(d)
         {  
        return 10+yScale(parseInt(d.Civilian_Casualty))
         })
    .attr("text-anchor", "Middle")    
    .attr("font-family", "sans-serif")
    .attr("font-size", "12px")
}
    
var  drawAxes=function(graph,margines, xScale)
{
    var xAxis = d3.axisBottom(xScale);
    var xAxis = d3.select("#graph")
        .append("g")      
        .attr("transform", "translate("+(margines.left)+"," +(margines.top+graph.height)+")")
        .call(xAxis)
}   

var initGraph = function(HumanCost)
{
    var screen = {width:600,height:200}
    var margins = {left:20,right:30, top:20,bottom:30}
    
    
    var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height - margins.top-margins.bottom
        }
    console.log(graph);
    
    d3.select("svg")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var target = d3.select("svg")
    .append("g")
    .attr("id","graph")
    .attr("transform",
          "translate("+margins.left+","+
                        margins.top+")");
    
    
    var xScale = d3.scaleBand()
        .domain([2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019])
       .range([0, graph.width])

    var yScale = d3.scaleLinear()
        .domain([0,12000])
        .range([100,0])

    drawPlot(HumanCost,target,graph, yScale);
    drawLabels(graph,HumanCost, yScale);
    drawAxes(graph, margins, xScale, yScale);

}
var successFCN = function(HumanCost)
{
   
    console.log("Afghan",HumanCost);
    initGraph(HumanCost);
 
}

var failFCN = function(error)
{
    console.log("error",error);
}

var afgPromise = d3.csv("Human_Cost.csv")
afgPromise.then(successFCN,failFCN);