import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useFormik, FormikValues } from "formik";
import * as Yup from "yup";
import { ContextValueType, UserContext } from "./Context/UserContext";
import { useContext } from "react";

function App() {
  const { user, dispatch } = useContext<ContextValueType>(UserContext);

  const schema = Yup.object().shape({
    username: Yup.string()
      .required("Username is a required field")
      .min(3, "Username must be at least 3 characters"),
    password: Yup.string()
      .required("Password is a required")
      .min(8, "Password must be at least 8 characters"),
    confirm: Yup.string()
      .required("Confirm your password")
      .min(8, "Password must be at least 8 characters"),
  });

  const formik: FormikValues = useFormik({
    initialValues: user,
    validationSchema: schema,
    onSubmit: (values) => {
      localStorage.setItem("user", JSON.stringify(values, null, 2));
      dispatch({
        type: "SET_USER",
        payload: values,
      });
    },
  });

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register formik={formik} />} />
        <Route path="/login" element={<Login formik={formik} />} />
      </Route>
    </Routes>
  );
}

export default App;
