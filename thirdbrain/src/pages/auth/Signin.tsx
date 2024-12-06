import React, { useRef, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axios from "axios";
import BACKEND_URL from "../../../config";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { LoginUser } from "../../store/auth-slice";
import { useDispatch } from "react-redux";
const Signin = () => {
  const [typePassword, setTypePassword] = useState("password");
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const dispatch = useDispatch();
  const handleSignin = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    dispatch(LoginUser({ username, password })).then((data) => {
      if (data.payload.success) {
        toast.success(data.payload.message);
      } else {
        toast.error(data.payload.message);
      }
    });
  };
  return (
    <div className="shadow min-w-60 w-72 p-5 bg-white rounded-lg">
      <h1 className=" text-xl font-bold text-center">Signin</h1>
      <div className="my-5 min-w-48 space-y-5">
        <Input refs={usernameRef} placeholder="Username" type="text" />

        <Input
          refs={passwordRef}
          placeholder="Password"
          type={typePassword} // "password" or "text" dynamically handled
        />
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
  );
};

export default Signin;
