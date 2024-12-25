import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import apiClient from "../services/apiClient";
import { formatCurrency } from "../helpers/formatCurrency";
import "../styles/_ResultPayment.scss";
import { CheckFat } from "@phosphor-icons/react";

const ResultPayment = () => {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const processPayment = async () => {
      try {
        // The entries() method of the URLSearchParams interface returns an iterator allowing iteration
        //  through all key/value pairs contained in this object.
        // iterator {
        //  key1 : value1,
        // key2 : value2,
        // }
        const vnp_Params = Object.fromEntries(searchParams.entries());
        // console.log("VNPAY Query Parameters:", vnp_Params);
        const response = await apiClient.post("/payment/return", vnp_Params);
        console.log("Payment Response Data: ", response.data);

        if (response.data.status === "SUCCESS") {
          setStatus("SUCCESS");
          setResponseData(response.data.data);
        } else {
          setStatus("FAILED");
          setError(response.data.message);
        }
      } catch (error) {
        console.log(error);
        setStatus("FAILED");
        setError("An error occurred while processing the payment.");
      }
    };
    processPayment();
  }, [searchParams]);

  if (status === "SUCCESS") {
    return (
      <div className="result-payment">
        <div className="result-payment__content">
          <div className="result-payment__icon-container">
            <CheckFat className="result-payment__icon-item" size={80} />
            <p>Your payment successfully.</p>
          </div>
          <div className="result-payment__info">
            <ul className="result-payment__info-list">
              <li>
                <span>Amount: </span>
                <span>{formatCurrency(responseData.amount / 100)}</span>
              </li>
              <li>
                <span>Payment Method: </span>
                <span>{responseData.paymentMethod.split("_").join(" ")}</span>
              </li>
            </ul>
          </div>
          <button
            className="result-payment__btn"
            onClick={() => navigate("/home")}
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  if (status === "FAILED") {
    return (
      <div>
        <h1>Payment Failed</h1>
        <p>{error}</p>
        <button onClick={() => navigate("/home")}>Retry</button>
      </div>
    );
  }

  return <p>Processing your payment...</p>;
};

export default ResultPayment;
