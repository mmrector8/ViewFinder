import React from "react";
import { closeSearchModal } from "../../store/ui";
import Modal from "react-modal";
import SearchResults from "./SearchResults";
import { useDispatch, useSelector } from "react-redux";
import { clearResults } from "../../store/search";

const customStyles = {
  content: {
    top: "8%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    height: "320px",
    width: "400px",
    border: "1px solid black",
    marginRight: "-50%",
    transform: "translate(-50%, 0)",
    padding: 0,
    borderRadius: "5px",
    display: "flex",
    boxShadow:
      "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
  },
};

Modal.setAppElement("#root");

const SearchModal = () => {
  const searchModalOpen = useSelector((store) => store.ui.searchModalOpen);
  const dispatch = useDispatch();

  return (
    <Modal
      isOpen={searchModalOpen}
      onRequestClose={() => {
        dispatch(closeSearchModal());
        dispatch(clearResults());
      }}
      style={customStyles}
      contentLabel="Search Modal"
      overlayClassName="User-Modal-Overlay"
      closeTimeoutMS={200}
    >
      <SearchResults />
    </Modal>
  );
};

export default SearchModal;
