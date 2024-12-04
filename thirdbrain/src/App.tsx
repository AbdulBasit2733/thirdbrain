import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/Auth/AuthLayout";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/Dashboard/Dasboard"; // Fixed typo in "Dashboard"
import CheckAuth from "./components/Auth/CheckAuth";
import { useSelector, useDispatch } from "react-redux";
import { CheckAuthentication } from "./store/auth-slice";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(CheckAuthentication());
  }, [dispatch]);

  return (
    <div className="font-poppins">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Routes>
          {/* Authentication routes */}
          <Route
            path="/auth"
            element={
              <CheckAuth isAuthenticated={isAuthenticated}>
                <AuthLayout />
              </CheckAuth>
            }
          >
            <Route path="signin" element={<Signin />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          {/* Dashboard route */}
          <Route
            path="/"
            element={
              <CheckAuth isAuthenticated={isAuthenticated}>
                <Dashboard />
              </CheckAuth>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
