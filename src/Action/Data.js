import axios from "axios";
import { ADD_QUESTION, Add_CATEGORY, GET_ALL_CATEGORIES, GET_ALL_QUESTIONS, SEND_MAIL } from "../Redux/ActionTypes";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const responseheader = {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization'
}

export const getAllCategoriesData = () => {

    return (dispatch) => {

        axios.get(`${BASE_URL}/api/getAllCategory`)
            .then((response) => {
                // console.log("resp",response.data);
                // console.log("resp",response);
                // console.log("resp",response.status)

                dispatch({
                    type: GET_ALL_CATEGORIES,
                    payload: response.data,
                    header: responseheader
                });
            })
            .catch(error => {
                console.log("error::", error);
            });
    }
}


export const addCategory = (newcategory) => {

    return (dispatch) => {

        axios.post(`${BASE_URL}/api/insertCategory`, newcategory)
            .then((response) => {

                dispatch({
                    type: Add_CATEGORY,
                    payload: response,
                    header: responseheader
                });
            })
            .catch(error => {
                console.log("error::", error);
            });
    }
}


export const addQuestion = (currentId, questions) => {

    return (dispatch) => {

        axios.post(`${BASE_URL}/api/insertData/${currentId}`, questions)
            .then((response) => {

                dispatch({
                    type: ADD_QUESTION,
                    payload: response,
                    header: responseheader
                });
            })
            .catch(error => {
                console.log("error::", error);
            });
    }
}


export const getAllQuestionsData = (cate_id) => {

    return (dispatch) => {

        axios.get(`${BASE_URL}/api/getAllData/${cate_id}`)
            .then((response) => {
                

                dispatch({
                    type: GET_ALL_QUESTIONS,
                    payload: response.data,
                    header: responseheader
                });
            })
            .catch(error => {
                console.log("error::", error);
            });
    }
}




export const sendMail = (formData) => {

    return (dispatch) => {

        axios.post(`${BASE_URL}/attachment/add`, formData)
            .then((response) => {
                
                dispatch({
                    type: SEND_MAIL,
                    payload: response,
                    header: responseheader
                });
            })
            .catch(error => {
                console.log("error::", error);
            });
    }
}
