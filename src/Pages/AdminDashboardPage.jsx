import React,{useEffect} from 'react'
import AllCategory from '../components/AdminDashboard/AllCategory'
import { useLocation, useNavigate } from "react-router-dom";


export default function AdminDashboardPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const stringifiedUser = localStorage.getItem("admin");
    const userAsObjectAgain = JSON.parse(stringifiedUser);
    if (!userAsObjectAgain) {
      navigate("/admin")
    }
  }, [])

  return (
    <>
    <AllCategory />
    </>
  )
}
