import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated && !accessToken) {
      navigate("/booking-app/login", { replace: true });
    }
  }, [isAuthenticated, navigate, accessToken]);
  // 2. Whilte loading, show a spinner
  if (isLoading) return <Spinner />;
  // 3. If the user is not authenticated, redirect to the login pag
  if (!isAuthenticated && !accessToken) {
    navigate("/booking-app/login", { replace: true });
  }
  // 4. If the user is authenticated, show the children

  if (accessToken && isAuthenticated) return children;
};

export default ProtectedRoute;
