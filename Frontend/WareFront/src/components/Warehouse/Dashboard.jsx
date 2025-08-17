import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export function Dashboard(){
    console.log(localStorage.getItem('token'))
    
    return(
        <>
        <h1>Dashboard Page</h1>
        </>
    )
}
export default Dashboard;