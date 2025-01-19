import { useForm } from "react-hook-form";
import FormRow from "../../components/FormRow";
import { VALIDATOR as pattern } from "../../constant/PatternValidate";
import { useEffect, useState } from "react";
import { Spinner } from "@phosphor-icons/react";
import { useDispatch } from "react-redux";
import { createHotel } from "../../redux/slice/hotelSlice";
import { useNavigate } from "react-router-dom";

const CreateHotel = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isShowSpinner, setIsShowSpinner] = useState(false);
  // const [location, setLocation] = useState({ latitude: 0, longitude: 40 });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const isEditSession = Boolean(hotel?.hotelId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      hotelName: "",
      email: "",
      phone: "",
      description: "",
    },
  });
  const onSubmit = async (data) => {
    console.log(data);

    setCurrentStep((prevStep) => prevStep + 1);
    dispatch(createHotel(data));
    navigate("/dashboard/rooms");
  };

  // if (isLoading) return <Spinner />;

  const Step1 = () => (
    <form className="create-room__form" onSubmit={handleSubmit(onSubmit)}>
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
      <FormRow error={errors.description?.message} label="Description">
        <textarea
          className="create-room__form-input--padding"
          placeholder="Enter your room description"
          {...register("description")}
        />
      </FormRow>
      <div className="search-form__btn-container">
        <button
          disabled={isSubmitting}
          className="create-room__btn"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
  return (
    <div className="create-room">
      {isShowSpinner ? (
        <Spinner />
      ) : (
        <div className="create-room__container">
          {currentStep === 1 && <Step1 />}
          {/* {currentStep === 2 && <Step2 />} */}
        </div>
      )}
    </div>
  );
};

export default CreateHotel;
