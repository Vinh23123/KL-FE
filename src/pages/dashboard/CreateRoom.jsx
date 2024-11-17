import "../../styles/_CreateRoom.scss";
import FormRow from "../../components/FormRow";
import ShowRoomImg from "../../components/ShowRoomImg";
import { useState } from "react";

const CreateRoom = () => {
  const [imageReview, setImageReview] = useState([]);
  const [allImages, setAllImages] = useState([]);
  console.log(allImages);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imagePreviews = [];
    files.forEach((file) => {
      const reader = new FileReader();
      // console.log(reader.result);

      reader.onload = () => {
        imagePreviews.push(reader.result);
        if (imagePreviews.length === files.length) {
          setImageReview(imagePreviews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleClick = async (source) => {
    console.log(source);
    const check = allImages.includes(source);
    console.log("The boolean value" + check);

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

  return (
    <div className="create-room">
      <h3>Create Room</h3>
      <div>
        <form className="create-room__form" action="">
          <FormRow label="Room Number">
            <input
              className="create-room__form-input"
              type="text"
              placeholder="Ex: 001"
              id="roomNumber"
            />
          </FormRow>
          <FormRow label="Price">
            <input
              className="create-room__form-input"
              type="text"
              placeholder="Ex: 300"
              id="price"
            />
          </FormRow>
          <FormRow label="Room Capacity">
            <input
              className="create-room__form-input"
              type="text"
              placeholder="Ex: 10"
            />
          </FormRow>
          <FormRow label="Description">
            <input
              className="create-room__form-input"
              type="text"
              placeholder="Enter your room number"
              id="description"
            />
          </FormRow>
          <FormRow label="Room Status">
            <select className="create-room__form-input" id="status">
              <option value="available">Available</option>
              <option value="unavailable">Un-Available</option>
            </select>
          </FormRow>
          <FormRow label="Room Images">
            <input
              className="create-room__form-input"
              type="file"
              // placeholder="Enter your room number"
              id="files"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </FormRow>
        </form>
        {imageReview && (
          <div className="create-room__img-reveiw-container">
            {imageReview.map((img, i) => (
              <div key={img}>
                <img
                  className="create-room__img-review"
                  src={img}
                  alt={`Preview ${i + 1}`}
                  onClick={() => handleClick(img)}
                />
                {allImages.includes(img) ? (
                  <div className="create-room__img-checked">Selected</div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateRoom;
// Dashboard -> get User Id -> display If No Hotel -> Create Hotel -? If yes -> display hotel -> click to hotel -> create rooms
// get room_number -> Update Room
// bookings -> apply discount -> display discount + payment method (now + just cash)
// History booking ->

// Room Number - input text
// Room status - select option [available - unavailabel]
// Room price - number
// Room Capacity
// Room description
// View type - selection ['sea', 'garden', 'city', 'pool']
// Roomm image - [img 1 , img 2, img 3]

// upload multiple files -> render multiple images -> user can click on images that is selected by user -> send the url to data base -> save url in third library
