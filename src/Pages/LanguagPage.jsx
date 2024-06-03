import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LanguageQuestions from '../components/Languages/LanguageQuestions'
import { useParams } from 'react-router-dom';
import { getAllCategoriesData, getAllQuestionsData } from '../Action/Data';
import { useSelector, useDispatch } from 'react-redux';

export default function LanguagPage(props) {

  const [currentId, setCurrentId] = useState();
  const [timeLimit, setTimeLimit] = useState();
  const { languagename } = useParams();
  const dispatch = useDispatch();
  const allCategoriesData = useSelector(
    (state) => state.GetAllCategoriesReducer?.getallCategories
  );
  const allQuestionsData = useSelector((state) => state.GetAllQuestionsReducer?.allQuestions)
  let currentData;
  useEffect(() => {
    dispatch(getAllCategoriesData())
  }, [])
  useEffect(() => {
    if (allCategoriesData) {
      currentData = allCategoriesData?.filter((item) => item.cate_name.toLowerCase() === languagename.toLowerCase());
      if (currentData.length > 0) {
        setCurrentId(currentData[0]?.cate_id);
        setTimeLimit(currentData[0]?.exam_time)
      }
    }
  }, [allCategoriesData])

  useEffect(() => {
    if (currentId) {
      dispatch(getAllQuestionsData(currentId))
    }
  }, [currentId])

  return (
    <>
      {allQuestionsData?.questions?.length > 0 && (
        <LanguageQuestions  data={allQuestionsData?.questions} timeLimit={timeLimit ? timeLimit : ''}
          languagename={languagename.toUpperCase()} isBack={props.isBack} to="info@strokeinfotech.com" subject="Test Result" message="Kindly check the attached files given below" />
      )}
    </>
  )
}
