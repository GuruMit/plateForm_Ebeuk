import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import {villeData} from "../../data/villeData";

//
import css from "./ville.module.css";

const Ville = () => {
  const [villeList, setVillList] = useState ([]);

  useEffect(() => {
    setVillList(villeList);
  }, []);

  return (
    <>

      <div className={css.container}>

      
        <Container fluid style={{ background: "#fff",marginTop:'50px',paddingLeft:"200px"}} >
        <h1>Prestataire Pres de Chez Vous</h1>
            <div className={css.content}>
            {villeData.map((ville, index) => (
              <li key={ville.id} className={css.box}>
              <a>{ville.name}</a>
            </li>
          ))}
            </div>
        </Container>
     
      </div>
    </>
  );
};

export default Ville;
