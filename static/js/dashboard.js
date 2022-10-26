function buildBarPlot() {
    d3.json("/api/dashboard/tin").then(function(response) {
  
      console.log(response);
    });}
    buildBarPlot()