import "leaflet/dist/leaflet.css"
import { MapContainer, Marker, Polygon, Popup, TileLayer, GeoJSON } from "react-leaflet";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { useEffect, useState } from "react";
import { Preloader } from "konsta/react";

function Map({ countries }) {

  const { paisActiu, setPaisActiu } = useGlobalContext()
  const [reload, setReload] = useState(false)
  const position = [49, 10]


  useEffect(() => {
    console.log("From Map Pais actiu: ", paisActiu)
    setReload(true)
  }, [paisActiu])


  if (reload) {
    setTimeout(() => { console.log("timeout"); setReload(false); }, 1000);
    return ( <Preloader /> );
  } else {
    return (
      <MapContainer center={position} zoom={3} scrollWheelZoom={false}>
        <TileLayer
          attribution="&copy; Agustí Moll"
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
        />
        {
          (paisActiu !== null) &&
          <GeoJSON data={countries[paisActiu]} />
        }
      </MapContainer>
    );
  }
}

export default Map