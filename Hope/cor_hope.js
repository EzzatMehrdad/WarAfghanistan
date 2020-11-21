var drawLines = function(HumanCost,line, target,
              xScale, yScale)
{
    
    var lineHope = d3.line()
        .x(function(year) { return xScale(year.Year)})
        .y(function(year) { return yScale(year.Hope)})
    
        target
        .append("path")
        .datum(HumanCost)
        .attr("fill","none")
        .attr("d",lineHope)
        .attr("stroke", "#7D3C98")
    
     var lineTroop = d3.line()
        .x(function(year) { return xScale(year.Year)})
        .y(function(year) { return yScale(year.US_Troop_Level)})
    
        target
        .append("path")
        .datum(HumanCost)
        .attr("fill","none")
        .attr("d",lineTroop)
        .attr("stroke", "black")
        
    
    var lineFear = d3.line()
        .x(function(year) { return xScale(year.Year)})
        .y(function(year) { return yScale(year.Fear)})
    
        target
        .append("path")
        .datum(HumanCost)
        .attr("fill","none")
        .attr("d",lineFear)
        .attr("stroke", "red")
    

    
     .on("mouseover",function(HumanCost)
        {   
            if(! d3.select(this).classed("off"))
            {
            d3.selectAll(".line")
            .classed("fade",true);
            
            d3.select(this)
                .classed("fade",false)
                .raise(); //move to top
            }
        })
        .on("mouseout",function(HumanCost)
           {
            if(! d3.select(this).classed("off"))
            {
            
            d3.selectAll(".line")
                .classed("fade",false);
            }
            
        })
    
    }

var drawLabels=function(graph,target, margins)

{
    var labels = d3.select("#graph")
        .append("g")
        .classed("labels",true)
    
        labels.append("text")
        .text("Afghanistan over 10 Years")
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph.width/2))
        .attr("y",margins.top)
    
    labels.append("text")
        .text("Year")
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph.width/2))
        .attr("y",graph.height)
    
    labels.append("g")
        .attr("transform","translate(20,"+ 
             (margins.top+(graph.height/2))+")")
        .append("text")
        .text("Percentage")
        .attr("text-anchor","middle")
        .attr("transform","rotate(90)")
    
}

var  drawLegend=function(HumanCost,margins, graph, target, xScale, yScale)
  {
    
    var names = [
       {
           class:"hope",
           name:"Hope"
       },
      
        {
        class:"fear",
        name:"Fear"
        },
        
        { class:"us_troop_level",
         
         name:"US Troop Level"
        },
        
        
    ]
    
    var legend = d3.select("#graph")
        .append("g")
        .attr("id", "legends")

        .attr("transform","translate("+
              (margins.left+ 10) +","+
             (margins.top+10)+")");
        
    var entries =legend.selectAll("g")
        .data(names)
        .enter()
        .append("g")
        .attr("transform",function(county,index)
              {
                return "translate(0,"+index*20+")";
              })
    
    entries.append("circle")
    .attr("class", function(catagory)
    {   return  catagory.class})
    .attr("r",7) 
    
    entries.append("text")
    
    .text(function(catagory){return catagory.name;})
    .attr("x",15)
    .attr("y",10)
      
    .on("click",function(HumanCost)
    {
        var on = ! d3.select(this)
                     .classed("off");
        if(on)
        {
            d3.select(this)
                .classed("off",true);
            d3.selectAll("."+HumanCost)
                .classed("off",true);
        }
        else
        {
            d3.select(this)
                .classed("off",false);        
            d3.selectAll("."+HumanCost)
                .classed("off",false);
        }
    })  
      
      
}   
var  drawAxes=function(HumanCost, target,  margins, xScale, yScale)
{
    
    var xAxis = d3.axisBottom(xScale);
    var yAxis=d3.axisLeft(yScale);
    
     var xAxis = d3.axisBottom(xScale);
    var xAxis = d3.select("svg")
        .select("#graph")
        .append("g")
        .attr("transform", "translate("+(target.left)+"," +(target.top+graph.height)+")")
    
        .call(xAxis)    
    console.log(xAxis);
    
    var yAxis = d3.select("svg")
        .select("#graph")
        .attr("transform","translate("+0+","
             +(0)+")")
        .call(yAxis)
    }

var initGraph = function(HumanCost)
{
    var screen = {width:700,height:300}
    var margins = {left:20,right:30,top:20,bottom:30}
    
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
    
    var yScale=d3.scaleLinear()
        .domain([0, 100])
        .range([graph.height, 0])

    drawLines(HumanCost, graph, target,xScale,yScale);
    drawLabels(graph,target, margins);
    drawAxes(HumanCost, target, margins, xScale, yScale);
    drawLegend(HumanCost, margins, graph, target, xScale, yScale);
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

var afgPromise = d3.csv("../Human_Cost.csv")
afgPromise.then(successFCN,failFCN);