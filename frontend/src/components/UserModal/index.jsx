import { Hidden } from "@mui/material";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import { closeUserModal } from "../../store/ui";
import "./UserModal.css";

const customStyles = {
  content: {
    top: "60px",
    left: "auto",
    right: "25px",
    bottom: "auto",
    width: "200px",
    border: "1px solid black",
    borderRadius: "3px",
    display: "flex",
    justifyContent: "center",
    padding: 0,
    boxShadow:
      "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px", 
  },
};

Modal.setAppElement("#root");

const UserModal = () => {
  const userModalOpen = useSelector((store) => store.ui.userModalOpen);
  const currentUser = useSelector((store) => store.session.user);
  const dispatch = useDispatch();
  return (
    <Modal
      isOpen={userModalOpen}
      onRequestClose={() => dispatch(closeUserModal())}
      style={customStyles}
      contentLabel="User Dropdown"
      overlayClassName="User-Modal-Overlay"
      closeTimeoutMS={200}
    >
      <div className="user-dropdown">
        <ul>
          <div className="user-dropdown-top">
            <li>
              <h1 className="user-dropdown-username">
                Hi, {currentUser?.username}!
              </h1>
            </li>
          </div>
          <li className="user-dropdown-button-li li-first-item">
            <button className="user-dropdown-button">Profile</button>
          </li>
          <li className="user-dropdown-button-li">
            <button
              className="user-dropdown-button"
              onClick={() => dispatch(logout())}
            >
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default UserModal;
