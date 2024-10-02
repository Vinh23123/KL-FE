import { useParams } from "react-router-dom";

const DetailsRoom = () => {
  const { roomID } = useParams();
  // console.log(roomID);

  return <p>{roomID}</p>;
};

export default DetailsRoom;
