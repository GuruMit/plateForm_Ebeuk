import React from "react";
import { Container } from "react-bootstrap";
import ImageSlider from "../components/header/backgroundslider/bgslider";
import Header from "../components/header/header";
import Slider from "../components/header/slider/slider";
import Main from "../components/main/main";
import MainCopy from "../components/main/mainCopy";
import { useAuth } from "../contexts/authContext";
import Firebaseservice from "../test/firebaseservice";

const Annonce = () => {
  const { currentUser , token } = useAuth();

  return (
    <div>
      <Header />
      <p> {`The current Client is ${currentUser}`}</p>  
      <p> {JSON.stringify(currentUser, null, 2)}</p>
      <Firebaseservice/>
      <p> {`The current Client Token is ${token}`}</p>  

      <Main />

    </div>
  );
};

export default Annonce;
