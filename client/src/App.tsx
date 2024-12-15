import { Route, Routes } from "react-router-dom";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import AuthLayout from "./components/Auth/AuthLayout";
import Layout from "./components/Layout";
import Dasboard from "./pages/Dasboard";
import Youtube from "./pages/Youtube";
import Twitter from "./pages/Twitter";
import Document from "./pages/Document";

const App = () => {
  return (
    <div className="bg-white font-poppins min-h-screen">
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dasboard/>} />
          <Route path="/youtube-contents" element={<Youtube/>} />
          <Route path="/twitter-contents" element={<Twitter />} />
          <Route path="/doc-contents" element={<Document />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
