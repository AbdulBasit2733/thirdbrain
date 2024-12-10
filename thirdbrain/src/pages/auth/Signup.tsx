import { useRef, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../store/auth-slice";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const Signup = () => {
  const [typePassword, setTypePassword] = useState<"password" | "text">("password");
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignup = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return; 
    }
    const formData = { username, password };

    try {
      const resultAction = await dispatch(RegisterUser(formData));

      if (RegisterUser.fulfilled.match(resultAction)) {
        if (resultAction.payload.success) {
          toast.success(resultAction.payload.message);
          setTimeout(() => {
            navigate("/auth/signin");
          }, 1000);
        } else {
          toast.error(resultAction.payload.message);
        }
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      // Catch any unexpected errors
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="shadow min-w-60 w-72 p-5 bg-white rounded-lg">
      <h1 className="text-xl font-bold text-center">Signup</h1>
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
          onClick={handleSignup}
          variant="primary"
          text={"Signup"}
          fullWidth={true}
          loading={false}
        />
      </div>
      <div className="flex justify-between items-center mt-2 text-sm">
        <h1>Already Have an Account?</h1>
        <Link to={"/auth/signin"} className="text-indigo-600 underline">
          Signin
        </Link>
      </div>
    </div>
  );
};

export default Signup;
