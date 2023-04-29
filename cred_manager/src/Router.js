import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
