import React, { useEffect, useState, useRef } from "react";
import Map from "../components/Map";
import {
  Page,
  Navbar,
  List,
  ListInput,
  Block,
  Button,
  Popup,
  Link,
  ListItem
} from "konsta/react";

import data from "../geojson/eu-countries.geo.json";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { get } from "https";

function HomePage() {
  const { paisos, setPaisos, checkPais, setOriginalPaisos, encerts, ajudes, setAjudes, getPais, getCapital, selectPais } = useGlobalContext();
  const paisForm = useRef();
  const capitalForm = useRef();
  const [mostrarAjudes, setMostrarAjudes] = useState(false);


  useEffect(() => {
    setOriginalPaisos(data.features);
    let local_names = [];
    let localPaisos = [];
    data.features.map((feature, index) => {
      local_names.push(feature.properties.name);
      console.log(feature.properties.name);
      localPaisos.push({ idGeojson: index, nom: feature.properties.name, 
                         capital: feature.properties.capital, feta: false,
                         lat: feature.properties.lat, lon: feature.properties.lon });
    });
    local_names.sort();
    console.log(local_names);
    setPaisos(localPaisos);
    console.log(localPaisos)
    console.log("data:", data.features.length);
  }, [])


  const onCheckPais = () => {
    const paisField = paisForm.current.inputEl;
    const capitalField = capitalForm.current.inputEl;
    if (checkPais(paisField.value, capitalField.value)) {
      paisField.value = "";
      capitalField.value = "";
    }
  }

  const ajuda = () => {
    setMostrarAjudes(true);
    setAjudes(ajudes + 1);
  }
  const closeAjuda = () => {
    selectPais();
    setMostrarAjudes(false);
  }
    

  return (
    <Page>
      <Navbar
        title={`Capitals Europa ${encerts}/${ajudes}`}
      />
      <List strongIos insetIos className="llista !ml-0-safe !mr-0-safe">
        <ListInput
          type="text"
          placeholder="País"
          ref={paisForm}
        />
        <ListInput
          type="text"
          placeholder="Capital"
          ref={capitalForm}
        />
      </List>
      <Block className="flex space-x-1 !space-y-0 py-0 mb-0 mt-0">
        <Button className="!w-1/2 py-8" 
                onClick={() => onCheckPais()}>Comprovar</Button>
        <Button className="!w-1/2 py-8" 
                onClick={() => ajuda()}>Ajuda</Button>
      </Block>
      <Map countries={data.features} />

      <Popup opened={mostrarAjudes} onBackdropClick={() => closeAjuda()}>
        <Page>
          <Navbar
            title="Ajudda"
            right={
              <Link navbar onClick={() => closeAjuda()}>
                X
              </Link>
            }
          />
          <Block className="space-y-4">
            <List strongIos insetIos>
              <ListItem title={`Pais: ${getPais()}`}/>
              <ListItem title={`Capital: ${getCapital()}`}/>
            </List>
          </Block>
        </Page>
      </Popup>
    </Page>
  );
};

export default HomePage;