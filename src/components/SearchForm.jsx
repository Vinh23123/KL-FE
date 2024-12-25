// If the parent component of SearchForm is re-rendering due to state changes,
//  it will cause the SearchForm component to re-render as well, resulting in the loss of focus.
// The handleOnChange function updates the state via onSetState. If this state is directly tied to the parent component's render cycle,
// it triggers a re-render every time the input value changes

import { useEffect, useState } from "react";
import { debounce } from "../helpers/debounce";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../services/apiClient";
import MapComponent from "./MapComponent";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";
import Modal from "../components/Modal";

const SearchForm = ({ width = 400, onStepChange, locationId }) => {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [address, setAddress] = useState("");
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [isErrorState, setIsErrorState] = useState(null);
  const [searchResults, setSearchResults] = useState({});
  const [updateLocationMes, setUpdateLocationMes] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const {
    data: hotel,
    isLoading,
    isError,
  } = useSelector((state) => state.hotel);
  const searchForm = "search-form";

  const fetchSearchResults = async (searchQuery) => {
    // console.log("Fetching results for:", {});
    try {
      setIsLoadingState(true);
      const response = await apiClient.post(
        "locations/convert-location-address",
        {
          formattedAddress: searchQuery,
        }
      );
      // console.log(
      //   "Location Response Data: ",
      //   JSON.stringify(response.data, null, 2)
      // );
      setSearchResults(response.data.data);
      setIsLoadingState(false);
    } catch (error) {
      console.error(error);
      setIsErrorState(error);
    } finally {
      setIsLoadingState(false);
    }
  };
  const deboubceSearchData = debounce(fetchSearchResults, 5000);

  const handleOnChange = (e) => {
    // console.log("The value of the current state " + e.target.value);
    setAddress(e.target.value);
    deboubceSearchData(e.target.value);
  };

  // const handleOnChangeSelectOption = (e) => {
  //   const selectedValue = e.target.value;
  //   const location = JSON.parse(selectedValue);
  //   console.log(location);
  // };

  const handSubmit = async () => {
    try {
      setIsLoadingState(true);
      const response = await apiClient.put(
        `hotels/${hotel.hotelId}/locations`,
        {
          locationId: locationId,
          latitude: searchResults.latitude,
          longitude: searchResults.longitude,
          formattedAddress: searchResults.formattedAddress,
        }
      );
      console.log(
        "Location Update Response Data: ",
        JSON.stringify(response.data, null, 2)
      );
      setIsOpenModal(true);
      setUpdateLocationMes(response.data.status);
      setIsLoadingState(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchResults) {
      setMapPosition(searchResults);
    }
  }, [searchResults]);

  if (isLoadingState) return <Spinner />;

  return (
    <>
      {isOpenModal ? (
        <Modal onCloseModal={() => setIsOpenModal(false)}>
          {updateLocationMes}
        </Modal>
      ) : (
        <></>
      )}
      <div
        className={`${searchForm}__search-wrapper`}
        style={{ width: `${width}px` }}
      >
        <input
          className={`${searchForm}__input`}
          type="text"
          placeholder="Search"
          value={address}
          onChange={handleOnChange}
        />
        {/* idea for later -> array of location -> map through array that approve for user can chose 
        -> value is addres -> send address to database -> convert to location and save */}
        {/* <select
          name="locations"
          id="locations"
          onChange={handleOnChangeSelectOption}
        >
          <option
            value={JSON.stringify({
              latitude: searchResults.latitude,
              longitude: searchResults.longitude,
            })}
          >
            {searchResults.formattedAddress}
          </option>
        </select> */}
        <button className={`${searchForm}__search-button`} type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 256 256"
          >
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
          </svg>
        </button>
      </div>
      <MapComponent height="600px" position={mapPosition} />
      <div className="search-form__btn-container">
        <button
          className="create-room__btn"
          type="button"
          onClick={onStepChange}
        >
          Previous
        </button>
        <button className="create-room__btn" onClick={handSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default SearchForm;
