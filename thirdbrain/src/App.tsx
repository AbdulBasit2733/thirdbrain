import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/Auth/AuthLayout";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Dasboard from "./pages/Dashboard/Dasboard";

const App = () => {
  const [authenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  console.log("auth", authenticated);
  console.log("user", user);

  return (
    <div>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route
            path="signin"
            element={
              <Signin
                isAuthenticated={authenticated}
                user={user}
                setUser={setUser}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />
          <Route
            path="signup"
            element={<Signup isAuthenticated={authenticated} user={user} />}
          />
        </Route>
        <Route path="/dashboard" element={<Dasboard />} />
      </Routes>
    </div>
  );
};

export default App;
