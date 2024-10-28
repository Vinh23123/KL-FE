import { useForm } from "react-hook-form";
import "../styles/_Signup.scss";
import { VALIDATOR as pattern } from "../constant/PatternValidate";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="signup">
      <div className="signup__flex-item-left">
        <h1> Sign Up</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="firstName">First Name</label>
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
                  message: "First Name should be at least 20 characters",
                },
              })}
              aria-invalid={errors.firstName ? "true" : "false"}
            />
          </div>
          {errors.firstName?.message && (
            <span> {errors.firstName?.message} </span>
          )}
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              {...register("lastName", {
                required: true,
                minLength: 5,
                maxLength: 20,
              })}
            />
          </div>
          <div>
            <label htmlFor="userName">User Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              {...register("userName", {
                required: true,
                minLength: 5,
                maxLength: 20,
              })}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              {...register("phone", { required: true })}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              {...register("email", { required: true, pattern: pattern.email })}
            />
          </div>
          <button type="submit">Sign up</button>
        </form>
      </div>
      <div className="signup__flex-item-right"></div>
    </div>
  );
};

export default Signup;
