import { Form, useForm } from "react-hook-form";

import "../styles/_Signup.scss";
import { VALIDATOR as pattern } from "../constant/PatternValidate";
import FormInput from "./FormInput";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (data) => {
    // handle data here
    console.log(data);
  };

  const onErrors = (errors) => {
    console.log("Failed validation!", errors);
  };

  return (
    <div className="signup">
      <div className="signup__flex-item-left">
        <h1> Sign Up</h1>

        <Form onSubmit={handleSubmit(onSubmit, onErrors)} control={control}>
          <FormInput label="First Name" error={errors.firstName?.message}>
            <input
              type="text"
              id="firstName"
              name="firstName"
              {...register("firstName", {
                required: "This field is required",
                minLength: {
                  value: 5,
                  message: "First Name should be at least 5 characters",
                },
                maxLength: {
                  value: 20,
                  message: "First Name should be at max 20 characters",
                },
              })}
              //ARIA (Accessible Rich Internet Applications)
              aria-invalid={errors.firstName ? "true" : "false"}
            />
          </FormInput>

          <FormInput label="Last Name" error={errors.lastName?.message}>
            <input
              type="text"
              id="lastName"
              name="lastName"
              {...register("lastName", {
                required: "This field is required",
                minLength: {
                  value: 5,
                  message: "Last Name should be at least 5 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Last Name should be at max 20 characters",
                },
              })}
              //ARIA (Accessible Rich Internet Applications)
              aria-invalid={errors.lastName ? "true" : "false"}
            />
          </FormInput>

          <FormInput label="User Name" error={errors.userName?.message}>
            <input
              type="text"
              id="userName"
              name="userName"
              {...register("userName", {
                required: "This field is required",
                minLength: {
                  value: 5,
                  message: "User Name should be at least 5 characters",
                },
                maxLength: {
                  value: 20,
                  message: "User Name should be at max 20 characters",
                },
              })}
              //ARIA (Accessible Rich Internet Applications)
              aria-invalid={errors.userName ? "true" : "false"}
            />
          </FormInput>
          <FormInput label="Phone" error={errors.phone?.message}>
            <input
              type="text"
              id="phone"
              name="phone"
              {...register("phone", {
                required: "This field is required",
                minLength: {
                  value: 10,
                  message: "Phone should be at least 11 characters",
                },
              })}
              //ARIA (Accessible Rich Internet Applications)
              aria-invalid={errors.phone ? "true" : "false"}
            />
          </FormInput>
          <FormInput label="Email" error={errors.email?.message}>
            <input
              type="text"
              id="email"
              name="email"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: pattern.email,
                  message: "Invalid email format",
                },
              })}
              aria-invalid={errors.email ? "true" : "false"}
            />
          </FormInput>

          <FormInput label="Address" error={errors.address?.message}>
            <input
              type="text"
              id="address"
              name="address"
              {...register("address", {
                required: "This field is required",
              })}
              aria-invalid={errors.address ? "true" : "false"}
            />
          </FormInput>
          <button type="submit">Sign up</button>
        </Form>
      </div>
      <div className="signup__flex-item-right"></div>
    </div>
  );
};

export default Signup;
