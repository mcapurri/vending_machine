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
import { FormikValues } from "formik";
interface RegisterProps {
  formik: FormikValues;
}

const Register: React.FC<RegisterProps> = ({
  formik,
}: {
  formik: FormikValues;
}) => {
  return (
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
          onSubmit={formik.handleSubmit}
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
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <p className="error">
            {formik.errors.username &&
              formik.touched.username &&
              formik.errors.username}
          </p>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={formik.handleChange}
          />
          <p className="error">
            {formik.errors.password &&
              formik.touched.password &&
              formik.errors.password}
          </p>
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirm"
            label="Confirm Password"
            type="password"
            id="confirm"
            onChange={formik.handleChange}
          />{" "}
          <p className="error">
            {formik.errors.confirm &&
              formik.touched.confirm &&
              formik.errors.confirm}
          </p>
          <FormControl>
            <InputLabel>
              <em>Your Role</em>
            </InputLabel>
            <Select
              displayEmpty
              value={formik.values.role}
              onChange={formik.handleChange}
              label="Username"
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
            Sign In
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
  );
};

export default Register;
