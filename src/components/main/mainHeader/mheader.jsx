import React, { useEffect, useState }  from "react";
import { Button, Container } from "react-bootstrap";
import FormulaireAnnonce from "../../modal/pModal";
import ParentModal from "../../modal/pModal";

//
import css from "./mheader.module.css"

const Mheader = () => {

  return (
    <>
      <Container style={{marginBottom:'50px'}}>
        <div className={css.container}>
          <h1>Les Dernier Annonces</h1>
          <FormulaireAnnonce/>
        </div>
      </Container>
    </>
  );
};

export default Mheader;
