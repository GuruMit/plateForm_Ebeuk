import React, { useContext, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
//
import { ErrorMessage, Formik, replace, useFormik } from "formik";
import * as Yup from "yup";
//
import css from "./css/connexion.module.css";

//
import PhoneInput from "react-phone-number-input";

import "react-phone-number-input/style.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
//
import {
  Alert,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Snackbar,
} from "@mui/material";
//
import * as firebase from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase.config";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import { AuthContext, useAuth } from "../contexts/authContext";
//
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import axios from "axios";
//

const Connexion = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //

  //

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  //
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { connex, role, token } = useAuth();
  console.log("voila", role);

  const handleLogin = async (values, { resetForm }) => {
    try {
      
      connex(values.email, values.password);
      setTimeout(() => {
        resetForm();
        // Redirect to the appropriate UI based on user role
        if (role === "client") {
          window.location.href = "http://localhost:3000/";
        } else if (role === "admin") {
          window.location.href = "/admin-dashboard";
        } else {
          console.error("Unknown user role:", role);
        }
      }, 6000);

      // resetForm();
      // setTimeout(() => {
      //   navigate(from,{replace:true})
      // }, 3000); // Wait for 3 seconds before redirecting the user to the annoncement page
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleLogin,
  });

  //

  //

  // const { currentUser } = useContext(AuthContext);

  // if (currentUser) {
  //   return <Navigate to="/" />;
  // }

  return (
    <>
      <div className={css.title}>
        <Container className={css.tContainer}>
          <h1>Connexion</h1>
          <p>
            L'inscription est rapide et graduite. Rejoignez notre Communauté !
          </p>
        </Container>
      </div>

      <div>
        <Container className={css.insBody}>
          <Box
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            autoComplete="off"
          >
            <Form onSubmit={formik.handleSubmit}>
              <div className={css.email}>
                <div>
                  <p>Email</p>
                  <TextField
                    required
                    placeholder="Prenom"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                  />
                </div>
              </div>

              <div className={css.motdePasse}>
                <p>Mot de passe</p>

                <FormControl
                  sx={{ m: 1, width: "25ch" }}
                  variant="outlined"
                  className={css.pcontent}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    required
                    placeholder="Password"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    type={showPassword ? "text" : "password"}
                    endAdornment={
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
                    }
                    label="Password"
                  />
                </FormControl>
              </div>

              <div className={css.conex}>
                <ul>
                  <li>
                    <Link to="/passwordreset">mot de passe oublié ?</Link>
                  </li>
                  <li>
                    <a href="#">cree mon compte fournisseur</a>
                  </li>
                  <li>
                    <a href="#">cree mon compte client</a>
                  </li>
                </ul>

                <div>
                  <Button type="submit" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? "Loading..." : "Connexion"}
                  </Button>
                </div>
              </div>
            </Form>
          </Box>
        </Container>

        <p> {`The current Client token is  ${token}`}</p>
      </div>
    </>
  );
};

export default Connexion;
