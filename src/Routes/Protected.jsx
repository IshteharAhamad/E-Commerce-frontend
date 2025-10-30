import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/Context/Context";

const Protected = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    else{
      navigate("/")
    }
  }, [user, navigate]);

  if (!user) return null;

  return children;
};

export default Protected;
