import { Box, TextField, Typography, Button, Alert, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styles } from "./FormStyle";
import { useForm } from "react-hook-form";
import { Link ,useNavigate } from "react-router-dom";
import UserInfo from "../Dashboard/UserInfo";


export default function UserForm(props) {
  const [credential, setCredential] = useState();
  const [isButtonClick, setButtonClick] = useState(false);


const navigate = useNavigate(); 
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const handleUserCredential = (event) => {
    const { value, name } = event.target;
    // setCredential({ ...credential, [name]: value });
  };

  const onSubmit = (data) => {
    // console.log("data",data);
    setButtonClick(true);
    setCredential(data);
    
  };

  useEffect(()=>{
    if(isButtonClick){
      localStorage.setItem('user',JSON.stringify(credential));
      navigate('/dashboard');
    }

  },[isButtonClick])


  return (
    
      <Container>

    <Box
      sx={styles.formContainer}
      autoComplete="off"
    >
      <Typography variant="h3" sx={styles.loginTitle}>
        Login
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} style={{width:"100%",textAlign:"center"}}>
       
          <TextField
            name="user_name"
            id="user_name"
            fullWidth
            label="Full Name"
            variant="outlined"
            sx={styles.formInput}
            onChange={handleUserCredential}
            {...register("user_name", {
              required: "Full Name is required",
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Please Enter valid Name",
              },
            })}
          />
          {errors.user_name ? (
            <Alert severity="error"> {errors.user_name?.message}</Alert>
          ) : (
            ""
          )}

          <TextField
           type="email"
            name="user_email"
            id="user_email"
            fullWidth
            label="Email"
            variant="outlined"
            sx={styles.formInput}
            onChange={handleUserCredential}
            {...register("user_email", {
              required: "Email is required",
              pattern: {
                value:
                  /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/,
                message: "Enter valid Email",
              },
            })}
          />
          {errors.user_email ? (
            <Alert severity="error"> {errors.user_email?.message}</Alert>
          ) : (
            ""
          )}
          <TextField
            name="user_mobileNo"
            id="user_mobileNo"
            fullWidth
            label="Mobile no."
            variant="outlined"
            sx={styles.formInput}
            onChange={handleUserCredential}
            {...register("user_mobileNo", {
              required: "Mobile number is required",
              pattern: {
                value:/^\d{10}$/,
                message: "Enter valid Mobile number",
              },
            })}
          />
           {errors.user_mobileNo ? (
            <Alert severity="error"> {errors.user_mobileNo?.message}</Alert>
          ) : (
            ""
          )}


          <Button type="submit" sx={styles.formButton} variant="contained" /* onClick={e => (e.preventDefault())} */>
            Sign in
          </Button>
        
      </form>
      
    </Box>
    </Container>
  )
}
