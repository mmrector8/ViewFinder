import { Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "./components/Routes";
import NavBar from "./components/NavBar";
import MainPage from "./components/MainPage";
import { getCurrentUser } from "./store/session";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Profile from "./components/Profile";
import LoginModal from "./components/SessionForms/LoginModal";
import SignupModal from "./components/SessionForms/SignupModal";

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <>
        <NavBar />
        <LoginModal />
        <SignupModal />
        <Switch>
          <AuthRoute exact path="/" component={MainPage} />
          <ProtectedRoute exact path="/profile" component={Profile} />
        </Switch>
      </>
    )
  );
};

export default App;
