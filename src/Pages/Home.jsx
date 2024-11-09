import React from 'react'
import { Link } from "react-router-dom"
import NavBar from '../Components/NavBar'
import LocationInput from '../Components/LocationInput'
import Stats from "../assets/stats.png"
import "../App.css"

const Home = () => {
  return (
    <div className="h-[100vh] max-h-[100vh] homebg">
  <NavBar />
  <div className="overlay">  {/* Add a semitransparent overlay */}
    <p className="mt-[10%] text-5xl text-white font-semibold ml-40 mb-4 text-shadow-lg">Report, View, or Discuss Local Problems</p>
    <p className="ml-40 text-gray-50 italic text-2xl text-shadow-md">(Street Lighting, falling tree, abandoned car)</p>
    <Link to="/submit-request">
      <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg px-12 py-4 text-center me-2 mb-2 mt-20 text-2xl ml-40">Report Problem</button>
    </Link>
  </div>
  {/* <LocationInput /> */}
</div>
  )
}

export default Home