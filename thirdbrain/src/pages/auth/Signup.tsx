import React, { useRef } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import BACKEND_URL from "../../../config";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Signup = ({isAuthenticated, user}) => {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const handleSignup = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/users/register`,
      {
        username,
        password,
      },
      { withCredentials: true }
    );
    if (response.data?.success) {
      toast.success(response?.data?.message);
      usernameRef.current.value = null;
      passwordRef.current.value = null;
    } else {
      toast.error(response?.data?.message);
    }
  };
  return (
    <div>
      <h1 className=" text-xl font-bold text-center">Signup</h1>
      <div className="my-5 min-w-48 space-y-5">
        <Input refs={usernameRef} placeholder="Username" />
        <Input refs={passwordRef} placeholder="Password" />
      </div>
      <div className="flex justify-center">
        <Button
          onClick={handleSignup}
          variant="primary"
          text={"Signup"}
          fullWidth={true}
          loading={false}
        />
      </div>
      <div className="flex justify-between items-center mt-2 text-sm">
        <h1>Already Have an Account ? </h1>
        <Link to={'/auth/signin'} className="text-indigo-600 underline">Signin</Link>
      </div>
    </div>
  );
};

export default Signup;
