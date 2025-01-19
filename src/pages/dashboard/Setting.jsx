import { useDispatch, useSelector } from "react-redux";

import Spinner from "../../components/Spinner";
import SettingForm from "./SettingForm";

const Setting = () => {
  const {
    data: hotel,
    isLoading,
    isError,
  } = useSelector((state) => state.hotel);

  {
    isLoading ? <Spinner /> : <></>;
  }

  return <SettingForm hotel={hotel} />;
};

export default Setting;
