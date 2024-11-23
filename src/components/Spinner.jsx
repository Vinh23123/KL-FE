import "../styles/_Spinner.scss";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner">
        <div className="spinner-div">
          <p></p>
        </div>
        <div className="spinner-div"></div>
        <div className="spinner-div"></div>
        <div className="spinner-div"></div>
      </div>
    </div>
  );
};

export default Spinner;
