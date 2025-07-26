import { useState } from 'react'

import{createBrowserRouter, RouterProvider} from "react-router-dom"

import {Dashboard} from "../components/Warehouse/Dashboard.jsx"
import { Header1 } from '../components/Warehouse/header.jsx'
import {Roles} from "../components/setup/SltRole.jsx"
import { AddCompany } from '../components/setup/addCompany.jsx'
import {WarehouseDetails} from "../components/Warehouse/setWarehouse.jsx"
function DashboardLayout(){
  return(
    <>
    <Header1/>
    <Dashboard/>
    </>
  )
}
function Roles1(){
  return(
    <>
    <Header1/>
    <Roles/>
    </>
  )

}
const router = createBrowserRouter([
  {
    path:"/Dashboard",
    element: <DashboardLayout/>
  },
   
   {
    path:"/header",
    element: <Header1/>
  },
  {
    path:"/roles",
    element:<Roles1/>
  },
  {
    path:"/inboundCompanyDetails",
    element:<AddCompany/>
  },
  {
    path:'/',
    element:<WarehouseDetails/>
  }
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
