import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // NEED TO IMPORT IT

import "../styles/_Map.scss";

const ChangeCenter = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return null;
};

const Map = ({ long, lat, position }) => {
  return (
    <div className="map-container">
      <MapContainer
        className="map"
        center={position}
        zoom={17}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          {/* display street or ward, city and country */}
          <Popup>Heloo</Popup>
        </Marker>
        <ChangeCenter position={position}></ChangeCenter>
      </MapContainer>
    </div>
  );
};

export default Map;
