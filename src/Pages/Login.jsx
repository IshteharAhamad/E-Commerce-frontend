import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/Context/Context";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate=useNavigate()
  const { login ,user} = useAuth();
  useEffect(()=>{
    if(user){
      navigate("/")
    }
  },[user,navigate])
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload({ ...payload, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username: payload.email,
        password: payload.password,
      });
      if (response?.status === 200) {
        login(response?.data);
        navigate("/");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="max-w-lg w-full rounded-2xl shadow-2xl p-4">
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <div className="w-full p-2">
            <Input
              name="email"
              type="text"
              placeholder="john@example.com"
              onChange={handleChange}
              className="w-full px-2 h-12"
            />
          </div>
          <div className="w-full p-2">
            <Input
              name="password"
              type="password"
              placeholder="******"
              onChange={handleChange}
              className="w-full px-2 h-12"
            />
          </div>
          <Button type="submit" variant="" className="bg-blue-500 text-white">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
