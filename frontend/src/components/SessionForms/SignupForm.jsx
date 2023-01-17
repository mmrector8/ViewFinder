import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SessionForm.css";
import { signup, clearSessionErrors } from "../../store/session";
import "./SessionForm.css";
import { closeSignupModal } from "../../store/ui";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    let setState;

    switch (field) {
      case "email":
        setState = setEmail;
        break;
      case "username":
        setState = setUsername;
        break;
      case "password":
        setState = setPassword;
        break;
      case "password2":
        setState = setPassword2;
        break;
      case "bio":
        setState = setBio;
      case "profilepicurl":
        setState = setProfilePicUrl;
      default:
        throw Error("Unknown field in Signup Form");
    }

    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      password,
      bio,
      profilePicUrl,
    };
    dispatch(signup(user));
    setPageNum(1);
  };

  return (
    <div className="sign-up-container">
      <form className="session-form" onSubmit={handleSubmit}>
        <div className="inputs-container">
          <h2 className="form-header">Hello There!</h2>
          {pageNum === 1 ? (
            <>
              <span className="page-num">Page 1 of 2</span>
              <div className="errors">{errors?.email}</div>
              <label>
                <input
                  type="text"
                  value={email}
                  onChange={update("email")}
                  placeholder="Email"
                />
              </label>
              <div className="errors">{errors?.username}</div>
              <label>
                <input
                  type="text"
                  value={username}
                  onChange={update("username")}
                  placeholder="Username"
                />
              </label>
              <div className="errors">{errors?.password}</div>
              <label>
                <input
                  type="password"
                  value={password}
                  onChange={update("password")}
                  placeholder="Password"
                />
              </label>
              <label className="confirm">
                <input
                  type="password"
                  value={password2}
                  onChange={update("password2")}
                  placeholder="Confirm Password"
                />
              </label>
              <div className="errors">
                {password !== password2 && "Confirm Password field must match"}
              </div>
              <div className="next-page-button-container">
                <button
                  onClick={(e) => setPageNum(2)}
                  className="next-page-button"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <>
              <span className="page-num">Page 2 of 2</span>
              <br></br>
              <label>
                <div className="span-padding">
                  <span className="upload">
                    Upload a profile photo {"(optional)"}
                  </span>
                </div>
                <input
                  type="file"
                  value={profilePicUrl}
                  onChange={(e) => setProfilePicUrl(e.target.value)}
                />
              </label>
              <div className="errors">{errors?.bio}</div>
              <label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Enter a bio (optional)"
                  className="bio-input"
                />
              </label>
              <div className="button-container">
                <button
                  onClick={() => setPageNum(1)}
                  className="go-back-button"
                >
                  Go Back
                </button>
                <button
                  className="sign-up-button"
                  type="submit"
                  disabled={
                    !email || !username || !password || password !== password2
                  }
                >
                  Sign Up
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
