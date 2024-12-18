import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useRef } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { loginUser } from "../../store/auth-slice";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const dispatch = useAppDispatch();
  const handleSignin = () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(username, password);
    if (username && password) {
      dispatch(loginUser({ username, password })).then((data) => {
        if (data.payload?.success) {
          toast.success(data.payload.message);
        } else {
          toast.error(data.payload.message);
        }
      });
    } else {
      toast.error("All Fields are required");
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl text-center font-extrabold text-orange-500 tracking-wider">
        Forgot Password
      </h1>
      <div className="mt-5 bg-white drop-shadow-2xl px-5 py-8 rounded-lg flex flex-col gap-3">
        <div className="space-y-2">
          <label className="tracking-wider">Username</label>
          <Input refs={usernameRef} placeholder="Username" />
        </div>
        <div className="space-y-2">
          <label className="tracking-wider">Password</label>
          <Input refs={passwordRef} placeholder="Password" type="password" />
        </div>
        <div className="space-y-2">
          <label className="tracking-wider">Confirm Password</label>
          <Input refs={passwordRef} placeholder="Password" type="password" />
        </div>
        <Button onClick={handleSignin} variant="primary" text={"Signin"} />
        <Link to={'/auth/signin'} className="text-xl text-orange-400 font-bold bg-white rounded-md shadow-md">Go Back</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
