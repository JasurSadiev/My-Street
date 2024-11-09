import React from 'react'
import NavBar from '../Components/NavBar'
import Stats from "../assets/stats.png"

const OfficialsDashboard = () => {
  return (
    <div className='h-[100vh] max-h-[100vh] homebg'>
      <NavBar />
      <img src={Stats} className='h-[400px] absolute top-[30%] left-[50%] translate-x-[-50%]' alt="" />
      {/* <span class="text-transparent absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-160%] bg-clip-text bg-gradient-to-r to-blue-500 from-white text-8xl font-semibold text-center">COMING SOON!</span>  */}
    </div>
  )
}

export default OfficialsDashboard