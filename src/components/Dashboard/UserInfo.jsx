import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styles } from "./UserInfoStyle";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserInfo(props) {
  const [showToast , setShowToast] = useState(false);
  
  const navigate = useNavigate();

  const stringifiedUser = localStorage.getItem("user");
  const userAsObjectAgain = JSON.parse(stringifiedUser);
  const location = useLocation();

  const handleSelection = (e) => {
    const val = e.target.innerHTML.split("<")[0];
    navigate(`/dashboard/${val}`);
  };

  useEffect(() => {
    if (location.state !== null) {
      setShowToast(true);
      // alert(location.state.name)
    }

  }, []);

  useEffect(()=>{
    if(showToast)
    {
      toast(location.state.name);
    }
  },[showToast])
 
 


  return (
    <Container>
      <Box sx={styles.userDetails}>
        <Box style={styles.languageSelectionSection}>
          <Box sx={styles.userInfoSection}>
            <Typography variant="h5" sx={styles.userName}>
              Hello {userAsObjectAgain.user_name}
            </Typography>
            <Typography>Email : {userAsObjectAgain.user_email}</Typography>
            <Typography>
              Mobile no : {userAsObjectAgain.user_mobileNo}
            </Typography>
          </Box>

          <Typography variant="h5" sx={styles.subHeading}>
            Please Select Language
          </Typography>
          <Box>
            <Button
              variant="contained"
              sx={styles.languageButton}
              onClick={handleSelection}
              // disabled={completedStatus.name === "PHP_completed" ? true : false}
            >
              PHP
            </Button>
            <Button
              variant="contained"
              sx={styles.languageButton}
              onClick={handleSelection}
              // disabled={completedStatus.name === "JavaScript_completed" ? true : false}
            >
              JavaScript
            </Button>
            <Button
              variant="contained"
              sx={styles.languageButton}
              onClick={handleSelection}
              // disabled={completedStatus.name === "HTML_completed" ? true : false}
            >
              SQL
            </Button>
            <Button
              variant="contained"
              sx={styles.languageButton}
              onClick={handleSelection}
            >
              CSS
            </Button>
          </Box>

          

          {location.state !== null ? (
            <>
            {/* <Typography>{location.state.name}</Typography> */}
            <ToastContainer 
            position="bottom-right"
            autoClose={5000}
            closeOnClick
            theme="light"
            >
              {location.state.name}
              </ToastContainer>
            
            </>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </Container>
  );
}
