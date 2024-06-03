export const styles = {
  allQuestionSection: {
    // padding:3
    height:"100vh",
    position:"relative",
    // overflow: "scroll"
  },
  quizHeader: {
    borderBottom: "1px solid #ccc",
    // padding:2,
    // padding:"12px 16px",
    textAlign: "center",
    transition: "height .10s ease-in",
    // height:"90px",
    display:'flex',
    alignItems:'center',
    justifyContent:"center",

    height: {
      xs:"auto",
      md:"90px"
    },
    "&.fixed": {
      // height:"90px",
      height: {
        xs:"auto",
        md:"90px"
      },
      // padding:"12px 16px",
      position: "fixed",
      background: "#fff",
      zIndex: " 1",
      width: "100%",
      // "& .MuiContainer-root":{
      //   paddingLeft:{
      //     xs:2,
      //     lg:0
      //   },
      //   paddingRight:{
      //     xs:2,
      //     lg:0
      //   }
      // }
    },
  },

  questionContainer: {
    // marginBottom:3,
    marginTop: 3,
    // paddingBottom:3,
    "&:last-child": {
      marginBottom: 1,
      // paddingBottom:3
    },
  },
  quizSection: {
    // paddingTop:"95px"
  },
  allQuestions: {
    position: "absolute",
    padding: "24px",
    width:"auto",
    // width: {
    //   xs:"auto",
    //   lg:"100%"
    // },
    left: 0,
    right: 0,
    height: "100%",
    top:"80px",

    // marginTop:"100px"
    // paddingTop:"100px",
    "&.questionSection":{
        // paddingTop:"100px",
        // marginTop:"90px",
    },

   
  },
  question: {
    fontSize:"18px",
    marginBottom: 1,
  },
  options: {
    backgroundColor: "#E7E9EB",
    border: "1px solid #FFF",
    marginRight:0,
    "&:hover": {
      backgroundColor: "#ddd",
    },
    "& span": {
      fontSize: "15px",
      // textTransform:"lowercase"

    },
    "& span.MuiTypography-root":{
      display:"flex",
      alignItems:"center",
      "& svg":{
        marginLeft:1
      }
    }
  },
  optionSection: {
    marginLeft: 1,
  },
  submitButton: {
    display: "flex",
    margin: "30px auto",
    "&.MuiButtonBase-root.MuiButton-root.MuiButton-contained.Mui-disabled":{
      color:"transparent"
    }
  },
  timerSection: {
    display: "flex",
    justifyContent:"center",
   
    alignItems: "center",
  },
  timeLeft: {
    paddingRight: {
      xs:0,
      sm:2
    },
    fontSize:{
      xs:"12px",
      sm:"14px",
      lg:"18px"
    }
  },
  resultSection: {
    margin:{
      xs:"0",
      md:"20px 0"
    },
    //  "20px 0",
    textAlign: "center",
    display:"none"

  },
  countMarks: {
    fontSize: {xs:"15px",md:"20px"},
    margin:{
      xs:"0",
      md:"10px 0"
    },

    "&.countMarks":{
        display:"none"
    }
  },
  divier:{
  height:"10px",
  },
  headerSection:{
    display:'flex',
    width: "100%",
    alignItems: "center",
    justifyContent:{
      xs:"center",
      sm:"space-between",
      md:"space-between"
    }
  },
  testName:{
    order:1
  },
  userInfo:{
    textAlign:"left",
    "&.userInfo":{
        order:0
    },
    "&.userInfo-desktop":{
      display:{
        xs:"none",
        sm:"block"
      }
    },
    "&.userInfo-mobile":{
      display:{
        xs:"block",
        sm:"none"
      }
    }
  },

  testTimeSection:{
    order:2,
    // "&.timezone":{
    //   xs:"none",
    //   lg:"block"
    // },
    
    "&.timezone-desktop .timezone":{
      display:{
        xs:"none",
        // sm:"flex",
        md:"flex"
      }  
     
    },
    "&.timezone-mobile .timezone":{
      display:{ 
        xs:"flex",
      md:"none"
    }
    }
  },
  timeDetails:{
    fontSize:{
      xs:"12px",
      sm:"14px",
      lg:"18px"
    }
  },
  warningMSG:{
    fontSize:{
      xs:"10px",
      sm:"14px"
    }
    
    // "14px"
  },
  doneIcon:{
    // fontSize:"20px",
    // color:,
    "&.doneIcon":{
      display:"none"
    }
  },
  showLoader:{
    position: "absolute"
},
userName:{
  fontSize:{
    xs:"12px",
    md:"16px",
    // xl:"18px",
  },
  textTransform: "capitalize"
},
userEmail:{
  fontSize:{
    xs:"12px",
    md:"16px",
    // xl:"18px",

  },
},
testTitle:{
  fontSize:{
    xs:'20px',
    md:'30px'},
  // {
  //   xs:"30px",
  //   sm:"40px",
  //   lg:"50px",
    
  // },
  fontWeight:500
}

};
