// This file defines the JavaScript functions necessary to load the map using the Plotly library
// The loadMap function sends an HTTP request to the server to retrieve art data
// It calls the getMapParams function to set up the data and layout for the map
// It then uses the Plotly.plot function to render the map in the div element with an id of "map"
// The setupMapData function processes the art data into an array of dictionaries that can be used to create the map markers
// The findMapCenter function calculates the center point of the map based on the latitudes and longitudes of the art data
// The setupMapLayout function sets up the layout parameters for the map, including the map center and zoom level
// The getMapParams function calls the setupMapData and setupMapLayout functions to create the data and layout objects needed to render the map

function loadMap(){
  Plotly.setPlotConfig({mapboxAccessToken: '​pk.eyJ1IjoiZGVzbS1vIiwiYSI6ImNqdW0ybG10ejAzdDQ0M3J3dmNiZ2JwMHoifQ.qQzbOKoHGoZrVUAEY2hpwA​'});
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.readyState === 4 && this.status === 200){
      var mapParams = getMapParams(this.response);
      Plotly.plot('map', mapParams.data, mapParams.layout);
    }
  };
  xhttp.open("GET", "/art");
  xhttp.send()
}
function setupMapData(x){
  var lat = []
  var lon = []
  var text = []
  for(var i of x){
    lat.push(i[0]),
    lon.push(i[1]),
    text.push(i[2])
    var dic = [{
      type:"scattermapbox",
      mode:"markers",
      marker: {size: 5, color: "rgb(255,0,0)"},
      lat:lat,
      lon:lon,
      text:text
    }]
  }
  return dic
}

function findMapCenter(x) {
  var maxlat = 0
  var maxlon = 0
  var avg = []
  var lat = []
  var lon = []
  for(var i of x){
      lat.push(i[0]),lon.push(i[1])
  }
  maxlat = maxlat + ((Math.max.apply(null, lat) + Math.min.apply(null, lat))/2)
  maxlon = maxlon + ((Math.max.apply(null, lon) + Math.min.apply(null, lon))/2)
  avg.push(maxlat, maxlon);
  return avg
}

function setupMapLayout(x){
  var cntrpnt = findMapCenter(x);
  for(var i of cntrpnt){
    var latit = i[0];
    var longit = i[1];
  }
  var layout = {
    autosize: true,
    hovermode:'closest',
    mapbox: {
      style:"satellite-streets", 
      bearing:0,
      center: {
        lat: cntrpnt[0],
        lon: cntrpnt[1],
      },
      pitch:0,
      zoom:11,
    },
  };
return layout;}

function getMapParams(x){
  var jsonstr = JSON.parse(x)
  var dic = {}
  var dataarry = setupMapData(jsonstr);
  var layoutarry = setupMapLayout(jsonstr);
  dic.data = dataarry
  dic.layout = layoutarry
  return dic;
}