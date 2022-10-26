function buildBarPlot() {
    const url = "/api/dashboard";
    d3.json(url).then(function(response) {
  
      console.log(response);
    });}
    buildBarPlot()