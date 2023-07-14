import {Route, Routes, useLocation} from "react-router-dom";
import IngredientModal from "../ingredient-modal/ingredient-modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import HomePage from "../../pages/home";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";
import {ProtectedRouteElement} from "../protected-route-element/protected-route-element";
import ProfilePage from "../../pages/profile";
import NotFound404 from "../../pages/not-found";
import React, {ReactElement} from "react";

export default function RoutesComponent(): ReactElement {
  const location = useLocation();
  const backgroundLocation = location?.state?.background;
  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
        <Route path="/reset-password" element={<ResetPasswordPage/>} />
        <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage/>} redirect={"/login"} />} />
        <Route path="/profile/orders" element={<ProtectedRouteElement element={<></>} redirect={"/login"} />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route path="/ingredients/:id" element={<IngredientModal />} />
        </Routes>
      )}
    </>
  )
}
