import { useForm } from "react-hook-form";
import FormRow from "../../components/FormRow";
import { toLocalDateTime } from "../../helpers/toLocalDateTime";
import apiClient from "../../services/apiClient";
import { useState } from "react";
import { Spinner } from "@phosphor-icons/react";

const UpdateReservationForm = ({
  reservationIdToUpdate,
  roomId,
  onCloseModal,
  onReservationRoomResponse,
  reservationRoom,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { reservationId, ...editValues } = reservationRoom;
  const isEditSession = Boolean(reservationId);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  // When you use handleSubmit from react-hook-form, it automatically prevents the default behavior of the form submission.

  // Handle form submission
  const handleSubmitReservation = async (data, e) => {
    e.preventDefault();
    const checkInDate = new Date(data.checkIn);
    const checkOutDate = new Date(data.checkOut);

    try {
      setIsLoading(true);
      const response = await apiClient.put(
        `/reservations/rooms/${roomId}/discounts/4`,
        {
          reservationId: reservationIdToUpdate,
          checkIn: toLocalDateTime(checkInDate),
          checkOut: toLocalDateTime(checkOutDate),
        }
      );
      // console.log("Update Reservation Response Data: ", response.data);
      onReservationRoomResponse?.(response.data);
    } catch (error) {
      setError(error);
      // console.error(error);
    } finally {
      setIsLoading(false);
      onCloseModal();
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <form onSubmit={handleSubmit(handleSubmitReservation)}>
      <div>
        <FormRow label="Check-In Date" error={errors.checkIn?.message}>
          <input
            className="reservation__input"
            type="datetime-local"
            id="checkIn"
            name="checkIn"
            {...register("checkIn", {
              required: "This field is required",
              validate: (value) => {
                const now = new Date();
                const checkDate = new Date(value);
                return (
                  checkDate >= now || "Check-in date must be in the future"
                );
              },
            })}
          />
        </FormRow>
        <FormRow label="Check-Out Date" error={errors.checkOut?.message}>
          <input
            className="reservation__input"
            type="datetime-local"
            id="checkOut"
            name="checkOut"
            {...register("checkOut", {
              required: "This field is required",
              validate: (value) => {
                const checkOutDate = new Date(value);
                const checkInValue = getValues("checkIn");
                const checkInDate = new Date(checkInValue);
                return (
                  checkOutDate > checkInDate ||
                  "Check-Out date must be larger than check-In date"
                );
              },
            })}
          />
        </FormRow>
      </div>
      <button
        className="reservation__btn"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default UpdateReservationForm;
