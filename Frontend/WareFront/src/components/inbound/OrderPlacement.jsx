import { useState } from "react";
import '../../cssfiles/inbound1.css'





export function Orderplacement(){


    const [companyName, setcompanyName] = useState("");
    const [productquantity, setproductquantity] = useState("");
    const [attachPDF, setAttachPDF] = useState(false);
    const [pdfFile, setPdfFile] = useState(null);

    const handleSubmit = async(e)=>{
        
        e.preventDefault();
        const response = await fetch("https://localhost:6000/api/sendOrder",{
            method:"POST",
            header:{
                "Content-Type":"Application-json"
            },
            body:{}
        })
    }




return(
    <>
<div className="orderPlacement">
    <form action="" id="orderPlacementform">
    <h1>Order Placement</h1>
    <div className="innerOrder">
        <div className="rowsOrder">
            <label htmlFor="companyName">Company Name</label>
            <input type="text" value={companyName} id="companyName" onChange={(e)=>setcompanyName(e.target.value)}/>
        </div>
         <div className="rowsOrder">
            <label htmlFor="productquantity">Product Quantity</label>
            <input type="Number" value={productquantity} id="productquantity" onChange={(e)=>setproductquantity(e.target.value)}/>
        </div>
        <div>
         <div className="rowsOrder">
                        <label>Want to attach PDF?</label>
                        <input
                            type="radio"
                            name="attachPDF"
                            value="yes"
                            onChange={() => setAttachPDF(true)}
                        /> Yes
                        <input
                            type="radio"
                            name="attachPDF"
                            value="no"
                            onChange={() => setAttachPDF(false)}
                            defaultChecked
                        /> No
                    </div>

                    {attachPDF && (
                        <div className="rowsOrder">
                            <label htmlFor="pdfFile">Upload PDF</label>
                            <input
                                type="file"
                                id="pdfFile"
                                accept="application/pdf"
                                onChange={(e) => setPdfFile(e.target.files[0])}
                            />
                        </div>
                    )}
        </div>
    </div>
    <button className="submitbtn">Place Order</button>
    </form>
</div>

    </>
)
    
}