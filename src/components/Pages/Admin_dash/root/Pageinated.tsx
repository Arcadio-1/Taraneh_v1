"use client";
import axios from "axios";
import React, { useEffect } from "react";

const Pageinated = () => {
  useEffect(() => {
    const geter = async () => {
      const data = axios.get("/api/products");
      console.log(data);
    };
    geter();
  }, []);
  return <div>Pageinated</div>;
};

export default Pageinated;
