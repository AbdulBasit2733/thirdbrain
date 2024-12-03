import React, { useRef } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axios from "axios";
import BACKEND_URL from "../../../config";
import { toast } from "react-toastify";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Signin = ({ isAuthenticated, user, setIsAuthenticated, setUser }) => {

  const navigate = useNavigate()
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const handleSignin = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/users/login`,
      {
        username,
        password,
      },
      { withCredentials: true }
    );
    if (response.data?.success) {
      toast.success(response?.data?.message);
      setIsAuthenticated(true);
      setUser(response.data.user);
      usernameRef.current.value = null;
      passwordRef.current.value = null;
      navigate('/dashboard')
    } else {
      toast.error(response?.data?.message);
      setIsAuthenticated(false);
      setUser(null);
    }
  };
  return (
    <>
      <div>
        <h1 className=" text-xl font-bold text-center">Signin</h1>
        <div className="my-5 min-w-48 space-y-5">
          <Input refs={usernameRef} placeholder="Username" />
          <Input refs={passwordRef} placeholder="Password" />
        </div>
        <div className="flex justify-center">
          <Button
            onClick={handleSignin}
            variant="primary"
            text={"Signin"}
            fullWidth={true}
            loading={false}
          />
        </div>
        <div className="flex justify-between items-center mt-2 text-sm">
          <h1 className="">Don't Have an Account ? </h1>
          <Link to={"/auth/signup"} className="text-indigo-600 underline">
            Signup
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signin;
