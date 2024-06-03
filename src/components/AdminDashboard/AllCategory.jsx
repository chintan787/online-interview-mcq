import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Typography, TextField, Alert } from "@mui/material";
import { styles } from './AdminDashboardStyle';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addCategory, getAllCategoriesData } from '../../Action/Data';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AllCategory() {

    const [newcategory, setNewCategory] = useState();
    const [categoryData, setCategoryData] = useState([
        "php", "sql", "css", "html", "javascript",
        // "php", "sql", "css", "html", "javascript",
        //  "php", "sql", "css", "html", "javascript"
    ])
    // const [] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm();

    const allCategoriesData = useSelector(
        (state) => state.GetAllCategoriesReducer?.getallCategories
    );
    const addnewCategory = useSelector((state) => state.AddCategoryReducer?.addCategory)

    useEffect(() => {
        dispatch(getAllCategoriesData())
    }, [])
 

    const handleSelection = (name) => {
        navigate(`/admin/dashboard/${name.toLowerCase()}`)
    }
    const handleValue = (e) => {
        const { name, value } = e.target;
        setNewCategory({ ...newcategory, [name]: name === "exam_time" ? Number(value * 60) : value });
       
    }

    const onSubmit = (data) => {
        const newData = { ...data, exam_time: Number(data.exam_time * 60) }
        dispatch(addCategory(newData))
        setCategoryData([...categoryData, newData])
    };

    useEffect(() => {
        if (addnewCategory) {
            dispatch(getAllCategoriesData());
            if(addnewCategory.status === "200")
            {
                toast(addnewCategory.message);
                reset();
            }
        }
    }, [addnewCategory])


    return (
        <Container>
            <Box sx={styles.pageContainer} autoComplete="off">
                <Typography variant="h3" >All Categories</Typography>
                <Box>
                    {allCategoriesData?.map((item) =>
                        <Button
                            variant="contained"
                            sx={styles.button}
                            onClick={() => handleSelection(item.cate_name)}
                            key={item.cate_id}

                        >
                            {item.cate_name}
                        </Button>
                    )}

                </Box>
                <Box sx={styles.formContainer}>
                    <Typography variant="h5" style={styles.subtitle}>Add a New Category</Typography>

                    <form style={{ width: "100%", textAlign: "center" }} onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            name="cate_name"
                            id="cate_name"
                            required
                            fullWidth
                            label="Category Name"
                            variant="outlined"
                            sx={styles.formInput}
                            onChange={(e) => handleValue(e)}
                            {...register("cate_name", {
                                required: "Category Name is required",
                            })}
                        />
                        {errors.cate_name ? (
                            <Alert severity="error"> {errors.cate_name?.message}</Alert>
                        ) : (
                            ""
                        )}

                        <TextField
                            name="exam_time"
                            id="timer"
                            required
                            type="number"
                            fullWidth
                            label="Enter Time limit"
                            variant="outlined"
                            sx={styles.formInput}
                            onChange={(e) => { handleValue(e); }}
                            {...register("exam_time", {
                                required: "Time limit is required",
                            })}
                        />
                        {errors.exam_time ? (
                            <Alert severity="error"> {errors.exam_time?.message}</Alert>
                        ) : (
                            ""
                        )}

                        <Button type="submit" sx={styles.formButton} variant="contained" /* onClick={(e) => handleCategoryData(e)} */>
                            Add
                        </Button>

                    </form>
                </Box>
            </Box>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                closeOnClick
                theme="light"
            >
                {/* {location.state.name} */}
            </ToastContainer>
        </Container>
    )
}
