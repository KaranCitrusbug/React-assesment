import React, { Suspense, lazy } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "../pages/loading/loading";

const HomePage = lazy(() => import("../pages/Home/index"));
const Login = lazy(() => import("../pages/Auth/Login"));
const SignUp = lazy(() => import("../pages/Auth/signUp"));
const PageNotFound = lazy(() => import("../pages/PageNotFound/PageNotFound"));
const Cart = lazy(() => import("../components/core/Cart/index"));
const AddProduct = lazy(() => import("../pages/Admin/Index"));
const Blogs = lazy(() => import("../pages/Feedback/Index"));
const Shop = lazy(() => import("../pages/Shop/Index"));
const SingleProduct = lazy(() => import("../pages/SingleProduct/Index"));
const ProfilePage = lazy(() => import("../pages/Profile/Index"));
const TokenComponent = lazy(() => import("../components/core/auth/AuthToken"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword/Index"));
const ResetPassword = lazy(() => import("../pages/ResetPassword/Index"));
const ChangePassword = lazy(() => import("../pages/ChangePassword/Index"));
const AuthLayout = lazy(() => import("../components/layout/AuthLayout"));

const RoutesPage: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="/"
            element={
              <AuthLayout isAuthRequired={false}>
                <HomePage />
              </AuthLayout>
            }
          ></Route>
          <Route
            path="/login"
            element={
              
                <Login />
              
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <AuthLayout isAuthRequired={false}>
                <SignUp />
              </AuthLayout>
            }
          ></Route>
          <Route
            path="/invited/signup/:token"
            element={
              <AuthLayout isAuthRequired={false}>
                <TokenComponent />
              </AuthLayout>
            }
          ></Route>
          <Route
            path="/forgotPassword"
            element={
              <AuthLayout isAuthRequired={false}>
                <ForgotPassword />
              </AuthLayout>
            }
          ></Route>
          <Route
            path="/reset/password/:token"
            element={
              <AuthLayout isAuthRequired={false}>
                <ResetPassword />
              </AuthLayout>
            }
          ></Route>
          <Route
            path="/changePassword"
            element={
              <AuthLayout isAuthRequired>
                <ChangePassword />
              </AuthLayout>
            }
          ></Route>
          <Route
            path="/cart"
            element={
              <AuthLayout isAuthRequired={false}>
                <Cart />
              </AuthLayout>
            }
          ></Route>
          <Route
            path="/feedback"
            element={
              <AuthLayout isAuthRequired>
                <Blogs />
              </AuthLayout>
            }
          ></Route>
          <Route
            path="/shop"
            element={
              <AuthLayout isAuthRequired={false}>
                <Shop />
              </AuthLayout>
            }
          ></Route>
          <Route
            path="shop/:id"
            element={
              <AuthLayout isAuthRequired={false}>
                <SingleProduct />
              </AuthLayout>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <AuthLayout isAuthRequired>
                <ProfilePage />
              </AuthLayout>
            }
          ></Route>
          <Route
            path="/admin/add-product"
            element={
              <AuthLayout isAuthRequired>
                <AddProduct />
              </AuthLayout>
            }
          ></Route>
          <Route path="*" Component={PageNotFound}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default RoutesPage;
