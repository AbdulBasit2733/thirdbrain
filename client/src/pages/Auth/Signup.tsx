import { Link } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/auth-slice";
import { useAppDispatch } from "../../hooks/hooks";
import { toast } from "react-toastify";

export interface formProps {
  username: string;
  password: string;
}

const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const dispatch = useAppDispatch();

  const handleSignup = () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    if (username && password) {
      dispatch(registerUser({ username, password })).then((data) => {
        if(data.payload.success){
          toast.success(data.payload.message)
        }else{
          toast.error(data.payload.message)
        }
      })
    }else{
      toast.error("All Fields Are Required")
    }
  };
  return (
    <div className="">
      <h1 className="text-2xl text-center font-extrabold text-orange-500 tracking-wider">
        SignUp
      </h1>
      <div className="mt-5 bg-white drop-shadow-2xl px-5 py-8 rounded-lg flex flex-col gap-3">
        <div className="space-y-2">
          <label className="tracking-wider">Username</label>
          <Input refs={usernameRef} placeholder="Username" />
        </div>
        <div className="space-y-2 mb-2">
          <label className="tracking-wider">Password</label>
          <Input refs={passwordRef} placeholder="Password" type="password" />
        </div>
        <Button onClick={handleSignup} variant="primary" text={"Signup"} />
        <div className="mt-5 flex flex-col gap-2 justify-center items-center text-xs tracking-wider font-semibold">
          Already have an account ?
          <Link className="text-orange-500" to={"/auth/signin"}>
            Signin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
