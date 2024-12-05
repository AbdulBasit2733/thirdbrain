import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/Auth/AuthLayout";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import CheckAuth from "./components/Auth/CheckAuth";
import { useSelector, useDispatch } from "react-redux";
import { CheckAuthentication } from "./store/auth-slice";

import Dasboard from "./pages/Dashboard/Dasboard";
import Main from "./components/Main";
import AllContents from "./pages/AllContents";
import MyContents from "./pages/MyContents";

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
                <Dasboard/>
              </CheckAuth>
            }
          >
            <Route path="/" element={<Main />}/>
            {/* <Route path="all-contents" element={<AllContents />}/> */}
            <Route path="my-contents" element={<MyContents />}/>
          </Route>

        </Routes>
      )}
    </div>
  );
};

export default App;
