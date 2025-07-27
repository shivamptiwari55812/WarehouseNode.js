import { useState } from 'react'
// import './App.css'
import{createBrowserRouter, RouterProvider} from "react-router-dom"
import {Dashboard} from "../components/Dashboard.jsx"
import { Header1 } from '../components/header.jsx'
import  Landing from '../components/Landing.jsx'

function DashboardLayout(){
  return(
    <>
    <Header1/>
    <Dashboard/>
    </>
  )
}
const router = createBrowserRouter([
  {
    path:"/Dashboard",
    element: <DashboardLayout/>
  },
   {
    path:"/",
    element: <Landing/>
  },
   {
    path:"/header",
    element: <Header1/>
  },
])

function App() {
  
  const [count, setCount] = useState(0)

  return (
    
   
    
    <div>
<RouterProvider router ={router}/>
    </div>
     
  )
}

export default App
