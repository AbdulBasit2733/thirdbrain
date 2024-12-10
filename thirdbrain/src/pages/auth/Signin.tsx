import { useRef, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { LoginUser } from "../../store/auth-slice";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const Signin = () => {
  const [typePassword, setTypePassword] = useState<"password" | "text">("password");
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleSignin = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    console.log(username, password);
    
    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return;
    }
    const resultAction = await dispatch(LoginUser({ username, password }));

    if (LoginUser.fulfilled.match(resultAction)) {
      if (resultAction.payload.success) {
        toast.success(resultAction.payload.message);
      } else {
        toast.error(resultAction.payload.message);
      }
    } else if (LoginUser.rejected.match(resultAction)) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="shadow min-w-60 w-72 p-5 bg-white rounded-lg">
      <h1 className="text-xl font-bold text-center">Signin</h1>
      <div className="my-5 min-w-48 space-y-5">
        <Input refs={usernameRef} placeholder="Username" type="text" />
        <Input
          refs={passwordRef}
          placeholder="Password"
          type={typePassword} // "password" or "text" dynamically handled
          setTypePassword={setTypePassword} // Pass setTypePassword to toggle visibility
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
        <h1 className="">Don't Have an Account?</h1>
        <Link to={"/auth/signup"} className="text-indigo-600 underline">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Signin;
