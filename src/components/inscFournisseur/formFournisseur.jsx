import React, { useState,useRef } from "react";

//
import { ErrorMessage, Field, useFormik } from "formik";
import * as Yup from "yup";

//
import { Button, FormHelperText, TextField } from "@mui/material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
//
import { ButtonToolbar } from "react-bootstrap";

//
import css from "./formfournisseur.module.css"; 
//
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
//
import { Typeahead } from "react-bootstrap-typeahead";
// Css class
import 'react-bootstrap-typeahead/css/Typeahead.css';
//

const InscFournisseur = () => {
  const [valuePhone, setPhoneValue] = useState();

  //
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //

  const validationSchema = Yup.object().shape({
    pseudo: Yup.string()
      .min(3, "au moins 3 caractére")
      .max(50, "Name cannot exceed 50 characters")
      .required("*requis"),
    prestations: Yup.array()
      .min(1, "Sélectionnez au moins une prestation")
      .of(
        Yup.object().shape({
          id: Yup.number().required(),
          name: Yup.string().required("Le nom de la prestation est requis"),
        })
      ),
    phone: Yup.string()
      .matches(/^(\+237)?[2368]\d{8}$/, "Invalid phone number")
      .required(" le Numero de telephone est requis"),
    selectedOption: Yup.string().required("Required"),
    email: Yup.string().matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "*email invalid"
    )
    .required("*requis"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"
      )
      .min(8, "Password must be at least 8 characters")
      .required("Mot de passe requis"),
    // confirmPassword: Yup.string()
    //   .oneOf([Yup.ref("password"), null], "Passwords must match")
    //   .required("Confirm Password is required"),
  });

  //
  const [message, setMessage] = useState("");

  const handleSubmit =  (values) => {
    // try {
    // console.log('Sending request to:', '/api/clients');

    //   const response = await fetch('/api/clients', {
    //     method: 'POST',
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(values),
    //   });
    //   const data = await response.json();
    //   setMessage(data.message);     
    // } catch (error) {
    //   setMessage("An error occurred while submitting the form");
    // }
    console.log(values);
    console.log("handleSubmit called");
  };

  //

  const formik = useFormik({
    initialValues: {
      pseudo: "",
      email: "",
      prestations: [],
      selectedOption: "",
      phone: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit
    
  });

  //

  const ref = useRef();

  //

  return (
    <form onSubmit={formik.handleSubmit}>
       <div className={css.email}>
        <p>Adresse Mail</p>
        <div>
          <TextField
            required
            fullWidth
            label="Email"
            id="f_email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
      </div>

      <div className={css.pseudo}>
          <p>Pseudo</p>
          <div>
          <TextField
            required
            fullWidth
            label="pseudo"
            id="pseudo"
            name="pseudo"
            value={formik.values.pseudo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pseudo && Boolean(formik.errors.pseudo)}
            helperText={formik.touched.pseudo && formik.errors.pseudo}
          />
        </div>
        </div>


        <div className={css.presContainer}>
        <Typeahead
        className={css.prestation}
        id="prestation"
        placeholder="Quelle type de prestation prestez vous ? ..."
        labelKey="name"
        multiple
        onChange={(selected) => {
          // Update Formik field value when Typeahead selection changes
          formik.setFieldValue("prestations", selected);
        }}
        options={Prestations}
        ref={ref}
        size='lg'
        error={formik.touched.prestations && Boolean(formik.errors.prestations)}
        helperText={formik.touched.prestations && formik.errors.prestations}
      />
        
      <ButtonToolbar style={{ marginTop: '10px', marginLeft:'10px' }}>
        <Button onClick={() => {
        ref.current?.clear();
        formik.setFieldValue("prestations", []);
        formik.setFieldTouched("prestations", false)}}>Clear</Button>
      </ButtonToolbar>
        </div>

      <div className={css.over}>
        <div className={css.villes}>
          <div className="ville">
            <p>Ville</p>

            <TextField
              id="outlined-select-villes"
              select
              name="selectedOption"
              label="Town"
              value={formik.values.selectedOption}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.selectedOption &&
                Boolean(formik.errors.selectedOption)
              }
              helperText={
                formik.touched.selectedOption && formik.errors.selectedOption
              }
            >
              {Villes.map((ville) => (
                <MenuItem key={ville.id} value={ville.id}>
                  {ville.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>

        <div className={css.phone}>
          <p>Telephone</p>
          <PhoneInput
            value={formik.values.phone}
            onChange={(value) => formik.setFieldValue("phone", value)}
            onBlur={formik.handleBlur("phone")}
            countries={["CM"]}
            addInternationalOption={false}
            placeholder="Phone Number"
            className={css.phoneForm}
            label="Phone Number"
          />
          </div>
      </div>

      <div className={css.motdePasse}>
        <p>Mot de passe</p>
        <div>
          <TextField
            required
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            id="f_password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>

      <div className={css.submit}>
        <p>
          La création d'un compte implique que vous avez lu et accepté les
          <span> termes et conditions d'utilisation.</span>{" "}
        </p>
        <Button disabled={formik.isSubmitting} type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default InscFournisseur;

export const Villes = [
  {
    id: 1,
    name: "Sangmelima",
  },
  {
    id: 2,
    name: "Kribi",
  },

  {
    id: 3,
    name: "Yaoundé",
  },
  {
    id: 4,
    name: "Douala",
  },
  {
    id: 5,
    name: "Ngoundere",
  },
  {
    id: 6,
    name: "Ebolowa",
  },
  {
    id: 7,
    name: "Limbé",
  },
  {
    id: 8,
    name: "Dschang",
  },

  {
    id: 9,
    name: "Edea",
  },
  {
    id: 10,
    name: "Bafoussam",
  },
  {
    id: 11,
    name: "Mbouda",
  },
  {
    id: 12,
    name: "Bafia",
  },
  {
    id: 13,
    name: "Tiko",
  },
  {
    id: 14,
    name: "Mora",
  },

  {
    id: 15,
    name: "Bali",
  },
  {
    id: 16,
    name: "Akonolinga",
  },
  {
    id: 17,
    name: "Ngoundere",
  },
  {
    id: 18,
    name: "Obala",
  },
  {
    id: 19,
    name: "Batibo",
  },
  {
    id: 20,
    name: "Koutaba",
  },

  {
    id: 21,
    name: "Garoua",
  },
];


export const Prestations = [{
  id:1,
  name: 'WEDDING PLANNER',
},
{
  id:2,
  name: 'PHOTOGRAPHE',
},
{
  id:3,
  name: 'TRAITEUR',
},

{
  id:4,
  name: 'WEDDING PLANNER',
},
{
  id:5,
  name: 'PHOTOGRAPHE',
},
{
  id:6,
  name: 'GRAPHISTE',
  
},
{
  id:7,
  name: 'PHOTOGRAPHE',
},
{
  id:8,
  name: 'TRAITEUR',
},

{
  id:9,
  name: 'WEDDING PLANNER',
},
{
  id:10,
  name: 'PHOTOGRAPHE',
},

]


