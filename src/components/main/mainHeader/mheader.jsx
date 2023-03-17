import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import FormulaireAnnonce from "../../modal/pModal";
import ParentModal from "../../modal/pModal";

//
import css from "./mheader.module.css";

const Mheader = () => {
  return (
    <>
      <Container
        fluid
        style={{ 
          marginBottom: "50px", 
          padding:'0px 100px'
        }}
      >
        <div className={css.container}>
          <h1 style={{marginLeft:"140px"}}>Les Derniers Annonces</h1>
          <FormulaireAnnonce />
        </div>
      </Container>
    </>
  );
};

export default Mheader;
