import { useForm } from "react-hook-form";
import FormRow from "../../components/FormRow";
import { Calendar, Spinner } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import { toLocalDateTime } from "../../helpers/toLocalDateTime";

import "../../styles/_CreatedReservation.scss";
import { toast } from "react-toastify";

const CreatedReservation = ({
  roomId,
  onCloseModal,
  onResponse,
  onOpenModalRes,
  discounts,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      checkIn: "",
      checkOut: "",
      discount: 0,
    },
  });

  const handleSubmitReservation = async (data, e) => {
    e.preventDefault();
    const checkInDate = new Date(data.checkIn);
    const checkOutDate = new Date(data.checkOut);

    console.log(
      "Check-In date " + checkInDate,
      "Check-Out date " + checkOutDate,
      "Discount Id" + data.discount
    );

    try {
      setIsLoading(true);
      const response = await apiClient.post(
        `/reservations/rooms/${roomId}/discounts/${data.discount}`,
        {
          checkIn: toLocalDateTime(checkInDate),
          checkOut: toLocalDateTime(checkOutDate),
        }
      );
      // console.log(
      // "Review Response Data: ",
      // JSON.stringify(response.data, null, 2)
      // );
      onResponse(response.data);
      onOpenModalRes();
      onCloseModal(false);
      setIsLoading(false);
      toast.success(
        "Room is successfully reserved. You need to pay in 1 day. Or Hotel Admin will delete your reservation"
      );
      reset();
    } catch (error) {
      setError(error);
      setIsLoading(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="reservation">
      <h2>Reservation</h2>
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
                  const singleValue = getValues("checkIn");
                  // convert to date object
                  const checkInDate = new Date(singleValue);
                  return (
                    checkOutDate > checkInDate ||
                    "Check-Out date must be larger than check-In date"
                  );
                },
              })}
            />
          </FormRow>
          <FormRow label="Discount" error={errors.discount?.message}>
            <select
              id="discount"
              name="discount"
              className="reservation__input"
              {...register("discount", {
                required: "This field is required",
              })}
            >
              <option value="">Select a discount</option>
              {discounts.map((discount) => (
                <option key={discount.discountId} value={discount.discountId}>
                  {discount.discountAmount} %{discount.expirationDate}
                </option>
              ))}
            </select>
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
    </div>
  );
};

export default CreatedReservation;
