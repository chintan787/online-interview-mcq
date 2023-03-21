import React from 'react'
import LanguageQuestions from './LanguageQuestions'
import phpData from "../../Data/PHPData.json";
import { useParams, useNavigate } from "react-router-dom";
import jsData from "../../Data/JavaScriptData.json";
import htmlData from "../../Data/HTMLData.json";
import cssData from "../../Data/CSSData.json";
import sqlData from "../../Data/SQLData.json";
import { Typography } from '@mui/material';



export default function Languages(props) {

  
  const { languagename } = useParams();
 
  return (
    <>
    {languagename.toLowerCase() === "php" ? 
      <LanguageQuestions data={phpData} languagename={languagename}  isBack={props.isBack} to={props.to} subject={props.subject} message={props.message}/>
      : "" }
      {languagename.toLowerCase() === "javascript" ? <LanguageQuestions data={jsData} languagename={languagename} isBack={props.isBack} to={props.to} subject={props.subject} message={props.message}  /> : ""}

      {languagename.toLowerCase() === "sql" ? <LanguageQuestions data={sqlData} languagename={languagename} isBack={props.isBack} to={props.to} subject={props.subject} message={props.message} /> : ""}

      {languagename.toLowerCase() === "css" ? <LanguageQuestions data={cssData} languagename={languagename} isBack={props.isBack} to={props.to} subject={props.subject} message={props.message} /> : ""}
      
    </>
  )
}
