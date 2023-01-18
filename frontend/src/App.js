import { Route, Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "./components/Routes";
import NavBar from "./components/NavBar";
import MainPage from "./components/MainPage";
import { getCurrentUser } from "./store/session";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./components/Profile";
import LoginModal from "./components/SessionForms/LoginModal";
import SignupModal from "./components/SessionForms/SignupModal";
import UserModal from "./components/UserModal";

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const currentUser = useSelector((store) => store.session.user);
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
        {currentUser && <UserModal />}
        <Switch>
          <Route exact path="/" component={MainPage} />
          <ProtectedRoute exact path="/profile" component={Profile} />
        </Switch>
      </>
    )
  );
};

export default App;
