// import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserInfo from "../components/Dashboard/UserInfo";

export default function DashboardPage(props) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const stringifiedUser = localStorage.getItem("user");
    const userAsObjectAgain = JSON.parse(stringifiedUser);
    if (!userAsObjectAgain) {
      navigate("/")
    }

  }, [])


  return (
    <>
      <UserInfo />
    </>
  );
}
