import {
  Container,
  Box,
  Typography,
  TextField,
  Link,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
} from "@mui/material";
import { Formik, FormikHelpers, FormikValues } from "formik";
import { useCallback, useContext } from "react";
import * as Yup from "yup";
import { ContextValueType, UserContext } from "../../Context/UserContext";

const Login: React.FC = () => {
  const { user, dispatch } = useContext<ContextValueType>(UserContext);

  const schema = Yup.object().shape({
    username: Yup.string()
      .required("Username is a required field")
      .min(3, "Username must be at least 3 characters"),
    password: Yup.string()
      .required("Password is a required")
      .min(8, "Password must be at least 8 characters"),
  });

  const onSubmit = useCallback(
    (
      values: FormikValues,
      {
        resetForm,
      }: FormikHelpers<{
        username: string;
        password: string;
      }>
    ) => {
      console.log("values", values);
      resetForm();
    },
    [dispatch]
  );
  const initialValues = { username: "", password: "" };
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
              Log in
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
                autoComplete="current-password"
                onChange={handleChange}
                value={values.password}
              />
              <p className="error">
                {errors.password && touched.password && errors.password}
              </p>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Don't have an account? Sign Up"}
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
export default Login;
