import { Box, Typography, Container } from "@mui/material";
import React from "react";
import data from '../Data/PHPData.json'

export default function ResultPage() {
  
  const totalCount = localStorage.getItem("total");
  // console.log("userAsObjectAgain",userAsObjectAgain);
  console.log("data",data)

  return (
    <Container>
      <Box sx={styles.results}>
        <Typography variant="h3">Result</Typography>
        <Typography sx={styles.totalMarks}>Total : {totalCount}/{data.length} </Typography>
      </Box>
    </Container>
  );
}


const styles = {
    results:{
        display:"flex",
        flexDirection:"column",
        height:"100vh",
        justifyContent:"center",
        alignItems:"center"
    },
    totalMarks:{
        fontSize:"20px",
        margin:"10px 0"
    }
}