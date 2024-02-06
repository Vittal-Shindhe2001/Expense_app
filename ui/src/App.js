import React from "react"
import './App.css';
import { SpeedInsights } from "@vercel/speed-insights/next"

import Navbar from "./components/navbar"
const App = () => {
  return (
    <>
      <Navbar />
      <SpeedInsights />
    </>
  )
}

export default App