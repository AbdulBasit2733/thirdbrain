import { Route, Routes } from "react-router-dom";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import AuthLayout from "./components/Auth/AuthLayout";
import Layout from "./components/Layout";
import Youtube from "./pages/Youtube";
import Twitter from "./pages/Twitter";
import Document from "./pages/Document";
import CheckAuth from "./components/Auth/CheckAuth";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import Loading from "./components/Loading";
import { useEffect } from "react";
import { checkAuthentication } from "./store/auth-slice";
import { toast } from "react-toastify";
import Dashboard from "./pages/Dasboard";

const App = () => {
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthentication());
  }, [dispatch]);

  return (
    <div className="bg-white font-poppins min-h-screen">
      {isLoading ? (
        <Loading />
      ) : (
        <Routes>
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
          <Route
            path="/"
            element={
              <CheckAuth isAuthenticated={isAuthenticated}>
                <Layout />
              </CheckAuth>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/youtube-contents" element={<Youtube />} />
            <Route path="/twitter-contents" element={<Twitter />} />
            <Route path="/doc-contents" element={<Document />} />
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
