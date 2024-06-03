import {
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  Container,
  CircularProgress

} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { styles } from "./LanguageQuestionsStyles";
import { PDFExport } from "@progress/kendo-react-pdf";
import { drawDOM, exportPDF } from "@progress/kendo-drawing";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import RightIcon from "./RightIcon";
import { v4 as uuidv4 } from 'uuid';
import Timer from "./Timer";
import { sendMail } from "../../Action/Data";
import { useSelector, useDispatch } from 'react-redux';
import { ConstructionOutlined } from "@mui/icons-material";

export default function LanguageQuestions(props) {

  const [ansValue, setValue] = useState();
  const [submitBtnclick, setSubmitBtnClick] = useState(false);
  const [totalMarks, setTotalMarks] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [finishStatus, setfinishStatus] = useState(false);
  const [saveAsPDF, setSaveAsPDF] = useState();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState();


  const data = props.data;
  const navigate = useNavigate();
  const pdfExportComponent = React.useRef(null);
  let count = 0;
  const location = useLocation();
  const stringifiedUser = localStorage.getItem("user");
  const userAsObjectAgain = JSON.parse(stringifiedUser);

  const dispatch = useDispatch();
  const sendMaildata = useSelector(
    (state) => state.SendMailReducer?.mail
  );

  //onclick get answers
  const handleChange = (event) => {
    const { value, name } = event.target;
    setValue({ ...ansValue, [name]: value });
  };

  // Form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };


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
      if (ansValue !== undefined) {
        if (checkansloop[firstansloop] === ansValue[i]) {
          count++;
          // setTotalMarks(count);
        }
      }
    }
    setTotalMarks(count);

    // convert pdf
    setTimeout(() => {
      if (pdfExportComponent.current) {
        // const savePDF = pdfExportComponent.current;
        // pdfExportComponent.current.save();
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
    }, [1500]); //1500
  };


  // send mail API
  useEffect(() => {
    if (saveAsPDF !== undefined) {
      const subjectName = props.subject + " of " + props.languagename;
      const filename = props.languagename.toLowerCase() + ".pdf"
      const formData = new FormData();
      formData.append("form", userAsObjectAgain?.user_email);
      formData.append("to", props.to);
      formData.append("subject", subjectName);
      formData.append("filename", filename);
      // formData.append("message", props.message);
      formData.append("attachment", saveAsPDF);
      dispatch(sendMail(formData));
  
    }
  }, [saveAsPDF]);


  useEffect(() => {
    if (sendMaildata.status === 200) {
      if (submitBtnclick) {
        navigate("/dashboard", {
          state: { id: 1, name: `${props?.languagename.toLowerCase()} test completed` },
        });
        setSubmitBtnClick(false)
      }
    }
  }, [sendMaildata])

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



  useEffect(() => {
    const ans = localStorage.getItem("key");
    setSaved(ans)
  }, [])


  return (
    <>
      <Box sx={styles.allQuestionSection}>
        <PDFExport
          ref={pdfExportComponent}
        >
          <form
            action="http://localhost:3001/post"
            method="POST"
            id="form"
            className="form form-mobile"
           
          >
            <Box sx={styles.quizHeader} className="fixed">
              <Container>
                <Box
                  sx={[styles.headerSection]}
                  className="questionHeaderSection"
                >
                  <Box sx={[styles.resultSection]} className="resultSection">
                    <Typography sx={styles.countMarks} className="countMarks">
                      Total : {totalMarks}/{data?.length}{" "}
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
                      {saved === "mobile" ?
                        props?.timeLimit && (
                          <Timer limit={props?.timeLimit / 60} handleAllAns={handleAllAns} />
                        )
                         : ""} 
                    </Box>


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
                        Total : {totalMarks}/{data?.length}{" "}
                      </Typography>
                    </Box>

                  </Box>

                  <Box sx={styles.testTimeSection} className="timezone-desktop">
                    {saved === "desktop" ?
                      props?.timeLimit && (
                        <Timer limit={props?.timeLimit / 60} handleAllAns={handleAllAns} />
                      )
                       : ""} 
                  </Box>

                </Box>
              </Container>
            </Box>

            <Container sx={{ position: "relative" }}>
              <Box
                sx={[styles.allQuestions, { marginBottom: 2 }]}
                className="questionSection"
              >
                {data ?
                  data.length > 0 &&
                  data.map((i, index) => (
                    <Box key={index}>
                      <Box
                        key={i.id}
                        sx={styles.questionContainer}
                        className="questionContainer"
                      >
                        <Typography sx={styles.question} className="question">
                          {i.id}.{i.question}
                        </Typography>

                        {i.code ? (
                          <Box className="code">
                          <SyntaxHighlighter
                            language={props.languagename.toLowerCase()}
                           
                          >
                            {i.code.replaceAll("\n", "\n")}
                          </SyntaxHighlighter>
                          </Box>
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
                                key={ind + uuidv4()}
                                // id={uuidv4()}
                                control={<Radio />}
                                label={[
                                  option,
                                  parseInt(ind) === parseInt(i.ans) ? (
                                    <RightIcon />
                                  ) : (
                                    ""
                                  ),

                                ]}
                                // key={`index ${ind} ${index}`}
                                sx={[styles.options, { textTransform: option === "Undefined" ? "lowercase" : "" }]}
                                className={`allOptions ${ind} index ${ind} ${index}`}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    </Box>
                  ))
                  :
                  <Typography sx={{ textAlign: 'center', padding: 10 }}>No Data Found</Typography>
                }

                <Button
                  sx={[styles.submitButton, { color: loading ? "transparent" : "#fff" }]}
                  disabled={loading ? true : false}
                  variant="contained"
                  className="submitbtn"
                  onClick={handleAllAns}
                >
                  submit
                  {loading ? <CircularProgress size={20} sx={styles.showLoader} /> : " "}
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
