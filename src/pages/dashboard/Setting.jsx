import { useEffect, useState } from "react";
import FormRow from "../../components/FormRow";
import Map from "../../components/Map";
import { useGeolocation } from "../../services/useGeolocation";
import SearchForm from "../../components/SearchForm";
import Spinner from "../../components/Spinner";

const Setting = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { isLoading, getPosition, position, error } = useGeolocation();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [isShowSpinner, SetIsShowSpinner] = useState(false);

  useEffect(() => {
    if (isShowSpinner) {
      setTimeout(() => {
        SetIsShowSpinner(false);
      }, 2000);
    }
  }, [isShowSpinner]);
  // click on button -> true -> isShowSpinner -> false
  const handleNextPage = () => {
    SetIsShowSpinner((state) => !state);
    setCurrentStep((currentStep) => currentStep + 1);
  };

  const handlePrePage = () => {
    setCurrentStep((currentStep) => (currentStep > 0 ? currentStep - 1 : 1));
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
  };

  const Step1 = () => {
    return (
      <>
        <FormRow label="Hotel Name">
          <input
            className="create-room__form-input"
            type="text"
            placeholder="Ex: Thinh Vuong"
            id="hotelName"
          />
        </FormRow>

        <FormRow label="Description">
          {/* <input
              className="create-room__form-input"
              type="text"
              placeholder="Enter your room number"
              id="description"
            /> */}
          <textarea
            className="create-room__form-input--padding"
            name="description"
            id="description"
            placeholder="Enter your room description"
          ></textarea>
        </FormRow>
        {/* Rating */}
        <button className="create-room__btn" onClick={handleNextPage}>
          Next
        </button>
      </>
    );
  };
  const Step2 = () => {
    return (
      <>
        <SearchForm />
        <Map height="60" position={mapPosition} />

        <button className="create-room__btn" type="submit">
          Submit
        </button>
        <button className="create-room__btn" onClick={handlePrePage}>
          Previous
        </button>
      </>
    );
  };

  return (
    <>
      {isShowSpinner ? (
        <Spinner />
      ) : (
        <div className="create-room">
          <div className="create-room__container">
            <form className="create-room__form" onSubmit={handleSubmitForm}>
              {currentStep === 1 && <Step1 />}
              {currentStep === 2 && <Step2 />}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Setting;

// Hotel name
// Export map to get location -> postal_code -> Long + lat + country
// Owner
// star  rating -> 5 star -> when Completed payment a room
// description
