import axios from "axios";
import React, { useEffect } from "react";

const Firebaseservice = ({ token }) => {
  useEffect(() => {
   
        fetchData(token);
    
  }, [token]);

  const fetchData = async (token) => {
    const res = await axios.get("http://localhost:5000/api/todos", {
        headers:{
            Authorization: 'Bearer'+ token ,
        },
    });

    console.log(res.data);
  };

    return (
      <div>
      <h1>List of TODO</h1>
    </div>
  );
};

export default Firebaseservice;
