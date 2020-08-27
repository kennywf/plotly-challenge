// Create url path to data file
var url = "data/samples.json"

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

// Create charts
function charts(sample) {    
  d3.json(url).then((data) => {
  var samples = data.samples;
// Filter by id for each sample within samples   
  var filteredSamples = samples.filter(sampleSelection => sampleSelection.id == sample);
  var result = filteredSamples[0];

// Build horizontal bar chart with top 10 OTU
// Use .reverse() to make the first element become the last
  var trace1 = {
      x: result.sample_values.slice(0,10).reverse(),
      y: result.otu_ids.slice(0,10).map(otu_id => `OTU ${otu_id}`).reverse(),
      text: result.otu_labels.slice(0,10).reverse(),
      type: "bar",
// This line creates a horizontal bar chart 
      orientation: "h"
  };
  var data = [trace1];
  var layout = {
      title: "Top Ten OTUs for Test Subject ID: " +sample,
      hovermode: 'closest',
  };
  Plotly.newPlot("bar", data, layout);  

// Create bubble chart that displays each sample 
  var trace1 = {
      x: result.otu_ids,
      y: result.sample_values,
      text: result.otu_labels,
      mode: 'markers',
      marker: {
      size: result.sample_values,
      color: result.otu_ids,
      colorscale:"Earth"
      }
  };
  var data = [trace1];
  var layout = {
      title: 'Bacteria Cultures per Sample',
      hovermode: 'closest',
      xaxis: {title:"Operational Taxonomic Unit (OTU) ID " + sample},
  };
  Plotly.newPlot('bubble', data, layout); 
  }); 
}

// Create the metadata table
function metadataTable(sample) {
  d3.json(url).then((data) => {
      var metadata = data.metadata;
// Filter by id for each sample within metadata
      var filteredSamples = metadata.filter(sampleSelection => sampleSelection.id == sample);
      var result = filteredSamples[0];
// Use d3 to select the table section "sample-metadata"
      var tableSection = d3.select("#sample-metadata");
// Clear existing data after clicking on a different sample
      tableSection.html("");
// Add key-value pairs 
      Object.entries(result).forEach(([key, value]) => {
// Append the rows
          tableSection.append("h6").text(`${key}: ${value}`)
      })
  });
}

function optionChanged(newSample) {
// Refreshes data when clicking on a different sample
  charts(newSample);
  metadataTable(newSample);
}

function init() {
// Use d3 to select the dropdown element in the html
  var dropdown = d3.select("#selDataset");
// Add all the ID's to the dropdown
    d3.json(url).then((data) => {
      var subjectIds = data.names;
      subjectIds.forEach((id) => {
        dropdown
        .append("option")
        .text(id)
        .property("value", id);
      });
// Use the first ID for initial plots and metadata section
    const firstSubject = subjectIds[0];
    charts(firstSubject);
    metadataTable(firstSubject);
  });
}

// Initialize the dashboard
init();