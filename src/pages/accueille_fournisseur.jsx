import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, useAuth } from "../contexts/authContext";

const Profile = () => {

  const {currentUser} = useAuth()


  return (
    <div>
    <h1>User Profile</h1>
    <p> {`The current Client is ${currentUser.displayName}`}</p>  
    <div>Activity Feed</div>
  </div>
  );
};

export default Profile;
