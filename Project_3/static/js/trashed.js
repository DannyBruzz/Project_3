function dropdown() {
  let commodities = ["copper", "gold", "iron_ore", "lead", "lithium", "manganese", "nickel", "silver", "zinc"]
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
  commoditybar(commodity) 
  d3.json("/api/dashboard/" + commodity).then(function(response) {
    let countries = [];
    let values = [];
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
  });
  
}
  buildBarPlot()

  function commoditybar(commodity) {
  let PANEL = d3.select("#sample-metadata");
  PANEL.html("");
  d3.json("/api/dashboard/commodities").then(function (response) {
    let searchTerm = [];
    if (commodity === "copper") {
      searchTerm.push("Copper")
    }
    else if (commodity === "gold") {
      searchTerm.push("Gold")
    }
    else if (commodity === "iron_ore") {
      searchTerm.push("Iron Ore")
    }
    else if (commodity === "lead") {
      searchTerm.push("Lead")
    }
    else if (commodity === "lithium") {
      searchTerm.push("Lithium")
    }
    else if (commodity === "manganese") {
      searchTerm.push("Manganese")
    }
    else if (commodity === "nickel") {
      searchTerm.push("Nickel")
    }
    else if (commodity === "silver") {
      searchTerm.push("Silver")
    }
    else if (commodity === "tin") {
      searchTerm.push("Silver")
    }
    else if (commodity === "zinc") {
      searchTerm.push("Zinc")
    }
    console.log(searchTerm);

    for (i = 0; i < response.length; i++){
      row = response[i];
      if (row[1] === searchTerm){
        PANEL.append("h6").text(`Commodity: ${row[1]}`);
        console.log(row[1]);
        PANEL.append("h6").text(`Current price: ${row[2]}`);
        console.log(row[2]);
        PANEL.append("h6").text(`Q4/22: $${row[3]}`);
        console.log(row[3]);
        PANEL.append("h6").text(`Q1/23: $${row[4]}`);
        console.log(row[4]);
        PANEL.append("h6").text(`Q2/23: $${row[5]}`);
        console.log(row[5];
        PANEL.append("h6").text(`Q/23: $${row[6]}`);
        console.log(row[6]);
      }}
  })};
  
  