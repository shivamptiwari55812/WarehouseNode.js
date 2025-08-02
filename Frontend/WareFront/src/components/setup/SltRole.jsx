import { useState } from "react";
import "../../cssfiles/roles.css"
export function Roles(){
    return(
        <>
        <div className="selectroles">
            
            <form action="" className="formroles">
                <label htmlFor="Roles" id="roleshead">Select Role you want to create</label>
                <select name="Roles" id="selectbtn">
                    <option value="InboundStaff">Inbound Staff</option>
                    <option value="OutboundStaff">Outbound Staff</option>
                    <option value="Manager">Manager</option>
                    <option value="DataOperator">DataOperator</option>
                </select>
                <label htmlFor="username">User Name</label>
                <input type="text" id="username"/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" />

                <button id="submitbtn">Add Role</button>
            </form>
        </div>
        </>
    )
}