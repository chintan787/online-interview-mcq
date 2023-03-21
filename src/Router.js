// import { Box, Typography } from "@mui/material";
import React,{useState,useEffect} from "react";
import { BrowserRouter, Routes, Route  } from "react-router-dom";
// useNavigate
import DashboardPage from "./Pages/DashboardPage";
import LanguagPage from "./Pages/LanguagPage";
import LoginPage from "./Pages/LoginPage";
import ResultPage from "./Pages/ResultPage";
import TimerPage from "./Pages/TimerPage";

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
        <Route exact path="/dashboard" element={<DashboardPage isBack={isBack} />} />
        <Route exact path="/dashboard/:languagename" element={<LanguagPage  isBack={isBack} />} />

        <Route exact path="/dashboard/result" element={<ResultPage />} />
        <Route exact path="/dashboard/timer" element={<TimerPage />} />



      </Routes>

      {/* <Box>
      <Typography>Router</Typography>
    </Box> */}
    </BrowserRouter>
  );
}
