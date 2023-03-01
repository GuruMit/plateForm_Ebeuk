import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
//
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
//
import css from "./css/connexion.module.css";

//
import PhoneInput from "react-phone-number-input";

import "react-phone-number-input/style.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
//
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
} from "@mui/material";

const Connexion = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            className=""
          >
            <div className={css.email}>
              <div>
                <p>Email</p>
                <TextField
                  required
                  placeholder="Prenom"
                  id="prenom"
                  name="prenom"
                />
              </div>
            </div>

            <div className={css.motdePasse}>
              <p>Mot de passe</p>
              
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined" className={css.pcontent}>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    required
                    placeholder="Password"
                    id="password"
                    name="password"
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
                <li><a href="#">mot de passe oublié ?</a></li>
                <li><a href="#">cree mon compte fournisseur</a></li>
                <li><a href="#">cree mon compte client</a></li>
              </ul>

              <div>
                <Button>Connexion</Button>
              </div>

             </div>

            

          </Box>
        </Container>
      </div>
    </>
  );
};

export default Connexion;
