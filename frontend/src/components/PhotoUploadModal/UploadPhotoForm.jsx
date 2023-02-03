import React, { useState } from "react";
import "./UploadPhotoForm.css";
import { useDispatch } from "react-redux";
import { createPhoto } from "../../store/photos";
import { closeUploadModal } from "../../store/ui";
import SmallMapWrapper from "../MapInput";

const UploadPhotoForm = () => {
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [pictureUrl, setPictureUrl] = useState(null);
  const [page, setPage] = useState(1);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [genre, setGenre] = useState("");
  const [condition, setCondition] = useState("");
  const [transportation, setTransportation] = useState("");
  const [bestTimeOfDay, setBestTimeOfDay] = useState("");
  const [payment, setPayment] = useState("");
  const dispatch = useDispatch();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    setPicture(file);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setPictureUrl(fileReader.result);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("description", description);
    formData.append("images", picture);
    formData.append("latitude", +latitude);
    formData.append("longitude", +longitude);
    formData.append("genre", genre);
    formData.append("condition", condition);
    formData.append("transportation", transportation);
    formData.append("bestTimeOfDay", bestTimeOfDay);
    formData.append("payment", payment);
    dispatch(createPhoto(formData)) 
    dispatch(closeUploadModal());
  };

  return (
    <div className="upload-form-div">
      <form className="upload-form" onSubmit={handleSubmit}>
        {page === 1 ? (
          <div className="page-1">
            <div className="preview-image-container">
              <img src={pictureUrl} height="400px" />
            </div>
            <div className="upload-form-bottom">
              <div className="upload-form-left">
                <h1>Upload a Photo</h1>
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleFile}
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Add a description"
                  autoComplete="off"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="upload-form-right">
                <button
                  onClick={() => setPage(2)}
                  className="upload-form-buttons"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="page-2">
              <div className="latlong-and-map">
                <div className="latlng">
                  <input
                    type="text"
                    name="latitude"
                    placeholder="Latitude"
                    className="latlng-input"
                    autoComplete="off"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                  />
                  <input
                    type="text"
                    name="longitude"
                    placeholder="Longitude"
                    className="latlng-input"
                    autoComplete="off"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                  />
                  <p className="lat-long-directions">Click the map to get latitude and longitude.</p>
                </div>
                  <SmallMapWrapper setLatitude={setLatitude} setLongitude={setLongitude} lat={latitude} lng={longitude}/>
            </div>
              <div className="genres-container">
                <h1 className="radio-label">Genre: </h1>
                <div className="below-label">
                  <label htmlFor="genre">Wildlife</label>
                  <input
                    type="radio"
                    name="genre"
                    id="genre"
                    value="wildlife"
                    onChange={(e) => setGenre(e.target.value)}
                  />
                  <label htmlFor="genre">Street</label>
                  <input
                    type="radio"
                    name="genre"
                    id="genre"
                    value="street"
                    onChange={(e) => setGenre(e.target.value)}
                  />
                  <label htmlFor="genre">Landscape</label>
                  <input
                    type="radio"
                    name="genre"
                    id="genre"
                    value="landscape"
                    onChange={(e) => setGenre(e.target.value)}
                  />
                  <label htmlFor="genre">Portrait</label>
                  <input
                    type="radio"
                    name="genre"
                    id="genre"
                    value="portrait"
                    onChange={(e) => setGenre(e.target.value)}
                  />
                  <label htmlFor="genre">Astro</label>
                  <input
                    type="radio"
                    name="genre"
                    id="genre"
                    value="astro"
                    onChange={(e) => setGenre(e.target.value)}
                  />
                  <label htmlFor="genre">Aerial</label>
                  <input
                    type="radio"
                    name="genre"
                    id="genre"
                    value="aerial"
                    onChange={(e) => setGenre(e.target.value)}
                  />
                </div>
              </div>

              <div className="conditions-container">
                <h1 className="radio-label">Conditions: </h1>
                <div className="below-label">
                  <label htmlFor="condition">Rocky</label>
                  <input
                    type="radio"
                    name="condition"
                    id="condition"
                    value="rocky"
                    onChange={(e) => setCondition(e.target.value)}
                  />
                  <label htmlFor="condition">Slippery</label>
                  <input
                    type="radio"
                    name="condition"
                    id="condition"
                    value="slippery"
                    onChange={(e) => setCondition(e.target.value)}
                  />
                  {/* <label htmlFor="condition">Slope</label>
                  <input
                    type="radio"
                    name="condition"
                    id="condition"
                    value="slope"
                    onChange={(e) => setCondition(e.target.value)}
                  /> */}
                  <label htmlFor="condition">Snowy</label>
                  <input
                    type="radio"
                    name="condition"
                    id="condition"
                    value="snowy"
                    onChange={(e) => setCondition(e.target.value)}
                  />
                  <label htmlFor="condition">Windy</label>
                  <input
                    type="radio"
                    name="condition"
                    id="condition"
                    value="windy"
                    onChange={(e) => setCondition(e.target.value)}
                  />
                  <label htmlFor="condition">Rainy</label>
                  <input
                    type="radio"
                    name="condition"
                    id="condition"
                    value="rainy"
                    onChange={(e) => setCondition(e.target.value)}
                  />
                  {/* <label htmlFor="condition">Wildlife</label>
                  <input
                    type="radio"
                    name="condition"
                    id="condition"
                    value="wildlife"
                    onChange={(e) => setCondition(e.target.value)}
                  /> */}
                  {/* <label htmlFor="condition">Heat</label>
                  <input
                    type="radio"
                    name="condition"
                    id="condition"
                    value="heat"
                    onChange={(e) => setCondition(e.target.value)}
                  /> */}
                  <label htmlFor="condition">Shade</label>
                  <input
                    type="radio"
                    name="condition"
                    id="condition"
                    value="shade"
                    onChange={(e) => setCondition(e.target.value)}
                  />
                </div>
              </div>

              <div className="transportation-container">
                <h1 className="radio-label">Transportation: </h1>
                <div className="below-label">
                  <label htmlFor="transportation">Walk</label>
                  <input
                    type="radio"
                    name="transportation"
                    id="transportation"
                    value="walk"
                    onChange={(e) => setTransportation(e.target.value)}
                  />
                  <label htmlFor="transportation">Hike</label>
                  <input
                    type="radio"
                    name="transportation"
                    id="transportation"
                    value="hike"
                    onChange={(e) => setTransportation(e.target.value)}
                  />
                  <label htmlFor="transportation">Car</label>
                  <input
                    type="radio"
                    name="transportation"
                    id="transportation"
                    value="car"
                    onChange={(e) => setTransportation(e.target.value)}
                  />
                  {/* <label htmlFor="transportation">Backpacking</label>
                  <input
                    type="radio"
                    name="transportation"
                    id="transportation"
                    value="backpacking"
                    onChange={(e) => setTransportation(e.target.value)}
                  /> */}
                  <label htmlFor="transportation">Bike</label>
                  <input
                    type="radio"
                    name="transportation"
                    id="transportation"
                    value="bike"
                    onChange={(e) => setTransportation(e.target.value)}
                  />
                  <label htmlFor="transportation">Airplane</label>
                  <input
                    type="radio"
                    name="transportation"
                    id="transportation"
                    value="airplane"
                    onChange={(e) => setTransportation(e.target.value)}
                  />
                  <label htmlFor="transportation">Public</label>
                  <input
                    type="radio"
                    name="transportation"
                    id="transportation"
                    value="public"
                    onChange={(e) => setTransportation(e.target.value)}
                  />
                </div>
              </div>

              <div className="besttimeofday-container">
                <h1 className="radio-label">Best Time of Day: </h1>
                <div className="below-label">
                  {/* <label htmlFor="bestTimeOfDay">First Light</label>
                  <input
                    type="radio"
                    name="bestTimeOfDay"
                    id="bestTimeOfDay"
                    value="first light"
                    onChange={(e) => setBestTimeOfDay(e.target.value)}
                  /> */}
                  <label htmlFor="bestTimeOfDay">Sunrise</label>
                  <input
                    type="radio"
                    name="bestTimeOfDay"
                    id="bestTimeOfDay"
                    value="sunrise"
                    onChange={(e) => setBestTimeOfDay(e.target.value)}
                  />
                  <label htmlFor="bestTimeOfDay">Afternoon</label>
                  <input
                    type="radio"
                    name="bestTimeOfDay"
                    id="bestTimeOfDay"
                    value="afternoon"
                    onChange={(e) => setBestTimeOfDay(e.target.value)}
                  />
                  <label htmlFor="bestTimeOfDay">Golden Hour</label>
                  <input
                    type="radio"
                    name="bestTimeOfDay"
                    id="bestTimeOfDay"
                    value="golden hour"
                    onChange={(e) => setBestTimeOfDay(e.target.value)}
                  />
                  <label htmlFor="bestTimeOfDay">Sunset</label>
                  <input
                    type="radio"
                    name="bestTimeOfDay"
                    id="bestTimeOfDay"
                    value="sunset"
                    onChange={(e) => setBestTimeOfDay(e.target.value)}
                  />
                  <label htmlFor="bestTimeOfDay">Night</label>
                  <input
                    type="radio"
                    name="bestTimeOfDay"
                    id="bestTimeOfDay"
                    value="night"
                    onChange={(e) => setBestTimeOfDay(e.target.value)}
                  />
                </div>
              </div>

              <div className="payment-container">
                <h1 className="radio-label">Payment: </h1>
                <div className="below-label">
                  <label htmlFor="Payment">0</label>
                  <input
                    type="radio"
                    name="payment"
                    id="payment"
                    value="0"
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <label htmlFor="Payment">$</label>
                  <input
                    type="radio"
                    name="payment"
                    id="payment"
                    value="$"
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <label htmlFor="Payment">$$</label>
                  <input
                    type="radio"
                    name="payment"
                    id="payment"
                    value="$$"
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <label htmlFor="Payment">$$$</label>
                  <input
                    type="radio"
                    name="payment"
                    id="payment"
                    value="$$$"
                    onChange={(e) => setPayment(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-bottom-buttons">
                <button
                  onClick={() => setPage(1)}
                  className="upload-form-buttons"
                >
                  Back
                </button>
                <button type="submit" className="upload-form-buttons">
                  Upload
                </button>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default UploadPhotoForm;
