// import { Box, Typography } from "@mui/material";
import React,{useState,useEffect} from "react";
import { BrowserRouter, Routes, Route  } from "react-router-dom";
// useNavigate
import DashboardPage from "./Pages/DashboardPage";
import LanguagPage from "./Pages/LanguagPage";
import LoginPage from "./Pages/LoginPage";
import ResultPage from "./Pages/ResultPage";
import AdminDashboardPage from "./Pages/AdminDashboardPage";
import QuestionPage from "./Pages/QuestionPage";
import AdminPage from "./Pages/AdminPage";

export default function Router() {
 
  const useBackButton = () => {
    const [isBack, setIsBack] = useState(false);
    const handleEvent = () => {
      setIsBack(true);
    };
  
    useEffect(() => {
      window.addEventListener("popstate", handleEvent);
      return () => window.removeEventListener("popstate", handleEvent);
    });
  
    return isBack;
  };
  
  const isBack = useBackButton();
// console.log("isback",isBack);

  return (
    <BrowserRouter>
      <Routes>
      {/* isBack: {String(isBack)} */}
        <Route exact path="/" element={<LoginPage  />} />
        <Route exact path="/admin" element={<AdminPage />} />
        <Route exact path="/admin/dashboard" element={<AdminDashboardPage  isBack={isBack} />} />
        <Route exact path="/admin/dashboard/:category_name" element={<QuestionPage  isBack={isBack} />} />

        <Route exact path="/dashboard" element={<DashboardPage isBack={isBack} />} />
        <Route exact path="/dashboard/:languagename" element={<LanguagPage  isBack={isBack} />} />

        <Route exact path="/dashboard/result" element={<ResultPage />} />
      </Routes>

      {/* <Box>
      <Typography>Router</Typography>
    </Box> */}
    </BrowserRouter>
  );
}
