import "../../styles/_CreateRoom.scss";
import FormRow from "../../components/FormRow";
import { useEffect, useState } from "react";
import CreateImage from "../ImageForRoom/CreateImage";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import apiClient from "../../services/apiClient";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateRoom = () => {
  const [allImages, setAllImages] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [imageReview, setImageReview] = useState([]);
  const [validateImageListMess, setValidateImageListMess] = useState("");
  const [isLoadingRoom, setIsLoadingRoom] = useState(false);
  const [error, setError] = useState(null);
  const [roomResponse, setRoomResponse] = useState({});
  const [roomImageResponse, setRoomImageResponse] = useState({});
  const [isImageUploadTriggered, setIsImageUploadTriggered] = useState(false);
  const navigate = useNavigate();

  const { data: hotel } = useSelector((state) => state.hotel);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    const createAImg = async () => {
      const formData = new FormData();
      imageReview.forEach((image, index) => {
        const file = base64ToFile(image, `image_${index}.png`);
        formData.append("file", file);
      });
      // using for check the formData is object that BE can received
      // for (let [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }
      try {
        setIsLoadingRoom(true);
        const uploadResponse = await apiClient.post(
          `/rooms/${roomResponse.data.roomId}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setRoomImageResponse(uploadResponse.data);
      } catch (uploadError) {
        setError(uploadError);
        console.error("Error uploading room image:", uploadError);
      } finally {
        setIsLoadingRoom(false);
        setIsImageUploadTriggered(true);
      }
    };
    // Check if room creation was successful
    if (roomResponse.status === "SUCCESS" && !isImageUploadTriggered) {
      console.log("Check Send double request");
      createAImg();
    }
    if (roomImageResponse.status === "SUCCESS") {
      toast.success("Create Room Successfully");
      navigate("/dashboard/rooms");
    }
  }, [
    roomImageResponse.status,
    roomResponse.status,
    imageReview,
    roomResponse?.data?.roomId,
    navigate,
  ]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      setValidateImageListMess(
        "The list of images should not be larger than 5 images"
      );
      setImageReview([]);
      return;
    }
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
  };

  // Convert Base64 to File
  // The Base64 string has two parts:
  // The metadata (data:image/png;base64) before the comma.
  // The actual Base64-encoded data after the comma.
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

  const onSubmit = async (data) => {
    try {
      // Step 1: Create Room API
      setIsLoadingRoom(true);
      const createRoomResponse = await apiClient.post(
        `/hotels/${hotel.hotelId}/rooms`,
        {
          roomNumber: data.roomNumber,
          description: data.description,
          capacity: data.capacity,
          pricePerNight: data.pricePerNight,
          status: "AVAILABLE",
          viewType: "CITY",
        }
      );
      setRoomResponse(createRoomResponse.data);
    } catch (createRoomError) {
      console.error("Error creating room:", createRoomError);
      setError(createRoomError); // Ensure `setError` is defined
    } finally {
      setIsLoadingRoom(false);
    }
  };

  const handleClick = async (source) => {
    const check = allImages.includes(source);
    // console.log("The boolean value " + check);

    if (check) {
      const id = allImages.indexOf(source);
      console.log(id);
      let newArr = allImages;
      newArr.splice(id, 1);
      setAllImages([...newArr]);
    } else {
      allImages.push(source);
      setAllImages([...allImages]);
    }
  };
  if (isLoadingRoom) return <Spinner />;
  return (
    <>
      <div className="create-room">
        <div className="create-room__container">
          <form className="create-room__form" onSubmit={handleSubmit(onSubmit)}>
            <CreateImage
              onCloseModal={setIsOpenModal}
              isOpenModal={isOpenModal}
              onHandleClick={handleClick}
              handleImageChange={handleImageChange}
              imageReview={imageReview}
              validateMess={validateImageListMess}
            />
            <FormRow label="Room Number" error={errors.roomNumber?.message}>
              <input
                className="create-room__form-input"
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
                className="create-room__form-input"
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
                className="create-room__form-input"
                type="number"
                placeholder="Ex: 10"
                id="capacity"
                {...register("capacity", {
                  required: "This field is required",
                  valueAsNumber: true,
                })}
              />
            </FormRow>
            {/* 
            <FormRow label="Room Status">
              <select
                {...register("status", {
                  required: "This field is required",
                })}
                className="create-room__form-input"
                id="status"
              >
                <option value="AVAILABLE">Available</option>
                <option value="UNAVAILABLE">Un-Available</option>
              </select>
            </FormRow> */}
            <FormRow label="Description">
              <textarea
                className="create-room__form-input--padding"
                name="description"
                id="description"
                placeholder="Enter your room description"
                {...register("description")}
              ></textarea>
            </FormRow>

            <button
              disabled={
                imageReview?.length <= 0 || imageReview?.length > 5
                  ? true
                  : false
              }
              type="submit"
              className="create-room__btn"
            >
              Submit
            </button>
            <button type="button" onClick={() => setIsOpenModal(true)}>
              Chose Images For Room: {imageReview?.length}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateRoom;
