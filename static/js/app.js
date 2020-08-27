const url = '/data/samples.json';

function biodiversityData () {

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
  });
}

// Build horizontal bar chart with top 10 OTU
function barChart() {
  d3.json(url).then(function(data) {
    // Slice up to 10, and reverse it to get top down 
    var chartValue = unpack(samples.otu_ids.slice(0,10).reverse());
    var chartLabels = unpack(samples.sample_values.slice(0,10).reverse());
    var hoverText = unpack(samples.otu_labels.slice(0,10).reverse());
    var trace1 = {
      x: chartValue, 
      y: chartLabels,
      orientation: h,
      marker: {
        color: 'rgba(55,128,191,0.6)'},
      type: "bar"
    }

var data = [trace1];

var layout = {
  title: "Top 10 OTU's"
};

Plotly.newPlot("plot", data, layout);
});
}

init();