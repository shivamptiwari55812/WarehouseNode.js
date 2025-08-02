import { useState } from "react";
import '../../cssfiles/inbound1.css'





export function Orderplacement(){
return(
    <>
<div className="orderPlacement">
    <form action="" id="orderPlacementform">
    <h1>Order Placement</h1>
    <div className="innerOrder">
        <div className="rowsOrder">
            <label htmlFor="companyName">Company Name</label>
            <input type="text" id="companyName" />
        </div>
         <div className="rowsOrder">
            <label htmlFor="productquantity">Product Quantity</label>
            <input type="Number" id="productquantity"/>
        </div>
        <label htmlFor="PDFattached">Want to attach PDF?</label>
        <input type="radio" id="PDFattached?"/>
    </div>
    <button className="submitbtn">Place Order</button>
    </form>
</div>

    </>
)
    
}