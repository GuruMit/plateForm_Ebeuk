import React from "react";
import { Form, Modal } from "react-bootstrap";
import { Button } from "@mui/material";
import { auth } from "../utils/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";

import css from "./css/passwordreset.module.css";
import { ErrorMessage, Field, Formik, useFormik } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../contexts/authContext";

const Passwordreset = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  const{ resetPassword } = useAuth()

  const handleSubmit = async ( values, { setSubmitting, resetForm }) => {
    try {
      resetPassword(values.email);
      resetForm();
    } catch (error) {
      alert(error.message);
    }
    setSubmitting(false);
    console.log(values.email);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit 
  });

  return (
    <>
      <div className={css.container}>
        <Form onSubmit={formik.handleSubmit} className={css.form}>
          <div className={css.email}>
            <div>
              <p>Email</p>
              <TextField
                required
                placeholder="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </div>
          </div>

          <div className={css.footer}>
            <Button
              // variant="primary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Passwordreset;
