var fs = require('fs');

// Load geojson/as-countries.geo.json and geojson/llistat_asia.json

var asCountries = JSON.parse(fs.readFileSync('geojson/as-countries.geo.origin.json'));
const asList = JSON.parse(fs.readFileSync('geojson/llistat_asia.json'));

// list of countries in as-counties.geo.json


for (let i = 0; i < asList.length; i++) {
  asCountries.features[i].properties.name = asList[i].name;
  asCountries.features[i].properties.capital = asList[i].capital
}

fs.writeFileSync('geojson/as-countries.geo.json', JSON.stringify(asCountries));

asCountries.features.forEach((country, index) => {
  console.log(country.properties.name +" "+ country.properties.ADMIN);
});