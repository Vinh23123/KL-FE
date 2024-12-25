import React, { useEffect, useState } from "react";
import FormRow from "../../components/FormRow";
import { useForm } from "react-hook-form";
import SearchForm from "../../components/SearchForm";
import Map from "../../components/Map";
import Spinner from "../../components/Spinner";
import { VALIDATOR as pattern } from "../../constant/PatternValidate";
import MapComponent from "../../components/MapComponent";
import apiClient from "../../services/apiClient";
import { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateHotel } from "../../redux/slice/hotelSlice";

const SettingForm = ({ hotel = {} }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isShowSpinner, setIsShowSpinner] = useState(false);
  const dispatch = useDispatch();
  // const {
  //   // data: hotel : hotelResponse,
  //   isLoading,
  //   isError,
  // } = useSelector((state) => state.hotel);
  const isEditSession = Boolean(hotel?.hotelId);
  console.log(hotel);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      hotelId: "",
      hotelName: "",
      email: "",
      phone: "",
      description: "",
    },
  });

  // Set initial values when `hotel` is available
  useEffect(() => {
    if (isEditSession) {
      reset({
        hotelId: hotel.hotelId || "",
        hotelName: hotel.hotelName || "",
        email: hotel.email || "",
        phone: hotel.phoneNumber || "",
        description: hotel.description || "",
      });
    }
  }, [hotel, isEditSession, reset]);

  // useEffect(() => {
  //   if
  // }, [currentStep]);

  const handleNextPage = () => {
    setIsShowSpinner(true);
    setTimeout(() => {
      setIsShowSpinner(false);
      setCurrentStep((prevStep) => prevStep + 1);
    }, 2000);
  };

  const handlePrePage = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const onSubmit = async (data) => {
    setCurrentStep((prevStep) => prevStep + 1);
    console.log(data);
    dispatch(updateHotel(data));
  };

  // if (isLoading) return <Spinner />;

  const Step1 = () => (
    <form className="create-room__form" onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        isHidden={false}
        error={errors.hotelId?.message}
        label="Hotel Id"
      >
        <input
          hidden
          className="create-room__form-input"
          type="text"
          placeholder="Ex: Thinh Vuong"
          {...register("hotelId", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow error={errors.hotelName?.message} label="Hotel Name">
        <input
          className="create-room__form-input"
          type="text"
          placeholder="Ex: Thinh Vuong"
          {...register("hotelName", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow error={errors.email?.message} label="Email">
        <input
          className="create-room__form-input"
          type="email"
          placeholder="Ex: example@gmail.com"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: pattern.email,
              message: "Invalid email format",
            },
          })}
        />
      </FormRow>
      <FormRow error={errors.phone?.message} label="Phone">
        <input
          className="create-room__form-input"
          type="text"
          placeholder="Ex: 0123456789"
          {...register("phone", {
            required: "This field is required",
            pattern: {
              value: pattern.tenDigits,
              message: "Invalid phone format",
            },
            minLength: {
              value: 10,
              message: "Phone should be at least 10 characters",
            },
          })}
        />
      </FormRow>
      <FormRow label="Description">
        <textarea
          className="create-room__form-input--padding"
          placeholder="Enter your room description"
          {...register("description")}
        />
      </FormRow>
      <button
        disabled={isSubmitting}
        className="create-room__btn"
        type="submit"
      >
        Submit
      </button>
    </form>
  );

  const Step2 = () => (
    <>
      <SearchForm
        onStepChange={handlePrePage}
        locationId={hotel.location.locationId}
      />
    </>
  );

  return (
    <div className="create-room">
      {isShowSpinner ? (
        <Spinner />
      ) : (
        <div className="create-room__container">
          {currentStep === 1 && <Step1 />}
          {currentStep === 2 && <Step2 />}
        </div>
      )}
    </div>
  );
};

export default SettingForm;
