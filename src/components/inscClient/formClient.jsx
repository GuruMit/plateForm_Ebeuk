import React, { useState } from "react";

//
import { useFormik } from "formik";
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

import css from "./formclient.module.css";
//
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
//

const Clientform = () => {
  const [valuePhone, setPhoneValue] = useState();

  //
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //

  const validationSchema = Yup.object().shape({
    prenom: Yup.string()
      .min(3, "au moins 3 caractére")
      .max(50, "Name cannot exceed 50 characters")
      .required("*requis"),
    nom: Yup.string()
      .min(3, "au moins 3 caractére")
      .max(50, "Name cannot exceed 50 characters")
      .required("*requis"),
    phone: Yup.string()
      .matches(/^(\+237)?[2368]\d{8}$/, "Invalid phone number")
      .required(" le Numero de telephone est requis"),

    email: Yup.string().matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "*email invalid"
    ),
    selectedOption: Yup.string().required("Required"),
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

  const handleSubmit = async (values ,  { setSubmitting }) => {
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
      prenom: "",
      nom: "",
      email: "",
      selectedOption: "",
      phone: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit
    
  });

  //

  

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={css.name}>
        <div>
          <p>Prenom</p>
          <TextField
            fullWidth
            id="prenom"
            name="prenom"
            label="Laste Name"
            value={formik.values.prenom}
            onChange={formik.handleChange}
            error={formik.touched.prenom && Boolean(formik.errors.prenom)}
            helperText={formik.touched.prenom && formik.errors.prenom}
          />
        </div>

        <div>
          <p>Nom</p>

          <TextField
            fullWidth
            id="nom"
            name="nom"
            label="First Name"
            value={formik.values.nom}
            onChange={formik.handleChange}
            error={formik.touched.nom && Boolean(formik.errors.nom)}
            helperText={formik.touched.nom && formik.errors.nom}
          />
        </div>
      </div>

      <div className={css.addresse}>
        <p>Addresse</p>

        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
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
            id="password"
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

export default Clientform;

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
