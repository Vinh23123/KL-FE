import { useEffect } from "react";
import Modal from "../../components/Modal";

const CreateImage = ({
  isOpenModal,
  onCloseModal,
  handleImageChange,
  imageReview = [],
  validateMess,
}) => {
  return (
    <div>
      {/* Add your form or other components here */}
      {isOpenModal ? (
        <Modal onCloseModal={() => onCloseModal(false)}>
          <div>
            <label className="create-room__label" htmlFor="files">
              Choose a file
            </label>
            <input
              className="create-room__form-input-type"
              type="file"
              // placeholder="Enter your room number"
              id="files"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          {imageReview ? (
            <div className="create-room__img-reveiw-container">
              {imageReview.map((img, i) => (
                <div className="create-room__img" key={img}>
                  <img
                    className="create-room__img-review"
                    src={img}
                    alt={`Preview ${i + 1}`}
                    // onClick={() => onHandleClick(img)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
          {validateMess ? (
            <p className="create-room__status-failed">{validateMess}</p>
          ) : (
            <></>
          )}
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CreateImage;
