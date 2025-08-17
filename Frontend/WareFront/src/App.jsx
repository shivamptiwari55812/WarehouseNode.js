import { useState } from 'react'

import{createBrowserRouter, RouterProvider} from "react-router-dom"
import  Landing from './components/setup/Landing.jsx'
import Login from './components/setup/Login.jsx'
import SignUp from './components/setup/SignUp.jsx'
import Verify from './components/setup/verify.jsx'
import PrivacyPolicy from './components/setup/PrivacyPolicy';
import TermsOfService from './components/setup/TermsOfService';
import {Dashboard} from "./components/Warehouse/Dashboard.jsx"
import { Header1 } from './components/Warehouse/header.jsx'
import {Roles} from "./components/setup/SltRole.jsx"
import { AddCompany } from './components/setup/addCompany.jsx'
import {WarehouseDetails} from "./components/Warehouse/setWarehouse.jsx"
import { Orderplacement } from './components/inbound/OrderPlacement.jsx'
import OrderManagement from './components/inbound/OrderManagement.jsx'
function DashboardLayout(){
  return(
    <>
    <Header1/>
    <Dashboard/>
    </>
  )
}

function OrderManagement1(){
  return(
    <>
    <Header1/>
    <OrderManagement/>
    </>
  )
}

function OrderPage(){
  return(
    <>
    <Header1/>
    <Orderplacement/>
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
  function AddCompany1(){
    return(
      <>
      <Header1/>
      <AddCompany/>
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
    path:"/Login",
    element: <Login/>
  },
  {
    path:"/SignUp",
    element: <SignUp/>
  },
  {
    path:"/verify",
    element: <Verify/>
  },
  {
    path:"/TermsOfService",
    element: <TermsOfService/>
  },
  {
    path:"/PrivacyPolicy",
    element: <PrivacyPolicy/>
  },
  {
    path:"/orderPlacement",
    element: <OrderPage/>
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
    element:<AddCompany1/>
  },
  {
    path:"/orderManagement",
    element:<OrderManagement1/>
  },
  {
    path:'/warehouseDetails',
    element:<WarehouseDetails/>
  }
])

function App() {
  
  const [count, setCount] = useState(0)
  localStorage.getItem("token")

  return (
    
   
    
    <div>
<RouterProvider router ={router}/>
    </div>
     
  )
}

export default App
