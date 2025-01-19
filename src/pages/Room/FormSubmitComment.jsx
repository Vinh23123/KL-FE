import { useForm } from "react-hook-form";
import { PaperPlaneTilt } from "@phosphor-icons/react";

const FormSubmitComment = ({ handleOpenModalRating }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      comment: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(handleOpenModalRating)}>
      <textarea
        type="text"
        className="room-users__input"
        placeholder="Your comment"
        {...register("comment", {
          maxLength: {
            value: 1200,
            message: "Comment should be max at 1200 characters",
          },
        })}
      />
      {errors.comment && (
        <span className="signup__flex-item-left__errors">
          {errors.comment?.message}
        </span>
      )}
      <button type="submit" className="room-users__form-btn">
        <PaperPlaneTilt size={24} />
      </button>
    </form>
  );
};

export default FormSubmitComment;
