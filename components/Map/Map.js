import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

function Map() {

  const position = [49, 10]

  return(
    <MapContainer center={position} zoom={3} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; Agustí Moll'
        urlOld="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
      />
    </MapContainer>
  )
}

export default Map