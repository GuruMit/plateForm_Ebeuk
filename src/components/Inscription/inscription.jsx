import React, { useState } from "react";
import { Container } from "react-bootstrap";
import css from "./inscription.module.css";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

//
import Clientform from "../inscClient/formClient";
import InscFournisseur from "../inscFournisseur/formFournisseur";
import { InfoFournisseur, InfoClient } from "../inscriptionInfo/info";

const Inscription = () => {
  return (
    <>
      <div className={css.title}>
        <Container className={css.tContainer}>
          <h1>Inscription</h1>
          <p>
            L'inscription est rapide et graduite. Rejoignez notre Communauté !
          </p>
        </Container>
      </div>

      <div>
        <Container fluid className={css.insBody}>
          <div className={css.tabContainer}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row className={css.row}>
                <Col className={css.col1} sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item className={css.nav_item}>
                      <Nav.Link
                        // style={{border:'1px solid red', with:'250px'}}
                        className={css.nav_link}
                        eventKey="first"
                      >
                        CLIENT
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className={css.nav_item}>
                      <Nav.Link className={css.nav_link} eventKey="second">
                        FOURNISSEUR
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>

                <Col className={css.info} sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <InfoClient />
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <InfoFournisseur />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>

                <Col className={css.col2} sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <Clientform />
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <InscFournisseur />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Inscription;
