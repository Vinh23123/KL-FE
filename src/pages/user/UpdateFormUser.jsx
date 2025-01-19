import { useForm } from "react-hook-form";
import FormRow from "../../components/FormRow";
import { VALIDATOR as pattern } from "../../constant/PatternValidate";
import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

const UpdateFormUser = ({ user = {} }) => {
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [error, setError] = useState();
  const [updateUser, setUpdateUser] = useState({});
  const isEditSession = Boolean(user?.userId);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      mail: "",
    },
  });

  useEffect(() => {
    if (isEditSession) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        mail: user.mail || "",
        phone: user.phone || "",
      });
    }
  }, [user, isEditSession, reset]);

  const onSubmit = async (data) => {
    try {
      setIsLoadingUser(true);
      const res = await apiClient.put(`users/${user?.userId}`, {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.mail,
      });
      setUpdateUser(res);
      toast.success("User is updated successfully");
      setIsLoadingUser(false);
    } catch (error) {
      setIsLoadingUser(false);
      console.error(error);
      toast.error(error.message);
      setError(error);
    } finally {
      setIsLoadingUser(false);
    }
  };

  if (isLoadingUser) return <Spinner />;
  return (
    <form className="create-room__form" onSubmit={handleSubmit(onSubmit)}>
      <FormRow error={errors.firstName?.message} label="First Name">
        <input
          className="create-room__form-input"
          type="text"
          {...register("firstName", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow error={errors.lastName?.message} label="Last Name">
        <input
          className="create-room__form-input"
          type="text"
          {...register("lastName", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow error={errors.mail?.message} label="Email">
        <input
          className="create-room__form-input"
          type="email"
          {...register("mail", {
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
      <button
        disabled={isSubmitting}
        className="create-room__btn"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default UpdateFormUser;
