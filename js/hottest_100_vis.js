function draw(geo_data) {
    "use strict";
    var margin = 50,
        width = 700,
        height = 500,
        chart_width = 400,
        chart_height = 500;

    var animation_duration = 500;

    //SVG to show the choropleth
    var svg = d3.select(".map-div")
        .append("svg")
        .attr("width", width + margin)
        .attr("height", height + margin)
        .append('g');

    //SVG to show the dimple.js chart
    var chart_svg = d3.select(".chart-div")
        .append("svg")
        .attr("width", chart_width + margin)
        .attr("height", chart_height + margin)
        .attr('class', 'chart');

    // Data can be filtered to only show the top this number of songs
    var count_filters = [100, 50, 10, 5];
    var count_filter = 100;


    // The projection to use for the choropleth
    var projection = d3.geo.mercator()
        .scale(120)
        .translate([width / 2, height / 1.3]);
    var path = d3.geo.path().projection(projection);

    // Set the ID property for each country to its name. 
    // This is needed later for joining with the song count data
    geo_data.features.forEach(function(d) {
        d["id"] = d.properties["name"];
    })


    // create a path for each country and add it to the map svg
    // The data is binded by its ID. Again this is needed so later more data can be bound
    var map = svg.selectAll('path')
        .data(geo_data.features, function(d) {
            return d["id"];
        })
        .enter()
        .append('path')
        .attr('d', path)
        .style('fill', 'white')
        .style('stroke', 'black')
        .style('stroke-width', 0.5);

    d3.csv("data/song_rankings_1993_to_2015.csv", function(data) {

        // This gets the song count for each country as a list of key/value pairs
        var nested = d3.nest()
            .key(function(d) {
                return d['Country'];
            })
            .rollup(function(leaves) {
                return leaves.length;
            })
            .entries(data)
            .sort(function(a, b) {
                return d3.descending(a.values, b.values);
            });

        //set the id property for the count data so we can 
        //bind it to the country paths by name
        nested.forEach(function(d) {
            d["id"] = d["key"];
        });

        //A dummy variable that is needed for the dimple.js stacked line plot to 
        //correctly count the number of songs
        data.forEach(function(d) {
            d["Number of Songs in Countdown"] = 1;
        })

        //create a version of the data where the countries other than the top 3 are listed as other.
        //This should make the area plot easier to read
        var top_countries = new Array;
        var number_of_top = 3;

        //find the top 3 and add them to the list
        nested.slice(0, number_of_top).forEach(function(d) {
            top_countries.push(d.key);
        });

        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
        //For each row in the original data set, make a copy of it and if the country is not in the top 3
        //set the country name to "Other"
        var data_top_only = data.map(function(d) {
            var new_d = Object.create(d);
            if (top_countries.indexOf(d.Country) == -1) {
                new_d.Country = "Other";
            }
            return new_d;
        });


        //Add the dimple stacked line chart to the page
        var myChart = new dimple.chart(chart_svg, data_top_only);
        myChart.y = 100;
        myChart.height = chart_height - 200;
        var x = myChart.addTimeAxis("x", "Year", null, "%Y");
        x.addOrderRule("Date");
        var y = myChart.addMeasureAxis("y", "Number of Songs in Countdown");
        var s = myChart.addSeries("Country", dimple.plot.area);
        myChart.addLegend(60, 10, chart_width, 100, "left");
        myChart.draw();


        // add a title to the chart
        //http://stackoverflow.com/questions/25416063/title-for-charts-and-axes-in-dimple-js-charts
        chart_svg.append("text")
            .attr("id", "title")
            .attr("x", myChart._xPixels() + myChart._widthPixels() / 2)
            .attr("y", myChart._yPixels() - 20)
            .style("text-anchor", "middle")
            .style("font-family", "sans-serif")
            .style("font-weight", "bold")
            .text("");


        // Function to show the default chart with all countries. 
        //This should be displayed when there is no mouseover
        function show_default_chart() {
            myChart.data = data_top_only.filter(function(d) {
                return d.Number <= count_filter;
            });
            chart_svg.select("#title")
                .text("");

            myChart.draw(animation_duration);
        }

        // Function to display the plot for the counts of a single country over time
        // This should be displayed when the country of interest is mouseovered
        function update_chart(selected_country) {
            myChart.data = data.filter(function(d) {
                    return d.Country == selected_country.key;
                })
                .filter(function(d) {
                    return d.Number <= count_filter;
                });

            chart_svg.select("#title")
                .text(selected_country.key);

            myChart.draw(animation_duration);


        }

        // When the one of the top count buttons is pressed this function
        // changes the button styles and replots the default chart with the count filter
        // variable changed
        function update_count_filter(n) {
            //updates the chart and country colours to only show top n songs songs
            d3.select(".filter-buttons")
                .selectAll("div")
                .transition()
                .duration(500)
                .style("background", "lightBlue");

            d3.select(this)
                .transition()
                .duration(500)
                .style("background", "yellow");


            count_filter = n;
            show_default_chart();
        }


        //create a color scale for the choropleth
        var colorScale = d3.scale.linear()
            .domain(d3.extent(nested, function(d) {
                return d.values;
            }))
            .range(['lightBlue', 'darkBlue']);


        // http://stackoverflow.com/questions/9518186/manipulate-elements-by-binding-new-data
        //http://www.stator-afm.com/tutorial/d3-js-mouse-events/
        //set the fill of the countries based on their total number of songs.
        // As the country paths and the song counts in nested share the same 'id' 
        // this can be used to bind the counts to the correct countries
        svg.selectAll('path')
            .data(nested, function(d) {
                return d["id"];
            })
            .style('fill', function(d) {
                return colorScale(d.values);
            })
            .on("mouseover", update_chart)
            .on("mouseout", show_default_chart);


        // Add the buttons to filter the top x number of songs
        var buttons = d3.select(".filter-buttons")
            .selectAll("div")
            .data(count_filters)
            .enter()
            .append("div")
            .text(function(d) {
                return "Top " + d;
            })
            .on("click", update_count_filter);

        //set the highlight on the first button to yellow because it is selected be default
        d3.select(".filter-buttons")
            .select("div")
            .style("background", "yellow");


    });
};
