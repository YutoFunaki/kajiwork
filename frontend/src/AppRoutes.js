import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { login } from "./pages/loginPage";
import { signin } from "./pages/signinPage";

export const router = createBrowserRouter([
  { path: "login", element: <login /> },
  { path: "signin", element: <signin /> },
]);