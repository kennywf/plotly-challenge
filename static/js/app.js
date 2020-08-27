function biodiversityData () {
const url = '/data/samples.json';

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
  });
}
  
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}


