import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import MainPage from "./components/MainPage";
import { getCurrentUser } from "./store/session";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginModal from "./components/SessionForms/LoginModal";
import SignupModal from "./components/SessionForms/SignupModal";
import UserModal from "./components/UserModal";
import LocationShowPage from "./components/LocationShowPage";
import UserShowPage from "./components/UserShowPage";
import SpotShowPage from "./components/SpotShowPage";
import PhotoShowModal from "./components/PhotoShowModal";
import PhotoUploadModal from "./components/PhotoUploadModal";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";

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
        <PhotoShowModal />
        <PhotoUploadModal />
        <LoginModal />
        <SignupModal />
        {currentUser && <UserModal />}
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/users/:userId">
            <UserShowPage />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotShowPage />
          </Route>
          <Route path="/locations/:locationId">
            <LocationShowPage />
          </Route>
          <Route exact path="/error" component={NotFound} />
          <Redirect to="/error" />
        </Switch>
        <Footer />
      </>
    )
  );
};

export default App;
