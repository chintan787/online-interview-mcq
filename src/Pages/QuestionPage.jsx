import React from 'react'
import { useParams } from 'react-router-dom'
import AddQuestion from '../components/Questions/AddQuestion';

export default function QuestionPage() {

    const { category_name } = useParams();
    return (
        <AddQuestion />
    )
}
