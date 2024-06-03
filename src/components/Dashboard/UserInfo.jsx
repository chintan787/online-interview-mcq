import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styles } from "./UserInfoStyle";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  getAllCategoriesData } from '../../Action/Data';
import { useSelector, useDispatch } from 'react-redux';



export default function UserInfo(props) {
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allCategoriesData = useSelector(
    (state) => state.GetAllCategoriesReducer?.getallCategories
  );
  const stringifiedUser = localStorage.getItem("user");
  const userAsObjectAgain = JSON.parse(stringifiedUser);
  const location = useLocation();
  useEffect(() => {
    dispatch(getAllCategoriesData())
  }, []);

  useEffect(() => {
    if (location.state !== null) {
      setShowToast(true);
    }
  }, []);

  useEffect(() => {
    if (showToast) {
      toast(location.state.name);
    }
  }, [showToast])

  const handleSelection = (e) => {

    const val = e.target.innerHTML.split("<")[0];
    console.log("val",val)
    navigate(`/dashboard/${val.toLowerCase()}`);
  };


  return (
    <Container>
      <Box sx={styles.userDetails}>
        <Box style={styles.languageSelectionSection}>
          <Box sx={styles.userInfoSection}>
            <Typography variant="h5" sx={styles.userName}>
              Hello {userAsObjectAgain?.user_name}
            </Typography>
            <Typography>Email : {userAsObjectAgain?.user_email}</Typography>
            <Typography>
              Mobile no : {userAsObjectAgain?.user_mobileNo}
            </Typography>
          </Box>

          <Typography variant="h5" sx={styles.subHeading}>
            Please Select Language
          </Typography>
          <Box>

            {allCategoriesData.map((item) =>
              <Button
                variant="contained"
                sx={styles.languageButton}
                onClick={handleSelection}
                key={item.cate_id}
              >
                {item.cate_name}
              </Button>
            )}
            {/* <Button
              variant="contained"
              sx={styles.languageButton}
              onClick={handleSelection}
            >
              PHP
            </Button>
            <Button
              variant="contained"
              sx={styles.languageButton}
              onClick={handleSelection}
            >
              JavaScript
            </Button>
            <Button
              variant="contained"
              sx={styles.languageButton}
              onClick={handleSelection}
            >
              SQL
            </Button>
            <Button
              variant="contained"
              sx={styles.languageButton}
              onClick={handleSelection}
            >
              CSS
            </Button> */}
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
