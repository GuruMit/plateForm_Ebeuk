import React, { useEffect, useState } from "react";

//
import { useFormik } from "formik";
import * as Yup from "yup";
//
import { Modal, Form, Button } from "react-bootstrap";
//
import { TextareaAutosize, TextField } from "@mui/material";

import css from "./pmodal.module.css";

//
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
//
import {
  otherPrestations,
  Budget,
  Urgence,
  Profile,
} from "../../data/modalData";
import { Input1, Input2 } from "../inputs/inputs";
import { Typeahead } from "react-bootstrap-typeahead";
import axios from "axios";

const FormulaireAnnonce = () => {
  const [valuePhone, setPhoneValue] = useState();

  const [step, setStep] = useState(1);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  //

  const validationSchema = Yup.object().shape({
    nom: Yup.string().required(
      "champs Requis et tel sur votre carte d'identité"
    ),
    prenom: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    prestation: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    detail: Yup.string().required("Required"),
    urgence: Yup.string().required("Required"),
    budget: Yup.string().required("Required"),
    profile: Yup.string().required("Required"),
    region: Yup.string().required("Required"),
    secteur: Yup.string().required("Required"),
  });

  //
  const [detail, setdetail] = useState("");

  const handleSubmit = async (values, { resetForm }) => {
    axios
      .post("/api", values)
      .then(() => {
        resetForm();
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(values);
    console.log("handleSubmit called");
  };

  //

  const formik = useFormik({
    initialValues: {
      description: "",
      detail: "",
      prestation: "",
      urgence: "",
      budget: "",
      profile: "",
      region: "",
      secteur: "",
      nom: "",
      prenom: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  //

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (formik.values.description.trim().length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [formik.values]);

  // useEffect(() => {
  //   if (formik.values.detail.trim().length > 0) {
  //     setIsButtonDisabled(false);
  //   } else {
  //     setIsButtonDisabled(true);
  //   }

  // }, [formik.values]);

  //

  // Load more items for the third Modal

  const [visible, setVisible] = useState(4);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 19);
  };

  //
  const [selectedPrestation, setSelectedPrestation] = useState(null);
  const [selectedUrgence, setSelectedUrgence] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  //
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Post Announcement
      </Button>

      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        keyboard={false}
        backdrop="static"
      >
        <Modal.Header closeButton>
          // <Modal.Title>Announcement Form</Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            {step === 1 && (
              <div className={css.modal_1_Content}>
                <TextField
                  onChange={formik.handleChange}
                  id="description"
                  value={formik.values.description}
                  placeholder="Ex: Besoin d'un animateur pour une Soiree d'aniversaire..."
                  variant="outlined"
                  inputProps={{ maxLength: 60 }}
                  name="description"
                />

                <p className={css.para}>
                  {60 - formik.values.description.trim().length} caracteres
                  restant
                </p>
              </div>
            )}{" "}
            {step === 2 && (
              <Form.Group controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <div className={css.modal_2_Content}>
                  <TextareaAutosize
                    onChange={formik.handleChange}
                    placeholder=" Je recherche un animateur pour...
                                    Mon besoin porte principalement sur....
                                    Le nombre d'année d'experience doit etre de.....
                                    L'animateur doit avoir au moins .... nombre de followers sur les reseaux 
                                    "
                    style={{ width: 750 }}
                    minRows={7}
                    name="detail"
                  />
                  <p>
                    {1000 - formik.values.detail.trim().length} caracteres
                    restants
                  </p>
                </div>
              </Form.Group>
            )}
            {step === 3 && (
              <Form.Group controlId="formBasicContact">
                <Form.Label>Contact Information</Form.Label>
                <div className={css.modal_3_Content}>
                  <div className={css.Container}>
                    <div className={css.Content}>
                      {otherPrestations.slice(0, visible).map((pres) => (
                        <div className={css.btnContainer}>
                          <Button
                            value={formik.values.prestation}
                            name="prestation"
                            onClick={() => {
                              formik.setFieldValue("prestation", pres.name);
                              setSelectedPrestation(pres.name);
                            }}
                            onChange={formik.handleChange}
                            style={{
                              backgroundColor:
                                selectedPrestation === pres.name
                                  ? "red"
                                  : "white",
                              color:
                                selectedPrestation === pres.name
                                  ? "white"
                                  : "black",
                            }}
                          >
                            {pres.name}
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button onClick={showMoreItems}>
                      Afficher toutes les presatations
                    </Button>
                  </div>
                </div>
              </Form.Group>
            )}
            {step === 4 && (
              <Form.Group controlId="formBasicContact">
                <Form.Label>Contact Information</Form.Label>
                <div className={css.modal_4_Content}>
                  <div className={css.Container}>
                    <div className={css.Content}>
                      {Budget.slice(0, visible).map((budget, index) => (
                        <div className={css.btnContainer}>
                          <Button
                            value={formik.values.budget}
                            name="budget"
                            onClick={() => {
                              formik.setFieldValue("budget", budget.budget);
                              setSelectedBudget(budget.budget);
                            }}
                            onChange={formik.handleChange}
                            style={{
                              backgroundColor:
                                selectedBudget === budget.budget
                                  ? "red"
                                  : "white",
                              color:
                                selectedBudget === budget.budget
                                  ? "white"
                                  : "black",
                            }}
                          >
                            {budget.budget}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Form.Group>
            )}
            {step === 5 && (
              <Form.Group controlId="formBasicContact">
                <Form.Label>Contact Information</Form.Label>
                <div className={css.modal_4_Content}>
                  <div className={css.Container}>
                    <div className={css.Content}>
                      {Urgence.slice(0, visible).map((urgence, index) => (
                        <div className={css.btnContainer}>
                          <Button
                            onClick={() => {
                              formik.setFieldValue("urgence", urgence.urg);
                              setSelectedUrgence(urgence.urg);
                            }}
                            onChange={formik.handleChange}
                            value={formik.values.urgence}
                            name="urgence"
                            style={{
                              backgroundColor:
                                selectedUrgence === urgence.urg
                                  ? "red"
                                  : "white",
                              color:
                                selectedUrgence === urgence.urg
                                  ? "white"
                                  : "black",
                            }}
                          >
                            {urgence.urg}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Form.Group>
            )}
            {step === 6 && (
              <Form.Group controlId="formBasicContact">
                <Form.Label>Contact Information</Form.Label>
                <div className={css.modal_4_Content}>
                  <div className={css.Container}>
                    <div className={css.Content}>
                      {Profile.slice(0, visible).map((profile, index) => (
                        <div className={css.btnContainer}>
                          <Button
                            onClick={() => {
                              formik.setFieldValue("profile", profile.profile);
                              setSelectedProfile(profile.profile);
                            }}
                            onChange={formik.handleChange}
                            value={formik.values.profile}
                            name="profile"
                            style={{
                              backgroundColor:
                                selectedProfile === profile.profile
                                  ? "red"
                                  : "white",
                              color:
                                selectedProfile === profile.profile
                                  ? "white"
                                  : "black",
                            }}
                          >
                            {profile.profile}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Form.Group>
            )}
            {step === 7 && (
              <Form.Group controlId="formBasicContact">
                <Form.Label>Contact Information</Form.Label>
                <div className={css.modal_8_Content}>
                  <div className={css.Container}>
                    <div className={css.Content}>
                      <div className={css.textFields}>
                        <TextField
                          margin="dense"
                          id="nom"
                          label="Nom/Name"
                          value={formik.values.nom}
                          onChange={formik.handleChange}
                          color="warning"
                          error={
                            formik.touched.nom && Boolean(formik.errors.nom)
                          }
                          helperText={formik.touched.nom && formik.errors.nom}
                        />
                        <TextField
                          margin="dense"
                          id="prenom"
                          label="Prenom/surname"
                          value={formik.values.prenom}
                          onChange={formik.handleChange}
                          color="warning"
                          error={
                            formik.touched.prenom &&
                            Boolean(formik.errors.prenom)
                          }
                          helperText={
                            formik.touched.prenom && formik.errors.prenom
                          }
                        />

                        <div className={css.inputs}>
                          <Form.Group>
                            <Typeahead
                              id="1"
                              labelKey="name"
                              onChange={(selected) =>
                                formik.setFieldValue(
                                  "region",
                                  selected[0]?.name || ""
                                )
                              }
                              options={option2}
                              placeholder="Region..."
                              selected={
                                formik.values.region
                                  ? [formik.values.region]
                                  : []
                              }
                              error={
                                formik.touched.region &&
                                Boolean(formik.errors.region)
                              }
                              helperText={
                                formik.touched.region && formik.errors.region
                              }
                            />
                             {formik.touched.region && formik.errors.region ? (
                              <div style={{fontSize:'12px', float:"right"}} className="text-danger">
                                {formik.errors.region}
                              </div>
                            ) : null}
                          </Form.Group>

                          <Form.Group>
                            <Typeahead
                              id="2"
                              labelKey="name"
                              onChange={(selected) =>
                                formik.setFieldValue(
                                  "secteur",
                                  selected[0]?.name || ""
                                )
                              }
                              options={option1}
                              placeholder="Votre secteur ? ..."
                              selected={
                                formik.values.secteur
                                  ? [formik.values.secteur]
                                  : []
                              }
                              error={
                                formik.touched.secteur &&
                                Boolean(formik.errors.secteur)
                              }
                              helperText={
                                formik.touched.secteur && formik.errors.secteur
                              }
                            />
                            {formik.touched.secteur && formik.errors.secteur ? (
                              <div style={{fontSize:'12px', float:"right"}} className="text-danger">
                                {formik.errors.secteur}
                              </div>
                            ) : null}
                          </Form.Group>
                        </div>

                        <PhoneInput
                          value={formik.values.phone}
                          onChange={(value) =>
                            formik.setFieldValue("phone", value)
                          }
                          onBlur={formik.handleBlur("phone")}
                          countries={["CM"]}
                          addInternationalOption={false}
                          placeholder="Phone Number"
                          className={css.phoneForm}
                          label="Phone Number"
                        />
                         {formik.errors.phone && formik.touched.phone && (
          <div className={css.error}>{formik.errors.phone}</div>
        )}
                      </div>

                      <p style={{marginTop:"20px"}}>
                        Le remplisage du Formulaire implique que vous avez lu et
                        accepter
                        <span>  les termes et condition d'utilsation.</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Form.Group>
            )}
          </Modal.Body>
          <Modal.Footer className={css.footer}>
            {step > 1 && (
              <Button variant="secondary" onClick={handlePrev}>
                Previous
              </Button>
            )}
            {step < 7 && (
              <Button
                disabled={isButtonDisabled}
                variant="primary"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
            {step === 7 && (
              <Button
                variant="primary"
                disabled={formik.isSubmitting}
                onClick={formik.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            )}
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default FormulaireAnnonce;

var option1 = [
  { id: 1, name: "Akon" },
  { id: 2, name: "Ngolguet" },
  { id: 3, name: "Biyem-Assi" },
  { id: 4, name: "Melen" },
];

var option2 = [
  { id: 1, name: "Sagmelima" },
  { id: 2, name: "Yaooundé" },
  { id: 3, name: "Douala" },
  { id: 4, name: "Mbalmayo" },
];
