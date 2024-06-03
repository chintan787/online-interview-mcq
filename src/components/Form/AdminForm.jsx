import { Box, TextField, Typography, Button, Alert, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styles } from "./FormStyle";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [credential, setCredential] = useState();
    const [isButtonClick, setButtonClick] = useState(false);
    const [isAdminCredentails, setISAdminCredentails] = useState(true);

    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const email = "patelchintan787@gmail.com";
    const password = "Chintan123456@"

    const onSubmit = (data) => {
        setButtonClick(true);
        setCredential(data);

    };

    useEffect(() => {
        if (isButtonClick) {
            localStorage.setItem('admin', JSON.stringify(credential));
            if (credential.admin_email === email && credential.admin_password === password) {
                navigate('/admin/dashboard');
            }
            else {
                setISAdminCredentails(!isAdminCredentails)
                // navigate('/dashboard');
            }
        }
    }, [isButtonClick])

    return (
        <Container>
            <Box
                sx={styles.formContainer}
                autoComplete="off"
            >
                <Typography variant="h3" sx={styles.loginTitle}>
                    Login
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%", textAlign: "center" }}>
                    <TextField
                        type="email"
                        name="admin_email"
                        id="admin_email"
                        fullWidth
                        label="Email"
                        variant="outlined"
                        sx={styles.formInput}
                        // onChange={handleUserCredential}
                        {...register("admin_email", {
                            required: "Email is required",
                            pattern: {
                                value:
                                    /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/,
                                message: "Enter valid Email",
                            },
                        })}
                    />
                    {errors.admin_email ? (
                        <Alert severity="error"> {errors.admin_email?.message}</Alert>
                    ) : (
                        ""
                    )}

                    <TextField
                        type="password"
                        name="admin_password"
                        id="admin_password"
                        fullWidth
                        label="Password"
                        variant="outlined"
                        autoComplete='current-password'
                        sx={styles.formInput}
                        // onChange={handleUserCredential}
                        {...register("admin_password", {
                            required: "Password is required",
                            // pattern: {
                            //   value:
                            //     /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/,
                            //   message: "Enter valid Email",
                            // },
                        })}
                    />
                    {errors.admin_password ? (
                        <Alert severity="error"> {errors.admin_password?.message}</Alert>
                    ) : (
                        ""
                    )}
                    {!isAdminCredentails && (
                        <Alert severity="error">Please Enter Valid Credentials</Alert>
                    )}

                    <Button type="submit" sx={styles.formButton} variant="contained" /* onClick={e => (e.preventDefault())} */>
                        Sign in
                    </Button>
                </form>
            </Box>
        </Container>
    )
}
