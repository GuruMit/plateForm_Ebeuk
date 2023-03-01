import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import {fournisseurData} from "../../data/fourniData";

//
import css from "./fournisseur.module.css";

const Fournisseur = () => {
  const [fournisseurList, setFournisseurList] = useState ([]);

  useEffect(() => {
    setFournisseurList(fournisseurList);
  }, []);

  return (
    <>
      <div className={css.container}>

        <Container  style={{ background: "#fff" , marginTop:'50px' }} >
        <h1>Fournisseurs Pres de Chez Vous</h1>
            <div className={css.content}>
            {fournisseurData.map((fournisseur, index) => (
                <li key={fournisseur.id} className={css.box}>
              <a>{fournisseur.name}</a>
            </li>
          ))}
            </div>
        </Container>
     
          </div>
    </>
  );
};

export default Fournisseur;