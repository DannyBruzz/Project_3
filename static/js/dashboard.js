function dropdown() {
  let commodities = ["copper", "gold", "iron_ore", "lead", "lithium", "manganese", "nickel", "silver", "tin", "zinc"]
  for (i = 0; i < commodities.length; i++){
    item = commodities[i];
    let PANEL = d3.select("#selDataset")
    PANEL.append("option").text(item);
}
}
dropdown()

d3.selectAll("#selDataset").on("change", buildBarPlot);

function buildBarPlot() {
  let dropdownMenu = d3.select("#selDataset");
  let commodity = dropdownMenu.property("value");
  d3.json("/api/dashboard/" + commodity).then(function(response) {
    let countries = [];
    let values = []
    for (i = 0; i < response.length; i++){
      row = response[i];
      countries.push(row[0]);
      values.push(row[1]);
  }
  let trace1 = {
    x: countries,
    y: values,
    type: 'bar'
  };
  let data = [trace1];
  let layout = {
    title: `Top 5 export destination for ${commodity}`,
    yaxis: {
      title: {
      text: "Export Values ($US millions)"
      }},
    xaxis: {
      title: {
      text: "Countries"
      }}
   };
  
  Plotly.newPlot("plot", data, layout);
  });}
  buildBarPlot()

