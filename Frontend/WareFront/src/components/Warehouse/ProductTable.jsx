import {useState} from "react"
import { useNavigate } from 'react-router-dom';

export function ProductTable(){
    return (
        <>
        <div class="tablecontainer" ></div>
        <table id="productTable">
            <thead>
                <tr>
                    
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>TransactionType</th>
                    <th>No of Rejected Product</th>
                    <th>Edit/delete</th>
                </tr>
            </thead>
            <tbody id="tablebody">
              
            </tbody>
        </table>
        </>
    )
}