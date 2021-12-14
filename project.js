let responseCount= 0;
const labels =[];
//    console.log("labels");
//    console.log(labels);

let superSector = {
  "00": "Total nonfarm",
  "05": "Total private",
  "06": "Goods-producing",
  "07": "Service-providing",
  "08": "Private service-providing",
  "10": "Mining and logging",
  "20": "Construction",
  "30": "Manufacturing",
  "31": "Durable Goods",
  "32": "Nondurable Goods",
  "40": "Trade, transportation, and utilities",
  "41": "Wholesale trade",
  "42": "Retail trade",
  "43": "Transportation and warehousing",
  "44": "Utilities",
  "50": "Information",
  "55": "Financial activities",
  "60": "Professional and business services",
  "65": "Education and health services",
  "70": "Leisure and hospitality",
  "80": "Other services",
  "90": "Government"
};

// These are colors from chart.js utils
    const CHART_COLORS = {
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 205, 86)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)',
      darkgreen: 'rgb(4, 33, 2)',
      lemon: 'rgb(255,232,61)',
      purplegrey: 'rgb(75, 66, 84)',
      bluegrey: 'rgb(37, 39, 59)',
      redgrey: 'rgb(92, 59, 58)',
      browngrey: 'rgb(97, 86, 78)',
      aquamarine: 'rgb(0,255,170)',
      teal: 'rgb(32,125,94)',
      royalpurple: 'rgb(65,32,125)',
      darkblue: 'rgb(10, 10, 107)',
      olivegreen: 'rgb(41,71,36)',
      maroon: 'rgb(94,0,0)',
      forestgreen: 'rgb(0, 173, 46)',
      brown: 'rgb(120,76,0)',
      hotpink: 'rgb(255,0,255)',
      redorange: 'rgb(255,109,64)',
    };
//    console.dir(CHART_COLORS);

    let chartColorsArray= Object.keys(CHART_COLORS)
    const CHART_COLORS_50_Percent = {
      red: 'rgba(255, 99, 132, 0.5)',
      orange: 'rgba(255, 159, 64, 0.5)',
      yellow: 'rgba(255, 205, 86, 0.5)',
      green: 'rgba(75, 192, 192, 0.5)',
      blue: 'rgba(54, 162, 235, 0.5)',
      purple: 'rgba(153, 102, 255, 0.5)',
      grey: 'rgba(201, 203, 207, 0.5)',
      darkgreen: 'rgba(4, 33, 2, 0.5)',
      lemon: 'rgba(255,232,61, 0.5)',
      purplegrey: 'rgba(75, 66, 84, 0.5)',
      bluegrey: 'rgba(37, 39, 59, 0.5)',
      redgrey: 'rgba(92, 59, 58, 0.5)',
      browngrey: 'rgba(97, 86, 78, 0.5)',
      aquamarine: 'rgba(0,255,170, 0.5)',
      teal: 'rgba(32,125,94, 0.5)',
      royalpurple: 'rgba(65,32,125, 0.5)',
      darkblue: 'rgba(10, 10, 107, 0.5)',
      olivegreen: 'rgba(41,71,36, 0.5)',
      maroon: 'rgba(94,0,0, 0.5)',
      forestgreen: 'rgba(0, 173, 46, 0.5)',
      brown: 'rgba(120,76,0, 0.5)',
      hotpink: 'rgba(255,0,255, 0.5)',
      redorange: 'rgba(255,109,64, 0.5)',
    };
//    console.log(CHART_COLORS_50_Percent);
//    end utils

    const data = {
      labels: labels,
      datasets: []
    };
  //  console.dir(data);

    const config = {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Number of Employees (thousands)'
          }
        }
      }
    };
//    console.log(config);
let x= 0
function drawChart(){
    const myChart = new Chart(
      document.getElementById('myChart'),
        config);
//    console.dir(myChart);
//    console.log("Ending");
    }

    function responseReceivedHandler() {
      if (this.status == 200) {
        console.log(this.response);
        let datasetElement= {
          label: 'Sample Label',
          data: [],
          borderColor: CHART_COLORS[chartColorsArray[responseCount]],
          backgroundcolor: CHART_COLORS_50_Percent[chartColorsArray[responseCount]], hidden: true 
        }
      console.log("here");
      console.log(this.response.Results)
      if (this.response.status == "REQUEST_SUCCEEDED") {
      let superSectorID= this.response.Results.series[0].seriesID;
      datasetElement.label = superSector[superSectorID.substring(3,5)];
      let dataArray= this.response.Results.series[0].data;
      for (let i = dataArray.length-1;i>=0;i--) {
        if (responseCount==0){
          labels.push(dataArray[i].periodName+" /" + dataArray[i].year);
        }
        datasetElement.data.push(dataArray[i].value);
      } 
      responseCount++;
      data.datasets.push(datasetElement);
      if (responseCount == Object.keys(superSector).length){
        drawChart();
      }
      console.log(this.response);
    }
    else if (this.response.status === "REQUEST_NOT_PROCESSED"){
      x=x+1
      if (x==22) {
        alert("Sorry, your API key seems to be invalid. Please follow the registration link from the Getting Started Page of the US Department of Labor Statistics Webpage to obtain an API key. The information can be found here: https://www.bls.gov/developers/. After registering you will receive an email to validate your key. After validating, your key will be what is after 'https://data.bls.gov/registrationEngine/validateKey/' and before the '~~~{your email address}. Once you have confirmed you have the correct API key, click 'Ok' and try again!")
        window.location.reload()
      }
    }
  }
      else{
        console.log ("error");
      }
    
}
  function API(input){
    let SuperSectorKeys = Object.keys(superSector);
    for (let i=0;i< SuperSectorKeys.length; i++) {
      let xhr = new XMLHttpRequest();
      xhr.responseType = "json";
      xhr.addEventListener("load", responseReceivedHandler);
      let startquery =  "https://api.bls.gov/publicAPI/v2/timeseries/data/CEU";
      let endquery= "00000001?registrationkey=" + input;
      let link =startquery + SuperSectorKeys[i]+endquery
      xhr.open("GET", link, true);
      xhr.send();
    }
  }

API(prompt("Enter your API Key"))
