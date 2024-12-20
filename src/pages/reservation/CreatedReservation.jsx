import FormRow from "../../components/FormRow";

const CreatedReservation = () => {
  return (
    <div className="reservation">
      <h2>Reservation</h2>
      <form action="">
        <div className="">
          <FormRow label="Check-In Date">
            <input
              className="reservation__input"
              type="datetime-local"
              id="check-in"
              name="check-in"
            />
          </FormRow>
          <FormRow label="Check-Out Date">
            <input type="datetime-local" id="check-out" name="check-in" />
          </FormRow>
        </div>
      </form>
    </div>
  );
};

export default CreatedReservation;
