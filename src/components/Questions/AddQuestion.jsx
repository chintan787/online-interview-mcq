import { Container, Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styles } from './QuestionsStyles';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategoriesData, addQuestion, getAllQuestionsData } from '../../Action/Data';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddQuestion() {
  const { category_name } = useParams();

  const [questions, setQuestions] = useState({ questions: [] })
  const [data, setData] = useState();
  const [options, setOptions] = useState();
  const [answer, setAnswer] = useState('');
  const [currentId, setCurrentId] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  //codeing questions
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const dispatch = useDispatch();
  const allCategoriesData = useSelector(
    (state) => state.GetAllCategoriesReducer?.getallCategories
  );
  const addNewQue = useSelector((state) => state.AddQuestionReducer?.addQue)
  const allQuestionsData = useSelector((state) => state.GetAllQuestionsReducer?.allQuestions)





  useEffect(() => {
    dispatch(getAllCategoriesData())
  }, [])

  useEffect(() => {
    if (allCategoriesData) {
      const currentData = allCategoriesData.filter((item) => item.cate_name === category_name)
      if (currentData) {
        setCurrentId(currentData[0]?.cate_id);
      }
    }
  }, [allCategoriesData])

  useEffect(() => {
    if (currentId) {
      dispatch(getAllQuestionsData(currentId))
    }
  }, [currentId])

  useEffect(() => {
    if (allQuestionsData) { 
      setData({ ...data, id: allQuestionsData?.questions ? allQuestionsData?.questions.length + 1 : 1 })
    }
  }, [allQuestionsData])



  useEffect(() => {
    if (data?.question) {
      const requiredFields = ['question', 'ans'];
      const isFormComplete = requiredFields.every(field => !!data[field]);
      if (options !== undefined) {
        const optionsRequiredFields = ['option1', 'option2', 'option3', 'option4',]
        const isOptionsComplete = optionsRequiredFields.every(field => !!options[field])
        if (isFormComplete && isOptionsComplete) {
          setIsButtonDisabled(!isFormComplete);
        }
      }
    }

  }, [data]);

  //input values
  const handleValue = (e) => {
    const { name, value } = e.target;
    if (name === "question") {
      setData({ ...data, [name]: value })
    }
    else if (name === "ans") {
      setAnswer(value);
      setData({ ...data, [name]: value })
    }
    else {
      setOptions({ ...options, [name]: value })
      const valuesArray = Object.values({ ...options, [name]: value });
      setData({ ...data, options: valuesArray })
    }
  }

  //code
  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const saveContent = async () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    if (rawContentState) {
      const combinedText = rawContentState?.blocks?.map(block => block.text).join('\n');
      setData({ ...data, code: combinedText })
      return { ...data, code: combinedText }
    }
  };



  const onsubmit = async (e) => {
    e.preventDefault();
    const getData = await saveContent();
    if (getData) {
      const add = [...questions.questions, getData];
      setQuestions({ ...questions, questions: add });
    }
  }

  useEffect(() => {
    if (questions) {
      dispatch(addQuestion(currentId, questions))
    }
  }, [questions])

  useEffect(() => {
    if (addNewQue) {
      if (addNewQue.status === "200") {
        toast(addNewQue.message);
      }
    }
  }, [addNewQue]);




  return (
    <Container>
      <Box sx={styles.pagecontainer}>
        <Typography variant='h3'>{category_name.toLocaleUpperCase()} Question</Typography>
        <Box sx={styles.formContainer}>
          <form style={{ width: "100%", textAlign: "center" }} >
            
            <TextField
              name="question"
              required
              fullWidth
              label="Enter a question"
              variant="outlined"
              sx={styles.formInput}
              onChange={(e) => handleValue(e)}

            />
            <Box sx={styles.label}>
              <label >Enter a Logical Question</label>
            </Box>
            <Editor
              editorState={editorState}
              onEditorStateChange={handleEditorChange}
              toolbarClassName="toolbarClassName"
              editorClassName="editorClassName"
            />

            <TextField
              name="option1"
              required
              fullWidth
              label="Option 1"
              variant="outlined"
              sx={styles.formInput}
              onChange={(e) => handleValue(e)}
            />
            <TextField
              required
              name="option2"
              fullWidth
              label="Option 2"
              variant="outlined"
              sx={styles.formInput}
              onChange={(e) => handleValue(e)}
            />

            <TextField
              name="option3"
              fullWidth
              required
              label="Option 3"
              variant="outlined"
              sx={styles.formInput}
              onChange={(e) => handleValue(e)}
            />
            <TextField
              name="option4"
              fullWidth
              required
              label="Option 4"
              variant="outlined"
              sx={styles.formInput}
              onChange={(e) => handleValue(e)}
            />

            <FormControl fullWidth required>
              <InputLabel id="demo-simple-select-label" sx={styles.selectLabel}>Answer</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="ans"
                value={answer}
                label="Answer"
                sx={styles.selectFormInput}
                onChange={handleValue}
              >
                <MenuItem value={0}>Option 1</MenuItem>
                <MenuItem value={1}>Option 2</MenuItem>
                <MenuItem value={2}>Option 3</MenuItem>
                <MenuItem value={3}>Option 4</MenuItem>

              </Select>
            </FormControl>

            <Button type="submit" sx={styles.formButton} variant="contained" onClick={(e) => onsubmit(e)} disabled={isButtonDisabled} >
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
      </ToastContainer>

    </Container>
  )
}
