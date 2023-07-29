import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Link,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import { FormControl, InputLabel } from "./style";
import { Formik, FormikHelpers, FormikValues } from "formik";
import { useCallback, useContext } from "react";
import * as Yup from "yup";
import { ContextValueType, UserContext } from "../../Context/UserContext";
import { signupUser } from "../../Utils/auth";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const { dispatch } = useContext<ContextValueType>(UserContext);
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
    confirm: "",
    role: "",
    deposit: 0,
  };

  const schema = Yup.object().shape({
    username: Yup.string()
      .required("Username is a required field")
      .min(3, "Username must be at least 3 characters"),
    password: Yup.string()
      .required("Password is a required")
      .min(5, "Password must be at least 5 characters"),
    confirm: Yup.string()
      .required("Confirm your password")
      .min(5, "Password must be at least 5 characters"),
    role: Yup.string(),
  });

  const onSubmit = useCallback(
    async (
      values: FormikValues,
      {
        resetForm,
      }: FormikHelpers<{
        username: string;
        password: string;
        confirm: string;
        role: string;
        deposit: number;
      }>
    ) => {
      const { username, password, confirm, role, deposit } = values;

      if (password !== confirm) {
        throw new Error("Passwords do not match");
      }

      try {
        const registeredUser = await signupUser({
          username,
          password,
          role,
          deposit,
        });
        console.log("registeredUser", registeredUser);
        dispatch({
          type: "SET_USER",
          payload: {
            username: registeredUser.username,
            role: registeredUser.role,
            deposit: registeredUser.deposit,
          },
        });
      } catch (error) {
        // const message =
        //   (error.response &&
        //     error.response.data &&
        //     error.response.data.message) ||
        //   error.message ||
        //   error.toString();
        console.log(error);
      }

      resetForm();
      navigate("/");
    },
    [dispatch, navigate]
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={handleChange}
                value={values.username}
              />
              <p className="error">
                {errors.username && touched.username && errors.username}
              </p>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleChange}
              />
              <p className="error">
                {errors.password && touched.password && errors.password}
              </p>
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirm"
                label="Confirm Password"
                type="password"
                id="confirm"
                onChange={handleChange}
              />{" "}
              <p className="error">
                {errors.confirm && touched.confirm && errors.confirm}
              </p>
              <FormControl>
                <InputLabel>
                  <em>Your Role</em>
                </InputLabel>
                <Select
                  displayEmpty
                  value={values.role}
                  onChange={handleChange}
                  label="Role"
                  name="role"
                >
                  <MenuItem value={"buyer"}>Buyer</MenuItem>
                  <MenuItem value={"seller"}>Seller</MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Do you already have an account? Log in"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      )}
    </Formik>
  );
};

export default Register;
