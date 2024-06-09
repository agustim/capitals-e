const group_select = "geojson/llistat_oceania.json";
const output_geojson = "geojson/oc-countries.geo.json";
const all_countries = "geojson/countries.geojson";


var fs = require('fs');

// Load geojson/as-countries.geo.json and geojson/llistat_asia.json

var countries = JSON.parse(fs.readFileSync(all_countries));
const myList = JSON.parse(fs.readFileSync(group_select));

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

fs.writeFileSync(output_geojson, JSON.stringify(defCountries));

defCountries.features.forEach((country, index) => {
  console.log(country.properties.name +" "+ country.properties.ADMIN);
});