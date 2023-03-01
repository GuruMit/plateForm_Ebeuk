


import { List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import React , {useState,useEffect} from 'react'

const Test = () => {

  const[announcements , setannouncementData] = useState({ annonces: [] })

    useEffect(() => {
      fetchAnnouncements();
    }, []);
    
    const fetchAnnouncements = async () => {
      try {
         await axios.get('/api')
        .then(response => {
          setannouncementData({ annonces: response.data })
        })
        .catch(error => {
          console.log("api error")
        })
    
      } catch (error) {
        console.error("try catch error");
      }
    };

    announcements.annonces.sort((a, b) => new Date(b.date) - new Date(a.date));

   




  return (
    <div>

{(typeof announcements.annonces==='undefined') ? (

  <p>loading</p>
) : (
  <List>
  {announcements.annonces.map((announcement) => (
    <ListItem key={announcement.id}>
       <ListItemText
            primary={
              <>
              <div>Profile: {announcement.profile}</div>
                <div>Budget: {announcement.budget}</div>
                <div>Detail: {announcement.detail}</div>
                <div>description: {announcement.description}</div>
              </>

            }

            secondary={
              <>
                <div>Prestation: {announcement.prestation}</div>
                
              </>
            
            }
            
          />
    </ListItem>
  ))}
</List>
)}



    </div>
  )
}

export default Test















































































































// // import React, { useState } from "react";
// // //
// // import { Button, Container, Form } from "react-bootstrap";
// // //
// // import { Formik, useFormik } from "formik";
// // import * as Yup from "yup";
// // //
// // import css from "./formclient.module.css";
// // import { width } from "@mui/system";
// // import {
// //   FormControl,
// //   IconButton,
// //   InputAdornment,
// //   InputLabel,
// //   MenuItem,
// //   OutlinedInput,
// // } from "@mui/material";
// // import { Visibility, VisibilityOff } from "@mui/icons-material";
// // //
// // import PhoneInput from "react-phone-number-input";
// // import "react-phone-number-input/style.css";
// // import TextField from "@mui/material/TextField";
// // //
// // import axios from "axios";
// // //

// // const FormClient = () => {
// //   const [valuePhone, setPhoneValue] = useState();
// //   //

// //   //
// //   const [message, setMessage] = useState("");

// //   const handleSubmit = async (values) => {
// //     try {
// //       const response = await fetch("/api/clients", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(values),
// //       });
// //       const data = await response.json();
// //       setMessage(data.message);
// //     } catch (error) {
// //       setMessage("An error occurred while submitting the form");
// //     }
// //     console.log(values);
// //     console.log("handleSubmit called");
// //   };

// //   //
// //   const [showPassword, setShowPassword] = React.useState(false);

// //   const handleClickShowPassword = () => setShowPassword((show) => !show);

// //   const handleMouseDownPassword = (event) => {
// //     event.preventDefault();
// //   };

// //   //

// //   const validationSchema = Yup.object().shape({
// //     prenom: Yup.string()
// //       .min(3, "au moins 3 caractére")
// //       .max(50, "Name cannot exceed 50 characters")
// //       .required("*requis"),
// //     nom: Yup.string()
// //       .min(3, "au moins 3 caractére")
// //       .max(50, "Name cannot exceed 50 characters")
// //       .required("*requis"),
// //     phone: Yup.string()
// //       .matches(/^(\+237)?[2368]\d{8}$/, "Invalid phone number")
// //       .required(" le Numero de telephone est requis"),

// //     email: Yup.string().matches(
// //       /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
// //       "*email invalid"
// //     ),
// //     selectedOption: Yup.string().required("Required"),
// //     password: Yup.string()
// //       .matches(
// //         /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
// //         "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"
// //       )
// //       .min(8, "Password must be at least 8 characters")
// //       .required("Mot de passe requis"),
// //     // confirmPassword: Yup.string()
// //     //   .oneOf([Yup.ref("password"), null], "Passwords must match")
// //     //   .required("Confirm Password is required"),
// //   });

// //   const formik = useFormik({});

// //   //

// //   //

// //   const [phone, setPhone] = useState("");

// //   //

// //   return (
    
// //       <Formik
// //         initialValues={{
// //           prenom: "",
// //           nom: "",
// //           email: "",
// //           selectedOption: "",
// //           phone: "",
// //           password: "",
// //         }}
// //         validationSchema={validationSchema}
// //         onSubmit={handleSubmit}
// //       >
// //         {({
// //           values,
// //           errors,
// //           touched,
// //           isSubmitting,
// //           handleChange,
// //           handleBlur,
// //           setFieldValue,
// //         }) => (
// //           <>
// //             <Form>
// //               <div className={css.name}>
// //                 <div>
// //                   <p>Prenom</p>
// //                   <TextField
// //                     required
// //                     placeholder="Prenom"
// //                     id="prenom"
// //                     name="prenom"
// //                     value={values.prenom}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                   />
// //                   {touched.prenom && errors.prenom ? (
// //                     <div
// //                       style={{
// //                         position: "relative",
// //                         bottom: "90px",
// //                         float: "right",
// //                         color: "red",
// //                       }}
// //                     >
// //                       ({errors.prenom})
// //                     </div>
// //                   ) : null}
// //                 </div>

// //                 <div>
// //                   <p>Nom de Famille</p>
// //                   <TextField
// //                     required
// //                     placeholder="Prenom"
// //                     id="nom"
// //                     name="nom"
// //                     value={values.nom}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                   />
// //                   {touched.nom && errors.nom ? (
// //                     <div
// //                       style={{
// //                         position: "relative",
// //                         bottom: "90px",
// //                         float: "right",
// //                         color: "red",
// //                       }}
// //                     >
// //                       ({errors.nom})
// //                     </div>
// //                   ) : null}
// //                 </div>
// //               </div>

// //               <div className={css.addresse}>
// //                 <p>Addresse</p>
// //                 <div>
// //                   <TextField
// //                     placeholder="Votre addresse ici"
// //                     id="email"
// //                     name="email"
// //                     value={values.email}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                   />
// //                   {touched.email && errors.email ? (
// //                     <div
// //                       style={{
// //                         position: "relative",
// //                         bottom: "90px",
// //                         float: "right",
// //                         color: "red",
// //                       }}
// //                     >
// //                       ({errors.email})
// //                     </div>
// //                   ) : null}
// //                 </div>
// //               </div>

// //               <div className={css.over}>
// //                 <div className={css.villes}>
// //                   <div className="ville">
// //                     <p>Ville</p>
// //                     <TextField
// //                       id="outlined-select-villes"
// //                       select
// //                       name="selectedOption"
// //                       label="Option des choix"
// //                       value={values.selectedOption}
// //                       onChange={handleChange}
// //                       onBlur={handleBlur}
// //                       error={
// //                         touched.selectedOption && Boolean(errors.selectedOption)
// //                       }
// //                       helperText={
// //                         touched.selectedOption && errors.selectedOption
// //                       }
// //                     >
// //                       {Villes.map((ville) => (
// //                         <MenuItem key={ville.id} value={ville.id}>
// //                           {ville.name}
// //                         </MenuItem>
// //                       ))}
// //                     </TextField>
// //                   </div>
// //                 </div>

// //                 <div className={css.phone}>
// //                   <p>Telephone</p>
// //                   <PhoneInput
// //                     value={values.phone}
// //                     onChange={(value) => setFieldValue("phone", value)}
// //                     onBlur={handleBlur("phone")}
// //                     countries={["CM"]}
// //                     addInternationalOption={false}
// //                     placeholder="Enterez votre Numero"
// //                     className={css.phoneForm}
// //                   />
// //                   {touched.phone && errors.phone && (
// //                     <div
// //                       style={{
// //                         position: "relative",
// //                         bottom: "110px",
// //                         right: "-370px",
// //                         color: "red",
// //                         width: "fit-content",
// //                       }}
// //                       className="error"
// //                     >
// //                       {errors.phone}
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>

// //               <div className={css.motdePasse}>
// //                 <p>Mot de passe</p>
// //                 <div>
// //                   <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
// //                     <InputLabel htmlFor="outlined-adornment-password">
// //                       Password
// //                     </InputLabel>
// //                     <OutlinedInput
// //                       required
// //                       placeholder="Password"
// //                       id="f_pwrd"
// //                       name="password"
// //                       value={values.password}
// //                       onChange={handleChange}
// //                       onBlur={handleBlur}
// //                       error={touched.password && Boolean(errors.password)}
// //                       helperText={touched.password && errors.password}
// //                       type={showPassword ? "text" : "password"}
// //                       endAdornment={
// //                         <InputAdornment position="end">
// //                           <IconButton
// //                             aria-label="toggle password visibility"
// //                             onClick={handleClickShowPassword}
// //                             onMouseDown={handleMouseDownPassword}
// //                             edge="end"
// //                           >
// //                             {showPassword ? <VisibilityOff /> : <Visibility />}
// //                           </IconButton>
// //                         </InputAdornment>
// //                       }
// //                       label="Password"
// //                     />
// //                     {touched.password && errors.password ? (
// //                       <div
// //                         style={{
// //                           position: "relative",
// //                           bottom: "0px",
// //                           float: "right",
// //                           color: "red",
// //                         }}
// //                       >
// //                         ({errors.password})
// //                       </div>
// //                     ) : null}
// //                   </FormControl>
// //                 </div>
// //               </div>

// //               <div className={css.submit}>
// //                 <p>
// //                   La création d'un compte implique que vous avez lu et accepté
// //                   les
// //                   <span> termes et conditions d'utilisation.</span>{" "}
// //                 </p>
// //                 <Button type="submit" disabled={isSubmitting}>
// //                   S'inscrire
// //                 </Button>
// //               </div>
// //             </Form>
// //           </>
// //         )}
// //       </Formik>
// //   );
// // };

// // export default FormClient;

// // //

// //   export const Villes = [
// //     {
// //       id: 1,
// //       name: "Sangmelima",
// //     },
// //     {
// //       id: 2,
// //       name: "Kribi",
// //     },

// //     {
// //       id: 3,
// //       name: "Yaoundé",
// //     },
// //     {
// //       id: 4,
// //       name: "Douala",
// //     },
// //     {
// //       id: 5,
// //       name: "Ngoundere",
// //     },
// //     {
// //       id: 6,
// //       name: "Ebolowa",
// //     },
// //     {
// //       id: 7,
// //       name: "Limbé",
// //     },
// //     {
// //       id: 8,
// //       name: "Dschang",
// //     },

// //     {
// //       id: 9,
// //       name: "Edea",
// //     },
// //     {
// //       id: 10,
// //       name: "Bafoussam",
// //     },
// //     {
// //       id: 11,
// //       name: "Mbouda",
// //     },
// //     {
// //       id: 12,
// //       name: "Bafia",
// //     },
// //     {
// //       id: 13,
// //       name: "Tiko",
// //     },
// //     {
// //       id: 14,
// //       name: "Mora",
// //     },

// //     {
// //       id: 15,
// //       name: "Bali",
// //     },
// //     {
// //       id: 16,
// //       name: "Akonolinga",
// //     },
// //     {
// //       id: 17,
// //       name: "Ngoundere",
// //     },
// //     {
// //       id: 18,
// //       name: "Obala",
// //     },
// //     {
// //       id: 19,
// //       name: "Batibo",
// //     },
// //     {
// //       id: 20,
// //       name: "Koutaba",
// //     },

// //     {
// //       id: 21,
// //       name: "Garoua",
// //     },
// //   ];



// import React, { useRef, useState } from "react";
// import { Button, ButtonToolbar, Container, Form } from "react-bootstrap";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";

// //
// import css from "./formfournisseur.module.css";
// import { width } from "@mui/system";
// import {
//   FormControl,
//   IconButton,
//   InputAdornment,
//   InputLabel,
//   MenuItem,
//   OutlinedInput,
// } from "@mui/material";
// //
// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";
// //
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { Typeahead } from "react-bootstrap-typeahead";
// // Css class
// import 'react-bootstrap-typeahead/css/Typeahead.css';





// const InscFournisseur = () => {
//   const [valuePhone, setPhoneValue] = useState();
//   //
//   const [showPassword, setShowPassword] = React.useState(false);

//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };
//   //
//   const ref = useRef();
//   //
//   return (
//     <>
//       <Box
//         component="form"
//         sx={{
//           "& .MuiTextField-root": { m: 1, width: "25ch" },
//         }}
//         noValidate
//         autoComplete="off"
//       >
//        <div className={css.motdePasse}>
//           <p>Addresse Mail</p>
//           <div>
//             <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
//               <InputLabel htmlFor="outlined-adornment-password">
//                 Mail
//               </InputLabel>
//               <OutlinedInput
//                 id="outlined-adornment-password"
//                 label="Password"
//               />
//             </FormControl>
//           </div>
//         </div>

//         <div className={css.pseudo}>
//           <p>Pseudo</p>
//           <div>
//             <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
//               <InputLabel htmlFor="outlined-adornment-password">
//                 Pseudo
//               </InputLabel>
//               <OutlinedInput
//                 id="pseudo"
//                 label="Nom d'utilisateur"
//               />
//             </FormControl>
//           </div>
//         </div>

//         <div className={css.motdePasse}>
//           <p>Mot de passe</p>
//           <div>
//             <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
//               <InputLabel htmlFor="outlined-adornment-password">
//                 Password
//               </InputLabel>
//               <OutlinedInput
//                 id="c_pwrd"
//                 type={showPassword ? "text" : "password"}
//                 endAdornment={
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={handleClickShowPassword}
//                       onMouseDown={handleMouseDownPassword}
//                       edge="end"
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 }
//                 label="Password"
//               />
//             </FormControl>
//           </div>
//         </div>


//         <div className={css.presContainer}>
//         <Typeahead
//         defaultSelected={Prestations.slice(0, 4)}
//         className={css.prestation}
//         labelKey="name"
//         multiple
//         options={Prestations}
//         placeholder="Quelle type de prestation prestez vous ? ..."
//         ref={ref}
//         size='lg'
//         id="fprestations"
//       />
//       <ButtonToolbar style={{ marginTop: '10px', marginLeft:'10px' }}>
//         <Button onClick={() => ref.current?.clear()}>Clear</Button>
//       </ButtonToolbar>
//         </div>


//         <div className={css.over}>
//           <div className={css.villes}>
//             <div className="ville">
//               <p>Ville</p>
//               <TextField
//                 id="outlined-select-villes"
//                 select
//                 label="Select"
//                 defaultValue={1}
//                 helperText="Choisisez votre ville"
//               >
//                 {Villes.map((ville) => (
//                   <MenuItem key={ville.id} value={ville.id}>
//                     {ville.name}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </div>
//           </div>

//           <div className={css.phone}>
//             <p>Telephone</p>
//             <PhoneInput
//               countries={["CM"]}
//               addInternationalOption={false}
//               placeholder="Enterez votre Numero"
//               value={valuePhone}
//               onChange={setPhoneValue}
//               className={css.phoneForm}
//             />
//           </div>
//         </div>

//         <div className={css.submit}>
//           <p>La création d'un compte implique que vous avez lu et accepté les
//             <span> termes et conditions d'utilisation.</span> </p>
//             <Button>S'inscrire</Button>
//         </div>
//       </Box>
//     </>
//   );
// };

// export default InscFournisseur;

// //


// export const Prestations = [{
//   name: 'WEDDING PLANNER',
// },
// {
//   name: 'PHOTOGRAPHE',
// },
// {
//   name: 'TRAITEUR',
// },

// {
//   name: 'WEDDING PLANNER',
// },
// {
//   name: 'PHOTOGRAPHE',
// },
// {
//   name: 'GRAPHISTE',
  
// },
// {
//   name: 'PHOTOGRAPHE',
// },
// {
//   name: 'TRAITEUR',
// },

// {
//   name: 'WEDDING PLANNER',
// },
// {
//   name: 'PHOTOGRAPHE',
// },
// {
//   name: 'GRAPHISTE',
  
// },
// {
//   name: 'PHOTOGRAPHE',
// },
// {
//   name: 'TRAITEUR',
// },

// {
//   name: 'WEDDING PLANNER',
// },
// {
//   name: 'PHOTOGRAPHE',
// },
// {
//   name: 'GRAPHISTE',
  
// }
// ]





// export const Villes = [
//   {
//     id: 1,
//     name: "Sangmelima",
//   },
//   {
//     id: 2,
//     name: "Kribi",
//   },

//   {
//     id: 3,
//     name: "Yaoundé",
//   },
//   {
//     id: 4,
//     name: "Douala",
//   },
//   {
//     id: 5,
//     name: "Ngoundere",
//   },
//   {
//     id: 6,
//     name: "Ebolowa",
//   },
//   {
//     id: 7,
//     name: "Limbé",
//   },
//   {
//     id: 8,
//     name: "Dschang",
//   },

//   {
//     id: 9,
//     name: "Edea",
//   },
//   {
//     id: 10,
//     name: "Bafoussam",
//   },
//   {
//     id: 11,
//     name: "Mbouda",
//   },
//   {
//     id: 12,
//     name: "Bafia",
//   },
//   {
//     id: 13,
//     name: "Tiko",
//   },
//   {
//     id: 14,
//     name: "Mora",
//   },

//   {
//     id: 15,
//     name: "Bali",
//   },
//   {
//     id: 16,
//     name: "Akonolinga",
//   },
//   {
//     id: 17,
//     name: "Ngoundere",
//   },
//   {
//     id: 18,
//     name: "Obala",
//   },
//   {
//     id: 19,
//     name: "Batibo",
//   },
//   {
//     id: 20,
//     name: "Koutaba",
//   },

//   {
//     id: 21,
//     name: "Garoua",
//   },
// ];





// import React, { useEffect, useState } from "react";
// import { Button, Modal, Form } from "react-bootstrap";
// import css from "./pmodal.module.css";
// import { TextField } from "@mui/material";
// import { useFormik } from "formik";
// import TextareaAutosize from "@mui/base/TextareaAutosize";
// import {
//   otherPrestations,
//   Budget,
//   Urgence,
//   Profile,
// } from "../../data/modalData";
// import { Input1, Input2 } from "../inputs/inputs";
// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";
// import AnnonceList from "../annonceList/anonceList";

// const ParentModal = (props) => {
//   //  Les etats pour gerer les pop-up
//   const formik = useFormik({
//     initialValues: {
//     description: "",
//     message: "",
//     categorie: "",
//     budget: "",
//     urgence: "",
//     profile: "",
//     residence: "",
//     ville: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: handleSubmit
    
//   });


//   const handleSubmit = async (values ,  { setSubmitting }) => {
//     // try {
//     // console.log('Sending request to:', '/api/clients');

//     //   const response = await fetch('/api/clients', {
//     //     method: 'POST',
//     //     headers: {
//     //       "Content-Type": "application/json",
//     //     },
//     //     body: JSON.stringify(values),
//     //   });
//     //   const data = await response.json();
//     //   setMessage(data.message);     
//     // } catch (error) {
//     //   setMessage("An error occurred while submitting the form");
//     // }
//     console.log(values);
//     console.log("handleSubmit called");
//   };


//   // HERE I TRIED TO UPDATE THE DATA WITHOUT UPLOADING FILE



//   // END OF DOWNLOADING  JSON FILE

//   {
//     /* les etats pour gerer la deactivation du button suivant lorsque
//     le champs de text n'a pas ete saisie */
//   }

//   // cette etas du button est mise pour toute function deactivation
//   // du button dans les different modales
//   const [isButtonDisabled, setIsButtonDisabled] = useState(true);

//   useEffect(() => {
//     if (
//       formData["description"].trim().length > 0 ||
//       formData["message"].trim().length > 0
//     ) {
//       setIsButtonDisabled(false);
//     } else {
//       setIsButtonDisabled(true);
//     }
//   }, [formData]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value
//     })) ;
//     event.preventDefault();
//   };

//   // const [buttonValue, setButtonValue] = useState('');

//   // const handleOnClick = (e) => {
//   //   const buttonValue = e.target.value;
//   //   console.log(buttonValue)
//   //   setButtonValue(buttonValue)

//   // };

//   {
//     /* les etats pour gerer la deactivation du button suivant lorsque
//     le champs de textarea n'a pas ete saisie */
//   }

//   //   useEffect(() => {
//   //     if (formData['message'].trim().length > 0) {
//   //       setIsButtonDisabled(false);
//   //     } else {
//   //       setIsButtonDisabled(true);
//   //     }
//   //   }, [formData]);

//   //   const handletextareaInputChange = (event) => {
//   //     settextareaValue(event.target.value);
//   //   };

//   // Load more items for the third Modal

//   const [visible, setVisible] = useState(4);

//   const showMoreItems = () => {
//     setVisible((prevValue) => prevValue + 19);
//   };

//   // Chose Region Parameters for the Seventh Modal

//   // Phone number State parameters

//   const [valuePhone, setPhoneValue] = useState();

//   //
  
//   const [step, setStep] = useState(1);
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const handleNext = () => setStep(step + 1);
//   const handlePrev = () => setStep(step - 1);

//   // Annoce List




//   return (
//     <>

//       <Button variant="primary" onClick={handleShow}>
//         Post Announcement
//       </Button>

//       <Form>


  //       <Modal  size="lg" show={show} onHide={handleClose} keyboard={false}>
  //         <Modal.Header closeButton>
  //           <Modal.Title>Announcement Form</Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body>
  //           <Form>
  //             {step === 1 && (
  //               <Form.Group controlId="formBasicTitle">
  //                 <div className={css.modal_1_Content}>
  //                   <TextField
  //                     onChange={handleInputChange}
  //                     id="description"
  //                     placeholder="Ex: Besoin d'un animateur pour une Soiree d'aniversaire..."
  //                     variant="outlined"
  //                     inputProps={{ maxLength: 60 }}
  //                     name="description"
  //                     />

  //                   <p className={css.para}>
  //                     {60 - formData.description.trim().length} caracteres restant
  //                   </p>
  //                 </div>
  //               </Form.Group>
  //             )}
  //             {step === 2 && (
  //               <Form.Group controlId="formBasicDescription">
  //                 <Form.Label>Description</Form.Label>
  //                 <div className={css.modal_2_Content}>
  //                   <TextareaAutosize
  //                     onChange={handleInputChange}
  //                     aria-label="empty textarea"
  //                     placeholder=" Je recherche un animateur pour...
  //                     Mon besoin porte principalement sur....
  //                     Le nombre d'année d'experience doit etre de.....
  //                     L'animateur doit avoir au moins .... nombre de followers sur les reseaux 
  //                     "
  //                     style={{ width: 750 }}
  //                     minRows={7}
  //                     name="message"
  //                     />
  //                   <p>
  //                     {1000 - formData.message.trim().length} caracteres restants
  //                   </p>
  //                 </div>
  //               </Form.Group>
  //             )}
  //             {step === 3 && (
  //               <Form.Group controlId="formBasicContact">
  //                 <Form.Label>Contact Information</Form.Label>
  //                 <div className={css.modal_3_Content}>
  //                 <div className={css.Container}>
  //                   <div className={css.Content}>
  //                     {otherPrestations.slice(0, visible).map((pres, index) => (
  //                       <div className={css.btnContainer}>
  //                         <Button
  //                           onClick={handleInputChange}
  //                           value={pres.name}
  //                           name="categorie"
  //                           >
  //                           {pres.name}
  //                         </Button>
  //                       </div>
  //                     ))}
  //                   </div>
  //                   <Button onClick={showMoreItems}>
  //                     Afficher toutes les categories
  //                   </Button>
  //                 </div>
  //                 </div>
  //               </Form.Group>
  //             )}
  //             {step === 4 && (
  //               <Form.Group controlId="formBasicContact">
  //                 <Form.Label>Contact Information</Form.Label>
  //                 <div className={css.modal_4_Content}>
  //                 <div className={css.Container}>
  //                   <div className={css.Content}>
  //                     {Budget.slice(0, visible).map((budget, index) => (
  //                       <div className={css.btnContainer}>
  //                         <Button
  //                           onClick={handleInputChange}
  //                           value={budget.budget}
  //                           name="budget"
  //                         >
  //                           {budget.budget}
  //                         </Button>
  //                       </div>
  //                     ))}
  //                   </div>
  //                 </div>
  //             </div>
  //               </Form.Group>
  //             )}
  //             {step === 5 && (
  //               <Form.Group controlId="formBasicContact">
  //                 <Form.Label>Contact Information</Form.Label>
  //                 <div className={css.modal_4_Content}>

  //                 <div className={css.Container}>
  //                   <div className={css.Content}>
  //                     {Urgence.slice(0, visible).map((urg, index) => (
  //                       <div className={css.btnContainer}>
  //                         <Button
  //                           onClick={handleInputChange}
  //                           value={urg.urg}
  //                           name="urgence"
  //                           >
  //                           {urg.urg}
  //                         </Button>
  //                       </div>
  //                     ))}
  //                   </div>
  //                 </div>
  //                     </div>
  //               </Form.Group>
  //             )}
  //             {step === 6 && (
  //               <Form.Group controlId="formBasicContact">
  //                 <Form.Label>Contact Information</Form.Label>
  //                 <div className={css.modal_4_Content}>

  //                 <div className={css.Container}>
  //                   <div className={css.Content}>
  //                     {Profile.slice(0, visible).map((prof, index) => (
  //                       <div className={css.btnContainer}>
  //                         <Button
  //                           onClick={handleInputChange}
  //                           value={prof.profile}
  //                           name="profile"
  //                           >
  //                           {prof.profile}
  //                         </Button>
  //                       </div>
  //                     ))}
  //                   </div>
  //                 </div>
  //                 </div>
  //               </Form.Group>
  //             )}
  //             {step === 7 && (
  //               <Form.Group controlId="formBasicContact">
  //                 <Form.Label>Contact Information</Form.Label>
  //                 <div className={css.modal_7_Content}>

  //                 <div className={css.Container}>
  //                   <div className={css.Content}>
  //                     <div className={css.autoComplete}>
  //                       <Input1 />
  //                     </div>

  //                     <div>
  //                       <Input2 />
  //                     </div>
  //                   </div>
  //                 </div>
  //                 </div>
  //               </Form.Group>
  //             )}
  //             {step === 8 && (
  //               <Form.Group controlId="formBasicContact">
  //                 <Form.Label>Contact Information</Form.Label>
  //                 <div className={css.modal_8_Content}>

  //                 <div className={css.Container}>
  //                   <div className={css.Content}>
  //                     <div className={css.textFields}>
  //                       <TextField
  //                         helperText="tel dans votre carte d'identité"
  //                         margin="dense"
  //                         id="standard-basic"
  //                         label="Nom"
  //                         color="warning"
  //                         />
  //                       <TextField
  //                         margin="dense"
  //                         id="standard-basic"
  //                         label="Prenom"
  //                         color="warning"
  //                         />

  //                       <PhoneInput
  //                         countries={["CM"]}
  //                         addInternationalOption={false}
  //                         placeholder="Enterez votre Numero"
  //                         value={valuePhone}
  //                         onChange={setPhoneValue}
  //                         className={css.phoneForm}
  //                         />
  //                     </div>

  //                     <p>
  //                       Le remplisage du Formulaire implique que vous avez lu et
  //                       accepter{" "}
  //                       <span>les termes et condition d'utilsation.</span>
  //                     </p>
  //                   </div>
  //                 </div>
  //                 </div>
  //               </Form.Group>
  //             )}
  //           </Form>
  //         </Modal.Body>
  //         <Modal.Footer className={css.footer}>
  //           {step > 1 && (
  //             <Button variant="secondary" onClick={handlePrev}>
  //               Previous
  //             </Button>
  //           )}
  //           {step < 8 && (
  //             <Button variant="primary" onClick={handleNext}>
  //               Next
  //             </Button>
  //           )}
  //           {step === 1    && (
  //             <Button variant="primary" onClick={handleClose}>
  //               Submit
  //             </Button>
  //           )}
  //         </Modal.Footer>
  //       </Modal>

//           </Form>
//     </>
//   );
// };

// export default ParentModal;

