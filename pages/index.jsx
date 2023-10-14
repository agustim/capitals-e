import React from "react";
import Map from "../components/Map";
import {
  Page,
  Navbar,
  List,
  ListInput
} from "konsta/react";

import data from "../geojson/eu-countries.geo.json";


function HomePage() {


  data.features.forEach(function (feature) {
    console.log(feature.properties.name);
  });
  
  return (
    <Page>
      <Navbar
        title="Capitals Europa"
      />
      <List strongIos insetIos className="my-0 !ml-0-safe !mr-0-safe">
        <ListInput
          type="text"
          placeholder="Capital"
        />

        <ListInput
          type="text"
          placeholder="País"
        />
      </List>
      <Map />
    </Page>
  );
};

export default HomePage