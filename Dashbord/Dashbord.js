var drawLines = function(HumanCost, graph, target, xScale,yScale)
{
    
    var lineHope = d3.line()
        .x(function(year) { return xScale(year.Year)})
        .y(function(year) { return yScale(year.Hope)})
        .curve(d3.curveCardinal)
    
        target   
        .append("path")
        .datum(HumanCost)
        .attr("fill","none")
        .attr("d",lineHope)
        .attr("stroke", "#7D3C98")
        .classed("Hope", true)
    
     var lineTroop = d3.line()
        .x(function(year) { return xScale(year.Year)})
        .y(function(year) { return yScale(year.US_Troop_Level)})
        .curve(d3.curveCardinal)
    
         target
        .append("path")
        .datum(HumanCost)
        .attr("fill","none")
        .attr("d",lineTroop)
        .attr("stroke", "black")
        .classed("us_troop_level", true)
        
    
    var lineFear = d3.line()
        .x(function(year) { return xScale(year.Year)})
        .y(function(year) { return yScale(year.Fear)})
        .curve(d3.curveCardinal)
    
       target
        .append("path")
        .datum(HumanCost)
        .attr("fill","none")
        .attr("d",lineFear)
        .attr("stroke", "red")
        .classed("fear", true)
    
    
    var lineCorrupt = d3.line()
        .x(function(year) { return xScale(year.Year)})
        .y(function(year) { return yScale(year.Corruption)})
        .curve(d3.curveCardinal)
        
        target
        .append("path")
        .datum(HumanCost)
        .attr("fill","none")
        .attr("d",lineCorrupt)
        .attr("stroke", "#0BFADE")
        .classed("Corruption", true)
    
    var lineInsec = d3.line()
        .x(function(year) { return xScale(year.Year)})
        .y(function(year) { return yScale(year.Insecurity)})
        .curve(d3.curveCardinal)
        
        target    
        .append("path")
        .datum(HumanCost)
        .attr("fill","none")
        .attr("d",lineInsec)
        .attr("stroke", "orange")
        .classed("insecurity", true)
    
    var lineAir = d3.line()
        .x(function(year) { return xScale(year.Year)})
        .y(function(year) { return yScale(year.Airstrikes_prct)})
         .curve(d3.curveCardinal)
    
         target
        .append("path")
        .datum(HumanCost)
        .attr("fill","none")
        .attr("d",lineAir)
        .attr("stroke", "#7A1A1A")
        .classed("air", true)
    
     .on("mouseover",function(HumanCost)
        {   
            if(! d3.select(this).classed("off"))
            {
            d3.selectAll(".line")
            .classed("fade",true);
            
            d3.select(this)
                .classed("fade",false)
                .raise();
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
    
        labels.append("text")
        .text("Afghanistan over 10 Years")
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graph.width/2))
        .attr("y",margins.top)
    
    labels.append("text")
        .text("Year")
        .attr("text-anchor","middle")
        .attr("text-size","bold")
        .attr("x",margins.left+(graph.width/2))
        .attr("y",graph.height+margins.bottom+10)
    
    labels.append("g")
        .attr("transform","translate(0,"+ 
             (margins.top+(graph.height/2))+")")
        .append("text")
        .text("Percentage")
        .attr("text-anchor","middle")
        .attr("transform","rotate(90)")
}
var  drawLegend=function(HumanCost, graph, target, margins, xScale, yScale)
  {
    
    var names = [
       {
           class:"hope",
           name:"Hope"
       },
       {
           class:"insecurity",
           name:"Insecurity"
       },
        {
        class:"fear",
        name:"Fear"
        },
        
        { class:"us_troop_level",
         
         name:"US Troop Level"
        },
        
        {
        class:"corruption",
        name:"Corruption"        
        },
        {
        class:"air",
        name:"Airstrikes"
        }
        
    ]
    
    var legend = d3.select("svg")
        .select("#graph")
        .append("g")
        .attr("id", "legends")

        .attr("transform","translate("+
              (graph.left+ 10) +","+
             (graph.top+10)+")");
        
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
    .attr("x", 15)
    .attr("y",5)
      
    .on("click",function(HumanCost)
    {
        var on = ! d3.select(this)
                     .classed("off");
        if(on)
        {
            d3.select(this)
                .classed("off",true);
            d3.selectAll("."+HumanCost.class)
                .classed("off",true);
        }
        else
        {
            d3.select(this)
                .classed("off",false);        
            d3.selectAll("."+HumanCost.class)
                .classed("off",false);
        }
    })  
}   
var  drawAxes=function(HumanCost, graph, target, margins, xScale, yScale)
{
    
    var xAxis = d3.axisBottom(xScale);
    var yAxis=d3.axisLeft(yScale);
    
     var xAxis = d3.axisBottom(xScale);
    var xAxis = d3.select("#graph")
        .append("g")
        .attr("transform", "translate("+0+"," +(margins.top+graph.height)+")")
    
        .call(xAxis)    

    var yAxis = d3.select("svg")
        .select("#graph")
        .append("g")
        .attr("transform","translate("+0+","
             +0+")")
        .call(yAxis)
    }

var initGraph = function(HumanCost)
{
    var screen = {width:700,height:400}
    var margins = {left:30,right:0,top:20,bottom:50}
    
    var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height - margins.top-margins.bottom
        }
    console.log(graph);
    
    d3.select("svg")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var target = d3.select("#graph")
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
    drawAxes(HumanCost, graph, target, margins, xScale, yScale);
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