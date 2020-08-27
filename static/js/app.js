const url = '/data/samples.json';

function biodiversityData (sample) {

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
  });
}

// Build horizontal bar chart with top 10 OTU
function bar(sample) {
  d3.json(url).then(function(data) {
    // Slice up to 10 samples
    var hoverText = samples.otu_labels.slice(0,10);
    var trace1 = {
      x: samples.otu_ids.slice(0,10),
      y: samples.sample_values.slice(0,10),
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

//Build the bubble chart 
function bubble(sample) {
  d3.json(url).then(function(data) {
    var trace2 = {
      x: data.samples.otu_ids,
      y: data.samples.sample_values,
      mode: 'markers',
      marker: {
        size: data.samples.sample_values,
        color: data.samples.otu_ids},
      text: data.samples.otu_labels
};

var data = [trace2]

var layout = {
  title: "OTU_IDs"
};

Plotly.newPlot('myDiv', data, layout);
});
}

// Create the metadata table
function createTable(sample) {
d3.json(url).then(function(data){
  const metadata_sample = d3.select("#sample-metadata")
// Clear any existing metadata
  metadata_sample.html("");
// Add key and value pairs
  Object.entries(sample_data).forEach(function ([key,value]){
    const row = metadata_sample.append("p");
    row.text(`${key}: ${value}`);
  });
});
}