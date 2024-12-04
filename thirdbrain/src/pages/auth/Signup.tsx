import React, { useRef } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RegisterUser } from "../../store/auth-slice";

const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    dispatch(RegisterUser({ username, password })).then((data) => {
      if (data.payload.success) {
        toast.success(data.payload.message);
        setTimeout(() => {
          navigate("/auth/signin");
        }, 1000);
      } else {
        toast.error(data.payload.message);
      }
    });
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
        <Link to={"/auth/signin"} className="text-indigo-600 underline">
          Signin
        </Link>
      </div>
    </div>
  );
};

export default Signup;
