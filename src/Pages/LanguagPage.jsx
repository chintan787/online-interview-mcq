import { Box, Typography } from '@mui/material'
import React from 'react'
import LanguageQuestions from '../components/Languages/LanguageQuestions'
import Languages from '../components/Languages/Languages'

export default function LanguagPage(props) {
  // console.log("isback from language page:",props.isBack);

  return (
    <>
    {/* <LanguageQuestions /> */}
    <Languages isBack={props.isBack} to="nehaj.strokeinfotech@gmail.com" subject="Test Result" message="Kindly check the attached files given below" />
    </>
  )
}
