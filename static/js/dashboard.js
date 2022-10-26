function dropdown() {
  let commodities = ["copper", "gold", "iron_ore", "lead", "lithium", "manganese", "nickel", "silver", "tin", "zinc"]
  for (i = 0; i < commodities.length; i++){
    item = commodities[i];
    let PANEL = d3.select("#selDataset")
    PANEL.append("option").text(item);
}
}
dropdown()



function buildBarPlot() {
    d3.json("/api/dashboard/tin").then(function(response) {
  
      console.log(response);
    });}
    buildBarPlot()