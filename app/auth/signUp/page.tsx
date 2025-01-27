"use client";

import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import  {Input}  from "@/app//components/ui/Input";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";

interface PasswordRequirement {
  regex: RegExp;
  text: string;
}

const Signup = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const passwordRequirements: PasswordRequirement[] = [
    { regex: /.{8,}/, text: "At least 8 characters long" },
    { regex: /[A-Z]/, text: "Contains uppercase letter" },
    { regex: /[a-z]/, text: "Contains lowercase letter" },
    { regex: /[0-9]/, text: "Contains number" },
    { regex: /[#?!@$%^&*-]/, text: "Contains special character" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSignup = async () => {
    try {
      setIsLoading(true);
      setError(null);
      if(!formData.email || !formData.password){
        return alert("All Fields Are Required")
      }

      const response = await axios.post("/api/v1/signup", formData);
      if (response.data.success) {
        setSuccess(response.data.message)
        setTimeout(() => {
          router.push("/auth/signin");
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err?.response?.data?.message[0] : "An error occurred during signup");;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-4"
      >
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20">
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Create Account
          </h1>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6"
            >
              <p className="text-red-400 text-sm text-center">{error}</p>
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6"
            >
              <p className="text-green-400 text-sm text-center">{success}</p>
            </motion.div>
          )}

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Email</label>
              <div className="relative">
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border-white/10 text-white"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border-white/10 text-white pr-10"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {passwordRequirements.map((req, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-sm"
                  >
                    {req.regex.test(formData.password) ? (
                      <Check size={14} className="text-green-400" />
                    ) : (
                      <X size={14} className="text-gray-400" />
                    )}
                    <span className={req.regex.test(formData.password) ? "text-green-400" : "text-gray-400"}>
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={handleSignup}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>

            <p className="text-center text-gray-400 text-sm">
              Already have an account?{" "}
              <Link
                href="/auth/signIn"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;