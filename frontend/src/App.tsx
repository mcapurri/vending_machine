import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useFormik, FormikValues } from "formik";
import { ContextValueType, UserContext } from "./Context/UserContext";
import { useContext } from "react";

function App() {
  const { user, dispatch } = useContext<ContextValueType>(UserContext);

  // const formik: FormikValues = useFormik({
  //   initialValues: user,
  //   validationSchema: schema,
  //   onSubmit:
  // });

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
