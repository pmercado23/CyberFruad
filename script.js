//Width and height
var w = 650;
var h = 400;





//Define map projection
var projection = d3.geo.albersUsa()
    .translate([w / 2, h / 2])
    .scale([700]);

//Define path generator
var path = d3.geo.path()
    .projection(projection);

//Define quantize scale to sort data values into buckets of color
var color = d3.scale.quantize()
    .range(["rgb(237,248,233)", "rgb(186,228,179)", "rgb(116,196,118)", "rgb(49,163,84)", "rgb(0,109,44)"]);
//Colors taken from colorbrewer.js, included in the D3 download

//Create first map SVG element
var svg1 = d3.select("body")
    .append("svg")
    .style("width", screen.availWidth / 2)
    .style("height", screen.availHeight / 2)
    .style("float", "left");

//Create second map SVG element
var svg2 = d3.select("body")
    .append("svg")
    .style("width", screen.availWidth / 2)
    .style("height", screen.availHeight / 2)
    .style("float", "right")
    .style("background", "white");

//Create first pie chart SVG element
var svg3 = d3.select("body")
    .append("svg")
    .style("width", screen.availWidth / 4)
    .style("height", screen.availHeight / 4)
    .style("float", "left")
    .style("background", "blue");

//Create second pie chart SVG element
var svg4 = d3.select("body")
    .append("svg")
    .style("width", screen.availWidth / 4)
    .style("height", screen.availHeight / 4)
    .style("float", "left")
    .style("background", "black");

//Create second pie chart SVG element
var svg5 = d3.select("body")
    .append("svg")
    .style("width", screen.availWidth / 4)
    .style("height", screen.availHeight / 4)
    .style("float", "right")
    .style("background", "purple");

//Create second pie chart SVG element
var svg6 = d3.select("body")
    .append("svg")
    .style("width", screen.availWidth / 4)
    .style("height", screen.availHeight / 4)
    .style("float", "right")
    .style("background", "green");

//Define Tooltip
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  d3.csv("datasetfor2012.csv", function (data) {

    //Set input domain for color scale
    color.domain([
					d3.min(data, function (d) {
            return d.value;
        })


        
        , d3.max(data, function (d) {
            return d.value;
        })
				]);

    //Load in GeoJSON data
    d3.json("us-states.json", function (json) {

        //Merge the ag. data and GeoJSON
        //Loop through once for each ag. data value
        for (var i = 0; i < data.length; i++) {

            //Grab state name
            var dataState = data[i].state;

            //Grab data value, and convert from string to float
            var dataValue = parseFloat(data[i].value);

            //Find the corresponding state inside the GeoJSON
            for (var j = 0; j < json.features.length; j++) {

                var jsonState = json.features[j].properties.name;

                if (dataState == jsonState) {

                    //Copy the data value into the JSON
                    json.features[j].properties.value = dataValue;

                    //Stop looking through the JSON
                    break;

                }
            }
        }

        //Bind data and create one path per GeoJSON feature
        svg1.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", function (d) {
                //Get data value
                var value = d.properties.value;

                if (value) {
                    //If value exists…
                    return color(value);
                } else {
                    //If value is undefined…
                    return "#ccc";
                }
            })
        
        
            .on("mouseover", function (d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html("" + d.properties.state + "<br>" + "Total Lost: " + d.value + " dollars" + "<br>" + "Main Target: " + d.state + "<br>" + "Main Target lost: " + d.value + "dollars")
                    .style("left", (d3.event.pageX + 5) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
        
             
             

    });

});

  d3.csv("datasetfor2014.csv", function (data) {

    //Set input domain for color scale
    color.domain([
					d3.min(data, function (d) {
            return d.value;
        })


        
        , d3.max(data, function (d) {
            return d.value;
        })
				]);

    //Load in GeoJSON data
    d3.json("us-states.json", function (json) {

        //Merge the ag. data and GeoJSON
        //Loop through once for each ag. data value
        for (var i = 0; i < data.length; i++) {

            //Grab state name
            var dataState = data[i].state;

            //Grab data value, and convert from string to float
            var dataValue = parseFloat(data[i].value);

            //Find the corresponding state inside the GeoJSON
            for (var j = 0; j < json.features.length; j++) {

                var jsonState = json.features[j].properties.name;

                if (dataState == jsonState) {

                    //Copy the data value into the JSON
                    json.features[j].properties.value = dataValue;

                    //Stop looking through the JSON
                    break;

                }
            }
        }

        //Bind data and create one path per GeoJSON feature
        svg2.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", function (d) {
                //Get data value
                var value = d.properties.value;

                if (value) {
                    //If value exists…
                    return color(value);
                } else {
                    //If value is undefined…
                    return "#ccc";
                }
            })
            .on("mouseover", function (d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html("" + d.properties.state + "<br>" + "Total Lost: " + d.value + " dollars" + "<br>" + "Main Target: " + d.state + "<br>" + "Main Target lost: " + d.value + "dollars")
                    .style("left", (d3.event.pageX + 5) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
        

    });

});
