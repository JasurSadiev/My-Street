import React from 'react'
import "../App.css"
import OpenBudgetImage from "../assets/open\ budget.png"
import NavBar from '../Components/NavBar'

const OpenBudget = () => {
  return (
    <div className='min-h-[100vh] h-[100vh] w-full openBudget'>
        <NavBar />
        <img src={OpenBudgetImage} alt="" className='max-h-[90vh] min-w-[100vw]' />
    </div>
  )
}

export default OpenBudget