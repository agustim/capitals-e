var fs = require('fs');

// Load geojson/as-countries.geo.json and geojson/llistat_asia.json

var countries = JSON.parse(fs.readFileSync('geojson/countries.geojson'));
const myList = JSON.parse(fs.readFileSync('geojson/llistat_africa.json'));

var defCountries = { "type": "FeatureCollection", "features": [] };
// list of countries in as-counties.geo.json
// Busquem myList.orig en countries.features.properties.ADMIN
// Si trobem, afegim a myList el nom del país i les coordenades

for (let i = 0; i < myList.length; i++) {
  for (let j = 0; j < countries.features.length; j++) {
    if (myList[i].orig === countries.features[j].properties.ADMIN) {
      countries.features[j].properties.name = myList[i].name;
      countries.features[j].properties.capital = myList[i].capital;
      countries.features[j].properties.lat = myList[i].lat;
      countries.features[j].properties.lon = myList[i].lon;
      countries.features[j].properties.zoom = myList[i].zoom;
      defCountries.features.push(countries.features[j]);
    }
  }
}

fs.writeFileSync('geojson/af-countries.geo.json', JSON.stringify(defCountries));

defCountries.features.forEach((country, index) => {
  console.log(country.properties.name +" "+ country.properties.ADMIN);
});