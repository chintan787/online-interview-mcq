import { Add_CATEGORY,GET_ALL_CATEGORIES ,ADD_QUESTION ,GET_ALL_QUESTIONS ,SEND_MAIL} from "../Redux/ActionTypes";


const intialAddCategoryState = {
    addCategory : [],
}
const intialGetAllCategoryState = {
    getallCategories : [],
}
const intialaddQuestionState = {
    addQue : [],
}

const intialgetAllQuestionsState = {
    allQuestions : [],
}

const intialMailState = {
    mail : [],
}



export const AddCategoryReducer = (state = intialAddCategoryState, action) => {
    switch (action.type) {

        case Add_CATEGORY:
            return {
                addCategory: action.payload.data,
                error:action.payload.data
            }
       
        default: return state
    }
}

export const GetAllCategoriesReducer = (state = intialGetAllCategoryState, action) => {
    switch (action.type) {

        case GET_ALL_CATEGORIES:
            return {
                getallCategories: action.payload.data,
                error:action.payload.data
            }
       
        default: return state
    }
}

export const AddQuestionReducer = (state = intialaddQuestionState, action) => {
    switch (action.type) {

        case ADD_QUESTION:
            return {
                addQue: action.payload.data,
                error:action.payload.data
            }
       
        default: return state
    }
}


export const GetAllQuestionsReducer = (state = intialgetAllQuestionsState, action) => {
    switch (action.type) {

        case GET_ALL_QUESTIONS:
            return {
                allQuestions: action.payload.data,
                error:action.payload.data
            }
       
        default: return state
    }
}


export const SendMailReducer = (state = intialMailState, action) => {
    switch (action.type) {

        case SEND_MAIL:
            return {
                mail: action.payload.data,
                error:action.payload.data
            }
       
        default: return state
    }
}