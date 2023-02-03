import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeUploadModal } from "../../store/ui";
import UploadPhotoForm from "./UploadPhotoForm";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    height: "520px",
    width: "900px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "black",
    borderColor: "black",
    color: "white",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
  },
};

Modal.setAppElement("#root");

const PhotoUploadModal = () => {
  const uploadModalOpen = useSelector((store) => store.ui.uploadModalOpen);
  const dispatch = useDispatch();

  return (
    <Modal
      isOpen={uploadModalOpen}
      onRequestClose={() => dispatch(closeUploadModal())}
      style={customStyles}
      contentLabel="Photo Show Modal"
      overlayClassName="Overlay"
      closeTimeoutMS={200}
    >
      <UploadPhotoForm />
      <button
        onClick={() => dispatch(closeUploadModal())}
        className="upload-photo-modal-close-button"
      >
        &times;
      </button>
    </Modal>
  );
};

export default PhotoUploadModal;
