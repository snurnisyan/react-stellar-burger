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
import FeedPage from "../../pages/feed";
import OrderInfoComponent from "../order-info/order-info";
import ProfileOrdersPage from "../../pages/profile-orders";
import OrderInfoModal from "../order-info-modal/order-info-modal";
import {useSelector} from "../../services/hooks/useSelector";
import {
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_START, WS_CONNECTION_CLOSED,
  WS_CONNECTION_START
} from "../../services/actions/wsActions";

export default function RoutesComponent(): ReactElement {
  const location = useLocation();
  const backgroundLocation = location?.state?.background || location?.state?.orderBackground;

  const { orders, userOrders } = useSelector(store => ({
    orders: store.wsData.orders,
    userOrders: store.wsData.userOrders,
  }));

  const socketActions = {
    open: WS_CONNECTION_START,
    close: WS_CONNECTION_CLOSED
  }

  const socketUserActions = {
    open: WS_AUTH_CONNECTION_START,
    close: WS_AUTH_CONNECTION_CLOSED
  }

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
        <Route path="/reset-password" element={<ResetPasswordPage/>} />
        <Route path="/feed" element={<FeedPage modalPath={'/feed'}/>} />
        <Route path="/feed/:id" element={<OrderInfoComponent orders={orders} socketActions={socketActions}/>} />
        <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage/>} redirect={"/login"} />} />
        <Route path="/profile/orders" element={<ProtectedRouteElement element={<ProfileOrdersPage modalPath={'/profile/orders'} />} redirect={"/login"} />} />
        <Route path="/profile/orders/:id" element={<ProtectedRouteElement element={<OrderInfoComponent orders={userOrders} socketActions={socketUserActions}/>} redirect={"/login"} />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      {location?.state?.background && (
        <Routes>
          <Route path="/ingredients/:id" element={<IngredientModal />} />
        </Routes>
      )}
      {(location?.state?.orderBackground.pathname === '/feed')  && (
        <Routes>
          <Route path="/feed/:id" element={<OrderInfoModal orders={orders}/>} />
        </Routes>
      )}
      {(location?.state?.orderBackground.pathname === '/profile/orders') && (
        <Routes>
          <Route path="/profile/orders/:id" element={<OrderInfoModal orders={userOrders}/>} />
        </Routes>
      )}
    </>
  )
}
