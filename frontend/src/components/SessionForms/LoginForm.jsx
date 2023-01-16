import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SessionForm.css";

import { login, clearSessionErrors } from "../../store/session";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === "email" ? setEmail : setPassword;
    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="login-container">
      <form className="session-form" onSubmit={handleSubmit}>
        <div className="inputs-container">
          <h2 className="form-header">Welcome Back!</h2>
          <div className="errors">{errors?.email}</div>
          <input
            type="text"
            value={email}
            onChange={update("email")}
            placeholder="Email"
          />
          <div className="errors">{errors?.password}</div>
          <input
            type="password"
            value={password}
            onChange={update("password")}
            placeholder="Password"
          />
        </div>
        <div className="button-container">
          <button type="submit" disabled={!email || !password}>
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
