(function() {


var sum = 0

var margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
    },
    width = 2000 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom;
   
   const color = d3.scaleOrdinal(d3.schemeCategory10);

// change this to read in ./movieData2.csv to see how D3 can dynamically add elements for the new data!
d3.csv("./movieData2.csv")
    .then(function (data) {
        console.log(data);

        // svg that contains large labels on left side of page
        var svg = d3.select("body").append("svg")
            .attr("viewBox", "0 0 1960 760")
            .attr("width", "100%")
            .attr("height", "5000")
            .attr("preserveAspectRatio", "xMidYMin meet")

        // append g tag to contain rectangles and text
        var listings = svg.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr('id', function(d) {
                return d.Type;
            })

        // rectangles that will surround the "Star Wars Episode" text
        var rects = listings.append("rect")
            .data(data)
            .attr("width", "50%")
            .attr("height", "15%")
            .attr('id', function(d) {
                return d.Type;
            })  
            .attr("y", function(d, i) {
                return i * this.getBBox().height;
            })
            .style("fill", function (d, i) {
                return color(i);
            })
            .style("opacity", 1)
            .attr("stroke", "black")
            .attr("stroke-width", "5px");
            
        // text inside the rectangles: eg "Star Wars Episode..."
        var texts = listings.append("text")
            .data(data)
            .attr("x", function(d, i) {
                return (width/15) })
            .attr("y", function(d, i) {
                return ((rects.nodes()[0].getBBox().height) * i + 60)
            } )
            .text(function(d) {
                return d.Title + ": " + d.Type + ": $" + d.Price;
            })
            .attr("font-size", "50px");
        
        // svg for displaying Total Price text
        var totalPrice = d3.select('body').append('svg')
            .attr("viewBox", "0 -100 200 200")
            .attr("width", "300")
            .attr("height", "100")
            .attr("id", "TotalSVG")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .style('position', 'absolute')
            .style('top', "40%")
            .style("left", "70%")
            .append("g")
            .append("text")
            .attr("class", "totalPrice")
            .text("Total: $0.00")
            .attr("font-size", "75px")
        // svg for displaying discount info (bottom left of page) #1
        var discountInfo = d3.select('body').append('svg')
            .attr("viewBox", "0 -100 200 200")
            .attr("width", "500")
            .attr("height", "100")
            .attr("id", "discountInfoSVG")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .style('position', 'absolute')
            .style('top', "65%")
            .style("left", "70%")
            .append("g")
            .append("text")
            .text("Buy all DVDs (10%) or ")
            .attr("font-size", "50px")
        // svg for displaying discount info (bottom left of page) #2
        var discountInfo2 = d3.select('body').append('svg')
            .attr("viewBox", "0 -100 200 200")
            .attr("width", "500")
            .attr("height", "100")
            .attr("id", "discountInfo2SVG")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .style('position', 'absolute')
            .style('top', "70%")
            .style("left", "73.15%")
            .append("g")
            .append("text")
            .text("all Blu-Rays (15%) for a discount!")
            .attr("font-size", "50px")
        var discountInfo2 = d3.select('body').append('svg')
            .attr("viewBox", "0 -100 200 200")
            .attr("width", "500")
            .attr("height", "100")
            .attr("id", "discountInfo2SVG")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .style('position', 'absolute')
            .style('top', "75%")
            .style("left", "70%")
            .append("g")
            .append("text")
            .text("Buy 100 total for a 5% discount!")
            .attr("font-size", "50px")
        // discount Applied text - only visible when discount is present
        var discountApplied = d3.select('body').append('svg')
            .attr("viewBox", "0 -100 200 200")
            .attr("width", "500")
            .attr("height", "100")
            .attr("id", "applied")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .style('position', 'absolute')
            .style('top', "30%")
            .style("left", "70%")
            .append("g")
            .append("text")
            .text("Discount Applied!")
            .attr("id", "discount")
            .attr("font-size", "50px")
            .style("visibility", "hidden");

        var inputDiv = d3.select('body').append('div');

        // places the divs that will hold the inputs 
        var inputDivs = inputDiv.selectAll('div')
            .data(data)
            .enter()
            .append('div')
            .attr("class", "a")
            .style('width', "100px")
            .style('height', "75px")
            .attr('id', function(d) {
                return d.Type;
            })
            .style("text-anchor", "middle")
            .style('position', 'absolute')
            .style('top', function(d, i) {
                return ("calc(" + 12.2 * i + "% + 125px)");
            })
            .style('left', "53%")


        // places the input number boxes - D3 does not seem to allow size changing of number input boxes - maybe could accomplish with css?
        var inputs = inputDivs.append('input')
            .data(data)
            .attr("id", function(d) {
                return d.Price;
            })
            .attr('type', 'number')
            .attr("stroke", "black")
            .attr("stroke-width", "5px")
            .attr("placeholder", '0')
            .attr("class", function(d, i) {
                return ("input" + i + " " + d.Type);
            })
            .on("change", function(d){
                calcPrice(this);
            })
            .style('background-color', function(d, i) {
                return color(i);
            })

        // text to show individual costs below each input
        var price = inputDivs
            .data(data)
            .append("text")
            .attr("text-anchor", "middle")
            .attr("width", "240px")
            .text(function(d) {
                return ("Price: $0");
            })
            .attr('id', function(d) {
                return d.Type;
            })
            .attr("class", function(d, i) {
                return ("input" + i);
            });
        



        });

        // calcPrice is called whenever a change is made to any input's value
        var calcPrice = function(input) {
            updateTotalPrice(sum);
            // selects the text box under the input with the same [0]th classname, eg input0 input1, and updates text
            var className = d3.select(input).attr("class").split(" ")[0];
            d3.selectAll("text." + className)
                .text(function(d) {
                    return "Price: $" + (input.value * parseFloat(d3.select(input).attr("id")));
                })
            
        };

        // used to calculate the total price of all goods
        var updateTotalPrice = function(sum) {
            var savings = 0;
            var totalBought = 0;
            var tempSum = 0;
            var discountDVD = true;
            var discountBlu = true;
            var bulkDiscount = false;
            //Calculate Prices while checking for Discounts
            //for DVDs
            for (x in d3.selectAll("input.DVD").nodes()) {
                var selectedInput = d3.selectAll("input.DVD").nodes()[x];
                tempSum += selectedInput.value * parseFloat(d3.select(selectedInput).attr("id"));
                if (selectedInput.value == 0 || selectedInput.value.length == 0) {
                    discountDVD = false;
                } else {
                    // if there is an input value, add to the total amount ordered
                    totalBought += parseInt(selectedInput.value);
                }
            };
            // Apply discount if necessary
            if (discountDVD) {
                savings += tempSum * .1;
                tempSum *= .9;
            }
            sum += tempSum;


            tempSum = 0;
            // for Blu-Rays
            for (x in d3.selectAll("input.Blu-Ray").nodes()) {
                var selectedInput = d3.selectAll("input.Blu-Ray").nodes()[x];
                tempSum += selectedInput.value * parseFloat(d3.select(selectedInput).attr("id"));
                if (selectedInput.value == 0 || selectedInput.value.length == 0) {
                    discountBlu = false;
                } else {
                    totalBought += parseInt(selectedInput.value);
                }
            };
            if (discountBlu) {
                savings += tempSum * .15;
                tempSum *= .85;
            }
            sum += tempSum;

            //check for mass discount, applied after all other discounts          
            if (totalBought >= 100) {
                savings += sum * .05;
                bulkDiscount = true;
                sum *= .95;
            }

            // if discount, display the discount applied text
            if (bulkDiscount || discountDVD || discountBlu) {
                console.log(d3.select("text#discount"));
                d3.select("text#discount")
                    .style("visibility", "visible")
                    .text("Discount Applied! Savings: $" + savings.toFixed(2));
            } else {
                d3.select("text#discount")
                    .style("visibility", "hidden");
            };


            //updates text displaying total price
            d3.selectAll(".totalPrice")
                .text(function(d) {
                    return "Total: $" + sum.toFixed(2);
                })
        };



})();