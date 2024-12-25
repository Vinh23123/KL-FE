import ReactMapGL, { Popup } from "@goongmaps/goong-map-react";
import { useEffect, useState } from "react";
import { GOONG_API_KEY } from "../configs/KEYS";
import apiClient from "../services/apiClient";
import { Spinner } from "@phosphor-icons/react";
import PropTypes from "prop-types";

const MapComponent = ({ width = "100%", height = "900px", position }) => {
  const [address, setAddress] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPopup, togglePopup] = useState(true);
  const [viewport, setViewport] = useState({
    longitude: -122.45,
    latitude: 37.78,
    zoom: 14,
  });
  console.log("Position", position);

  useEffect(() => {
    if (position?.longitude && position?.latitude) {
      setViewport((prev) => ({
        ...prev,
        zoom: 15,
        longitude: position.longitude,
        latitude: position.latitude,
      }));
    }
  }, [position?.longitude, position?.latitude]); // Only re-run when `position` changes

  // useEffect(() => {
  //   const convertLocationToAddress = async (latitude, longitude) => {
  //     try {
  //       setIsLoading(true);
  //       const response = await apiClient.post(`/locations/convert-location`, {
  //         latitude: latitude,
  //         longitude: longitude,
  //       });
  //       // console.log(
  //       //   "Data location convert: ",
  //       //   JSON.stringify(response.data.data, null, 2)
  //       // );
  //       setAddress(response.data.data);
  //       setIsLoading(false);
  //     } catch (error) {
  //       setError(error);
  //       setIsLoading(false);
  //       console.error(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   if (position?.longitude && position?.latitude) {
  //     convertLocationToAddress(position?.latitude, position?.longitude);
  //   }
  // }, [position?.longitude, position?.latitude]);

  // console.log("Location", position);

  if (isLoading) return <Spinner />;

  return (
    <ReactMapGL
      {...viewport}
      width={width}
      height={height}
      goongApiAccessToken={GOONG_API_KEY}
      onViewportChange={(newViewport) => setViewport(newViewport)} // Update viewport interactively
    >
      {showPopup && (
        <Popup
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          closeButton={true}
          closeOnClick={false}
          onClose={() => togglePopup(false)}
          anchor="top"
        >
          <div>{position?.formattedAddress}</div>
        </Popup>
      )}
    </ReactMapGL>
  );
};

MapComponent.prototype = {
  with: PropTypes.string,
  height: PropTypes.string,
  position: PropTypes.shape({
    longitude: PropTypes.number,
    latitude: PropTypes.number,
  }).isRequired,
};

export default MapComponent;
