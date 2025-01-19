import { useEffect, useState } from "react";
import UpdateFormUser from "./UpdateFormUser";
import apiClient from "../../services/apiClient";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner";

const UpdateUser = () => {
  const [isLoadingFetchUser, setIsLoadingFetchUser] = useState(false);
  const [error, setError] = useState();
  const [fetchUser, setFetchUser] = useState({});
  const {
    data: user,
    isLoading,
    isError,
    errorMSG,
    isAuthenticated,
  } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchUserByUserId = async () => {
      try {
        setIsLoadingFetchUser(true);
        const res = await apiClient.get(`/users/${user.id}`);
        setFetchUser(res.data.data);
        setIsLoadingFetchUser(false);
      } catch (error) {
        console.log(error);
        toast.error(error);
        setError(error);
        setIsLoadingFetchUser(false);
      } finally {
        setIsLoadingFetchUser(false);
      }
    };
    fetchUserByUserId();
  }, [user.id]);

  if (isLoading || isLoadingFetchUser) return <Spinner />;
  return (
    <div className="create-room__container">
      <UpdateFormUser user={fetchUser} />
    </div>
  );
};

export default UpdateUser;
