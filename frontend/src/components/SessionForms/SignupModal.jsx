import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeSignupModal } from "../../store/ui";
import SignupForm from "./SignupForm";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    height: "440px",
    width: "400px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "black",
    color: "white",
    border: "1px solid black"
  },
};

Modal.setAppElement("#root");

const SignupModal = () => {
  const signupModalOpen = useSelector((store) => store.ui.signupModalOpen);
  const dispatch = useDispatch();

  return (
    <Modal
      isOpen={signupModalOpen}
      onRequestClose={() => dispatch(closeSignupModal())}
      style={customStyles}
      contentLabel="Sign Up Modal"
      overlayClassName="Overlay"
      closeTimeoutMS={200}
    >
      <button
        onClick={() => dispatch(closeSignupModal())}
        className="modal-close-button"
      >
        &times;
      </button>
      <SignupForm />
    </Modal>
  );
};

export default SignupModal;
