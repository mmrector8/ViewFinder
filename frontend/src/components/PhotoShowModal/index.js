import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closePhotoShowModal } from "../../store/ui";
import PhotoShow from "./PhotoShow";

const PhotoShowModal = () => {
    const dispatch = useDispatch()
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      height: "500px",
      width: "1000px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "5px",
      display: "flex",
      justifyContent: "center",
    },
  };

  const photoShowModalOpen = useSelector (
    (store) => store.ui.photoShowModalOpen
  );

  Modal.setAppElement("#root");
  return (
    <Modal
      isOpen={photoShowModalOpen}
      onRequestClose={() => dispatch(closePhotoShowModal())}
      style={customStyles}
      contentLabel="Photo Show Modal"
      overlayClassName="Overlay"
      closeTimeoutMS={200}
    >
      <PhotoShow />
      <button
        onClick={() => dispatch(closePhotoShowModal())}
        className="show-photo-modal-close-button"
      >
        &times;
      </button>
    </Modal>
  );
};

export default PhotoShowModal;
