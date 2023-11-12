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
// import data from "../geojson/demo-countries.json";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { get } from "https";

function HomePage() {
  const { paisos, setPaisos, checkPais, setOriginalPaisos, encerts, ajudes,
    setAjudes, getPais, getCapital, selectPais, nextPais, marcarPaisActiuFet, debugPaisos, 
    comptarPaisosNoFets, netejarPaisos } = useGlobalContext();
  const paisForm = useRef();
  const capitalForm = useRef();
  const [mostrarAjudes, setMostrarAjudes] = useState(false);
  const [mostrarError, setMostrarError] = useState(false);
  const [finalPartida, setFinalPartida] = useState(false);

  const [ajudaPais, setAjudaPais] = useState("");
  const [ajudaCapital, setAjudaCapital] = useState("");

  useEffect(() => {
    setOriginalPaisos(data.features);
    let local_names = [];
    let localPaisos = [];
    data.features.map((feature, index) => {
      local_names.push(feature.properties.name);
      console.log(feature.properties.name);
      localPaisos.push({
        idGeojson: index, nom: feature.properties.name,
        capital: feature.properties.capital, feta: false,
        lat: feature.properties.lat, lon: feature.properties.lon,
        zoom: feature.properties.zoom
      });
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
      if (comptarPaisosNoFets() === 0) {
        setFinalPartida(true);
      }
    } else {
      setMostrarError(true);
      setTimeout(() => {
        setMostrarError(false);
      }, 3000);
    }
  }

  const ajuda = () => {
    setAjudaPais(getPais());
    setAjudaCapital(getCapital());
    setMostrarAjudes(true);
    setAjudes(ajudes + 1);
    marcarPaisActiuFet();
    debugPaisos();
  }
  const closeAjuda = () => {
    setMostrarAjudes(false);
    setAjudaPais("");
    setAjudaCapital("");
    const paisField = paisForm.current.inputEl;
    const capitalField = capitalForm.current.inputEl;
    paisField.value = "";
    capitalField.value = "";
    if (comptarPaisosNoFets() === 0) {
      setFinalPartida(true);
    } else {
      selectPais();
    }
  }

  const closeFinal = () => {
    setFinalPartida(false);
  }

  const restartPartida = () => {
    netejarPaisos();
    closeFinal();
    setTimeout(() => {
      selectPais();
    }, 500);
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
            title="Ajuda"
            right={
              <Link navbar onClick={() => closeAjuda()}>
                X
              </Link>
            }
          />
          <Block className="space-y-4">
            <List strongIos insetIos>
              <ListItem title={`Pais: ${ajudaPais}`} />
              <ListItem title={`Capital: ${ajudaCapital}`} />
            </List>
          </Block>
        </Page>
      </Popup>

      <Popup opened={mostrarError} onBackdropClick={() => setMostrarError(false)}>
        <Page>
          <Navbar
            title="Incorrecte"
            right={
              <Link navbar onClick={() => setMostrarError(false)}>
                X
              </Link>
            }
          />
          <Block className="space-y-4 text-center">
            {/* <List strongIos insetIos>
              <ListItem title={`Pais: ${getPais()}`}/>
              <ListItem title={`Capital: ${getCapital()}`}/>
            </List> */}
            <Block>
              <h1>El país o la capital no son correctes.</h1>
            </Block>
          </Block>
        </Page>
      </Popup>

      <Popup opened={finalPartida} onBackdropClick={() => closeFinal()}>
        <Page>
          <Navbar
            title="Final"
            right={
              <Link navbar onClick={() => closeFinal()}>
                X
              </Link>
            }
          />
          <Block className="space-y-4">
            <div className="text-xl">Ja hem repassat tots els països!</div>
            <div className="pb-2">Tots els països han estat preguntats, vols que torni a preguntar-te&apos;ls?</div>
            <Block className="flex space-x-1 !space-y-0 py-0 mb-0 mt-0">
              <Button className="!w-1/2 py-8"
                onClick={() => restartPartida()}>Sí</Button>
              <Button className="!w-1/2 py-8"
                onClick={() => closeFinal()}>No</Button>
            </Block>
          </Block>
        </Page>
      </Popup>
    </Page>
  );
};

export default HomePage;