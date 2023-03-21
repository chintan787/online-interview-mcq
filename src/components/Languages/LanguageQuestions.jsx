import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  Container,
  Divider,
  CircularProgress

} from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { styles } from "./LanguageQuestionsStyles";
import { useTimer } from "react-timer-hook";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { drawDOM, exportPDF } from "@progress/kendo-drawing";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import RightIcon from "./RightIcon";
import { Co2Sharp, ConstructionOutlined } from "@mui/icons-material";
// import MyTimer from "./MyTimer";


function MyTimer({ expiryTimestamp,callbtton}) {

  const {
    seconds,
    minutes,
    isRunning,
  } = useTimer({ expiryTimestamp, onExpire: () => { console.warn('onExpire called'); callbtton();} });


  return (
    

<Box sx={styles.timerSection} className="timezone">
     <Typography sx={styles.timeLeft} variant="h6">
         Time Left :{" "}
       </Typography>
       <Typography sx={styles.timeDetails}>
         {minutes.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </Typography>
      <Typography sx={styles.timeDetails}>:</Typography>
      <Typography sx={styles.timeDetails}>
        {seconds.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </Typography>
   </Box>
  );
}

 



export default function LanguageQuestions(props) {
  const [ansValue, setValue] = useState();
  const [submitBtnclick, setSubmitBtnClick] = useState(false);
  const [totalMarks, setTotalMarks] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [timeZone, setTimeZone] = useState();
  const [finishStatus, setfinishStatus] = useState(false);
  const [saveAsPDF, setSaveAsPDF] = useState();
  const [loading, setLoading] = useState(false);

  const [timeExpire , setTimeExpire] = useState(0);

  const data = props.data;
  const navigate = useNavigate();
  const pdfExportComponent = React.useRef(null);
  let count = 0;
  const location = useLocation();
  const stringifiedUser = localStorage.getItem("user");
  const userAsObjectAgain = JSON.parse(stringifiedUser);

  //onclick get answers
  const handleChange = (event) => {
    const { value, name } = event.target;
    setValue({ ...ansValue, [name]: value });
  };

  // Form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  // console.log("ansValue",ansValue)


  //Click submit button
  const handleAllAns = () => {
    
    setLoading(true);
    setSubmitBtnClick(true);
    const ans = data && data.map((i) => i.ans);
    const options = data && data.map((i, index) => i.options);

    

    // check correct Answer
    for (let i = 0; i < options.length; i++) {
      const checkansloop = options[i];
      const firstansloop = ans[i];

      console.log("ansValue",ansValue)
      if (ansValue !== undefined) {
        if (checkansloop[firstansloop] === ansValue[i]) {
          count++;
          setTotalMarks(count);
        }
      }
    }

    // convert pdf
    setTimeout(() => {
      if (pdfExportComponent.current) {
        // const savePDF = pdfExportComponent.current;
        let gridElement = document.querySelector(".form");
        drawDOM(gridElement, {
          paperSize: "auto",
        })
          .then((group) => {
            return exportPDF(group);
          })
          .then((dataUri) => {
            setSaveAsPDF(dataUri.split(";base64,")[1]);
          });
      }
    }, [1500]);
  };

  //send mail API
  useEffect(() => {
    if (saveAsPDF !== undefined) {
      const subjectName = props.subject +" of "+ props.languagename
      const formData = new FormData();
      formData.append("attachment", saveAsPDF);
      formData.append("form", userAsObjectAgain.user_email);
      formData.append("to", props.to);
      formData.append("subject", subjectName);
      formData.append("message", props.message);
      fetch("http://13.127.187.65:3009/attachment/add/", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          // console.log("result",result.data)
          setLoading(false);
          let name = props.languagename;
          navigate("/dashboard", {
            state: { id: 1, name: `${props.languagename} test completed` },
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
          
    }
  }, [saveAsPDF]);

 


  //Stickty Header scrollTop
  function logit() {
    setScrollY(window.pageYOffset);
  }
  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", logit);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", logit);
    };
  });

  // Browser Back button handling
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!finishStatus) {
      if (window.confirm("Do you want to go back ?")) {
        setfinishStatus(true);
        handleAllAns();
      } else {
        window.history.pushState(null, null, window.location.pathname);
        setfinishStatus(false);
      }
    }
  };

  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, []);

  const timerNew = new Date();
  timerNew.setSeconds(timerNew.getSeconds() + 600); // 10 minutes timer
  // console.log("time",timerNew)

  return (
    <>
      <Box sx={styles.allQuestionSection}>
        <PDFExport
          ref={pdfExportComponent}
          // paperSize="auto"
          // margin={20}
          // fileName={`${props.languagename}`}
          // author="Team"
        >
          <form
            action="http://localhost:3001/post"
            method="POST"
            id="form"
            className="form"
          >
            <Box sx={styles.quizHeader} className="fixed">
              <Container>
                <Box
                  sx={[styles.headerSection]}
                  className="questionHeaderSection"
                >
                  <Box sx={[styles.resultSection]} className="resultSection">
                    <Typography sx={styles.countMarks} className="countMarks">
                      Total : {totalMarks}/{data.length}{" "}
                    </Typography>
                  </Box>

                  <Box sx={styles.testName}>
                    <Typography variant="h3" sx={styles.testTitle}>
                      {props.languagename} Test
                    </Typography>
                    <Typography className="warningMSG" sx={styles.warningMSG}>
                      Don't Press back button otherwise test will be submitted!
                    </Typography>

                    <Box sx={styles.testTimeSection} className="timezone-mobile">
                    <MyTimer expiryTimestamp={timerNew} callbtton={handleAllAns} />
                    </Box>
                   
                    {/* <Box sx={styles.userInfo} className="userInfo userInfo-mobile">
                    <Typography sx={styles.userName}>
                      Name : {userAsObjectAgain.user_name}
                    </Typography>
                    <Typography sx={styles.userEmail}>
                      Email : {userAsObjectAgain.user_email}
                    </Typography>
                  </Box>

                  <Box sx={styles.testTimeSection} className="timezone-mobile">
                    <MyTimer expiryTimestamp={timeZone} />
                    </Box> */}
                    
                  </Box>

                  <Box sx={styles.userInfo} className="userInfo userInfo-desktop">
                    <Typography sx={styles.userName}>
                      Name : {userAsObjectAgain.user_name}
                    </Typography>
                    <Typography sx={styles.userEmail}>
                      Email : {userAsObjectAgain.user_email}
                    </Typography>
                    <Typography sx={styles.userEmail}>
                      Phone no : {userAsObjectAgain.user_mobileNo}
                    </Typography>

                    <Box sx={[styles.resultSection]} className="resultSection-mobile">
                    <Typography sx={styles.countMarks} className="countMarks">
                      Total : {totalMarks}/{data.length}{" "}
                    </Typography>
                  </Box>

                  </Box>

                  <Box sx={styles.testTimeSection} className="timezone-desktop">
                    <MyTimer expiryTimestamp={timerNew} callbtton={handleAllAns} />
                  </Box>

                </Box>
              </Container>
            </Box>

            <Container sx={{ position: "relative" }}>
              <Box
                sx={[styles.allQuestions, { marginBottom: 2 }]}
                className="questionSection"
              >
                {data &&
                  data.length > 0 &&
                  data.map((i, index) => (
                    <>
                      <Box
                        key={i.id}
                        sx={styles.questionContainer}
                        className="questionContainer"
                      >
                        <Typography sx={styles.question} className="question">
                          {i.id}.{i.question}
                        </Typography>

                        {i.code ? (
                          <SyntaxHighlighter
                            language={props.languagename.toLowerCase()}
                          >
                            {i.code.replaceAll("\n", "\n")}
                          </SyntaxHighlighter>
                        ) : (
                          ""
                        )}

                        <FormControl
                          sx={{ width: "100%" }}
                          key={i.id}
                          onSubmit={handleFormSubmit}
                        >
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            onChange={handleChange}
                            // name={i.id}
                            name={index.toString()}
                            sx={styles.optionSection}
                          >
                            {i.options.map((option, ind) => (
                              <FormControlLabel
                                value={option}
                                control={<Radio />}
                                label={[
                                  option,
                                  parseInt(ind) === parseInt(i.ans) ? (
                                    <RightIcon />
                                  ) : (
                                    ""
                                  ),

                                ]}
                                key={`index ${ind} ${index}`}
                                sx={[styles.options,{textTransform:option === "Undefined" ? "lowercase" : ""}]}
                                className={`allOptions ${ind} index ${ind} ${index}`}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    </>
                  ))}
                {/* <Box sx={{ height: "50px" }} className="extraSpace"></Box> */}

                <Button
                  sx={[styles.submitButton,{color:loading ? "transparent" : "#fff"}]}
                  disabled={loading ? true : false}
                  variant="contained"
                  className="submitbtn"
                  onClick={handleAllAns}
                >
                  submit
                  {loading ?  <CircularProgress size={20} sx={styles.showLoader} /> : " "}
                </Button>

                <Box id="result" sx={styles.divier}></Box>
              </Box>
            </Container>
          </form>
        </PDFExport>
      </Box>
    </>
  );
}
