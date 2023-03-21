// import { Box, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserInfo from "../components/Dashboard/UserInfo";

export default function DashboardPage(props) {
  const location = useLocation();
  // console.log("isback from dashboard page:",props.isBack);

  return (
    <>
      <UserInfo />
    </>
  );
}
