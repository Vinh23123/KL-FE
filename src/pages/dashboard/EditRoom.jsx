import { useForm } from "react-hook-form";

import "../../styles/_EditRoom.scss";
import FormRow from "../../components/FormRow";
import { useEffect, useState } from "react";
import CreateImage from "../ImageForRoom/CreateImage";
import apiClient from "../../services/apiClient";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@phosphor-icons/react";

const EditRoom = ({
  room = {},
  onDeleteButton,
  roomImgRes,
  onCloseModal,
  updatedRoom,
  roomImageResponse,
  handleRoomImageUpdatedRes,
  handleUpdatedRoom,
}) => {
  const [imageReview, setImageReview] = useState([]);
  const [validateImageListMess, setValidateImageListMess] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoadingUpdateRoom, setIsLoadingUpdateRoom] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      roomId: room?.roomId || "",
      roomNumber: room?.roomNumber || "",
      description: room?.description || "",
      capacity: room?.capacity || "",
      status: room?.status || "",
      viewType: room?.viewType || "",
      pricePerNight: room?.pricePerNight || "",
    },
  });
  const isEditSession = Boolean(room?.roomId);

  const base64ToFile = (base64String, fileName) => {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + room?.roomImageDtos.length > 5) {
      setValidateImageListMess(
        "The list of images should not be larger than 5 images"
      );
      setImageReview([]);
      return;
    } else {
      setValidateImageListMess();
      const imagePreviews = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          imagePreviews.push(reader.result);
          if (imagePreviews.length === files.length) {
            setImageReview(imagePreviews);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Set initial values when `hotel` is available
  useEffect(() => {
    if (isEditSession) {
      reset({
        roomId: room?.roomId || "",
        roomNumber: room?.roomNumber || "",
        description: room?.description || "",
        capacity: room?.capacity || "",
        status: room?.status || "",
        viewType: room?.viewType || "",
        pricePerNight: room?.pricePerNight || "",
      });
    }
  }, [room, isEditSession, reset]);
  useEffect(() => {
    const createAImg = async () => {
      console.log("check");
      const formData = new FormData();
      imageReview.forEach((image, index) => {
        const file = base64ToFile(image, `image_${index}.png`);
        formData.append("file", file);
      });

      // Debugging: Log the form data
      for (let [key, value] of formData.entries()) {
        console.log(key, value); // Ensure `file` is correctly appended
      }

      try {
        setIsLoadingUpdateRoom(true);
        const uploadResponse = await apiClient.post(
          `rooms/${updatedRoom?.data?.roomId}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Upload Response:", uploadResponse.data); // Debugging
        onCloseModal(false);
        setIsLoadingUpdateRoom(false);
        handleRoomImageUpdatedRes(uploadResponse.data);
        handleUpdatedRoom({});
      } catch (uploadError) {
        console.error("Error uploading room image:", uploadError);
      } finally {
        setIsLoadingUpdateRoom(false);
      }
    };

    // Trigger image upload only if images exist
    if (updatedRoom?.status === "SUCCESS" && imageReview.length > 0) {
      createAImg().then(() => navigate("/dashboard/rooms"));
    } else if (updatedRoom?.status === "SUCCESS" && imageReview.length === 0) {
      navigate("/dashboard/rooms");
    }
  }, [
    updatedRoom?.status,
    updatedRoom?.data?.roomId,
    imageReview,
    handleRoomImageUpdatedRes,
    navigate,
  ]);

  const handleCloseModal = () => {
    onCloseModal(false);
  };

  const onSubmit = async (data) => {
    try {
      setIsLoadingUpdateRoom(true);
      const updatedRoomRes = await apiClient.put(`/rooms`, {
        roomId: data.roomId,
        roomNumber: data.roomNumber,
        description: data.description,
        capacity: data.capacity,
        status: data.status,
        viewType: data.viewType,
        pricePerNight: data.pricePerNight,
      });
      handleUpdatedRoom(updatedRoomRes.data);
      onCloseModal(false);
    } catch (error) {
      setErrorUpdate(error);
      console.log(error);
    } finally {
      // setIsLoadingUpdateRoom(false);
    }
  };

  if (isLoadingUpdateRoom) return <Spinner />;

  return (
    <div>
      <form className="edit-room-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="edit-room__flex-item-left">
          <FormRow label="Room Number" error={errors.roomNumber?.message}>
            <input
              className="edit-room__input"
              type="number"
              placeholder="Ex: 001"
              id="roomNumber"
              {...register("roomNumber", {
                required: "This field is required",
                valueAsNumber: true,
              })}
            />
          </FormRow>
          <FormRow label="Price" error={errors.pricePerNight?.message}>
            <input
              className="edit-room__input"
              type="number"
              placeholder="Ex: 300"
              id="pricePerNight"
              {...register("pricePerNight", {
                required: "This field is required",
                valueAsNumber: true,
              })}
            />
          </FormRow>
          <FormRow label="Room Capacity" error={errors.capacity?.message}>
            <input
              className="edit-room__input"
              type="number"
              placeholder="Ex: 10"
              id="capacity"
              {...register("capacity", {
                required: "This field is required",
                valueAsNumber: true,
              })}
            />
          </FormRow>

          <FormRow label="Room Status">
            <select
              {...register("status", {
                required: "This field is required",
              })}
              id="status"
              className="edit-room__input"
            >
              <option value="AVAILABLE">Available</option>
              <option value="UNAVAILABLE">Un-Available</option>
            </select>
          </FormRow>
          <FormRow label="Description">
            <textarea
              className="edit-room__input"
              name="description"
              id="description"
              placeholder="Enter your room description"
              {...register("description")}
            ></textarea>
          </FormRow>
          <CreateImage
            onCloseModal={setIsOpenModal}
            isOpenModal={isOpenModal}
            // onHandleClick={handleClick}
            handleImageChange={handleImageChange}
            imageReview={imageReview}
            validateMess={validateImageListMess}
          />
          <div className="edit-room__button-group">
            <button
              className="edit-room__button"
              type="button"
              onClick={() => setIsOpenModal(true)}
            >
              Chose Images For Room: {imageReview?.length}
            </button>
            <button className="edit-room__button" type="submit">
              Submit
            </button>
            <button
              className="edit-room__button"
              type="button"
              onClick={handleCloseModal}
            >
              close
            </button>
          </div>
        </div>

        <div className="edit-room__img-gallary">
          {room?.roomImageDtos?.map((img) => (
            <div className="edit-room__img-container" key={img.roomImageId}>
              <button
                type="button"
                onClick={() => onDeleteButton(img.roomImageId)}
                className="edit-room__cancel-icon"
              >
                X
              </button>
              <img
                className="edit-room__img"
                src={img.secureUrl}
                // onClick={() => onHandleClick(img)}
              />
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default EditRoom;
