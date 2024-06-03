import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';

import { AddCategoryReducer,GetAllCategoriesReducer ,AddQuestionReducer , GetAllQuestionsReducer ,SendMailReducer} from "../Reducer/QuestionReducer";

const rootReducer = combineReducers({
    AddCategoryReducer:AddCategoryReducer,
    GetAllCategoriesReducer:GetAllCategoriesReducer,
    AddQuestionReducer:AddQuestionReducer,
    GetAllQuestionsReducer:GetAllQuestionsReducer,
    SendMailReducer:SendMailReducer
})


const ConfigureStores = configureStore({
    reducer: rootReducer,
   });
   
   export default ConfigureStores;