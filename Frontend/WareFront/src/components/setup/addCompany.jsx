import {useState} from "react"
import{useNavigate} from "react-router-dom"
import "../../cssfiles/inbound1.css"
export function AddCompany(){


const handleSubmit = async()=>{
    const navigate = useNavigate()
    const [companyName ,useCompanyName] = useState("")
    const [companyEmail,setCompanyEmail]=useState("")
    const [companyAddress,setCompanyAddress] =useState("")
    const [companyDocuments,setCompanyDocuments]=useState("")
    const [companyPhone,setCompanyPhone]=useState("")
    const [companyGSTIN ,setCompanyGSTIN] = useState("")

    const data ={
        companyName:document.getElementById("companyName").value,
        companyEmail:document.getElementById("companyEmail").value,
        companyAddress:document.getElementById("companyAddress").value,
        companyDocuments:document.getElementById("companyDocuments").files[0],
        companyPhone:document.getElementById("companyPhone").value
    }
        const response = await fetch("https://localhost:7000/api/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data
      });
      const result = response.json();
      if(result.ok){
        navigate("/Dashboard")
      }
        }

    return(

        


        <>
        <div className="outerdivform">
        <form action="" className="formCompanyRegistration" >
            <h1>Enter the Details to Register in Database</h1>
            <div className="formRows">
                <label htmlFor="companyName" >Company Name</label>
                <input type="text" id="companyName" value={companyName} onChange={(e)=>setCompanyName(e.target.value)} placeholder="Enter the name " required="true"/>    
            </div>
             <div className="formRows">
                <label htmlFor="companyAddress">Company Address</label>
                <input type="text" id="companyAddress" value={companyAddress} onChange={(e)=>setCompanyAddress(e.target.value)} placeholder="Address of the company" required="true"/>    
            </div>
             <div className="formRows">
                <label htmlFor="companyEmail">Company Email</label>
                <input type="email" id="companyEmail" value={companyEmail} onChange={(e)=>setCompanyEmail(e.target.value)} placeholder="Email of the company" required="true"/>    
            </div>
             <div className="formRows">
                <label htmlFor="companyDocuments">Company Documents PDF</label>
                <input type="file" id="companyDocuments" placeholder="Attach the Documents Required" required="true"/>    
            </div>
             <div className="formRows">
                <label htmlFor="companyPhone">Company's Phone</label>
                <input type="phone" id="companyPhone" placeholder="Phone Number of the Company" required="true"/>    
            </div>
            <div className="formRows">
                <label htmlFor="GSTIN">Company's GSTIN</label>
                <input type="number" id="GSTIN" placeholder="GSTIN Number of the Company" required="true"/>    
            </div>
             
            <button className="submitbtn">Save Details</button>
        </form>
        </div>
        </>
    )
}