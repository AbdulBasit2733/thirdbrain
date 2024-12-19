import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useRef } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { loginUser } from "../../store/auth-slice";
import { toast } from "react-toastify";

const Signin = () => {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const dispatch = useAppDispatch();
  const handleSignin = () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
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
        SignIn
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
        <div className="mb-2 flex justify-end text-xs tracking-wider text-orange-500 font-semibold">
          <Link to={"/auth/forgot-password"}>Forget Password ?</Link>
        </div>
        <Button onClick={handleSignin} variant="primary" text={"Signin"} />
        <div className="mt-5 flex flex-col gap-2 justify-center items-center text-xs tracking-wider font-semibold">
          Don't have an account ?
          <Link className="text-orange-500" to={"/auth/signup"}>
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
