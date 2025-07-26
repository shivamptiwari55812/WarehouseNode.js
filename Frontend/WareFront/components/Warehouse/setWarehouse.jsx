import {useState} from "react"
import '../../cssfiles/warehouse.css'
export function WarehouseDetails(){
    return(
        <>
         <div class="main-content">
      <header class="dashboard-header">
        <div class="header-left">
          <h1>Register Your Warehouse!</h1>
        </div>

      </header>
         
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Warehouse Details</h2>
          <p class="card-description">
            Fill all required details for the warehouse
          </p>
        </div>
        <div class="card-content">
          <form id="warehouseForm" enctype="multipart/form-data" method="post">
            <div class="form-grid">
             
              <div class="form-group">
                <label for="WarehouseCompany_Name">Warehouse Name</label>
                <input id="WarehouseCompany_Name" type="text" required placeholder="Enter warehouse name" class="form-input"/>
                <p id="WarehouseCompanyNameError" class="error-message"></p>
              </div>
        
              
              <div class="form-group">
                <label for="WarehouseCompany_Address">Warehouse Address</label>
                <input id="WarehouseCompany_Address" type="text" required placeholder="Enter warehouse address" class="form-input"/>
                <p id="WarehouseCompanyAddressError" class="error-message"></p>
              </div>
        
              
              <div class="form-group">
                <label for="WarehouseCompany_City">Warehouse City</label>
                <input id="WarehouseCompany_City" type="text" required placeholder="Enter warehouse city" class="form-input"/>
                <p id="WarehouseCompanyCityError" class="error-message"></p>
              </div>
        
             
              <div class="form-group">
                <label for="WarehouseCompany_GSTIN">Warehouse GSTIN</label>
                <input id="WarehouseCompany_GSTIN" type="text" required placeholder="Enter GSTIN" class="form-input"/>
                <p id="WarehouseCompanyGSTINError" class="error-message"></p>
              </div>
        
              
              <div class="form-group">
                <label for="WarehouseCompany_State">Warehouse State</label>
                <input id="WarehouseCompany_State" type="text" required placeholder="Enter warehouse state" class="form-input"/>
                <p id="WarehouseCompanyStateError" class="error-message"></p>
              </div>
        
             
              <div class="form-group">
                <label for="WarehouseCompany_Pincode">Warehouse Pincode</label>
                <input id="WarehouseCompany_Pincode" type="number" required placeholder="Enter pincode" class="form-input"/>
                <p id="WarehouseCompanyPincodeError" class="error-message"></p>
              </div>
        
          
              <div class="form-group">
                <label for="WarehouseCompany_Contact">Warehouse Contact</label>
                <input id="WarehouseCompany_Contact" type="text" required placeholder="Enter contact number" class="form-input"/>
                <p id="WarehouseCompanyContactError" class="error-message"></p>
              </div>
        
              
              <div class="form-group">
                <label for="WarehouseCompany_Email">Warehouse Email</label>
                <input id="WarehouseCompany_Email" type="email" required placeholder="Enter email address" class="form-input"/>
                <p id="WarehouseCompanyEmailError" class="error-message"></p>
              </div>
        
              
              <div class="form-group">
                <label for="WarehouseCompany_Type">Warehouse Type</label>
                <select id="WarehouseCompany_Type" required>
                    <option value="">Select Type</option>
                    <option value="Shipping">Shipping</option>
                    <option value="Ecommerce">E-commerce</option>
                </select>
                <p id="WarehouseCompanyTypeError" class="error-message"></p>
            </div>
      
        
              
        
              
              <div class="form-group">
                <label for="WarehouseCompany_Layout">Upload Warehouse Layout</label>
                <input id="WarehouseCompany_Layout" type="file" class=""/>
              </div>
        
              <div class="button-group">
                <button type="button" class="cancel-button">Cancel</button>
                <button type="submit" class="save-button">Save Changes</button>
              </div>
            </div>
          </form>
        </div>
        
        </div>
      </div>
    
       </>
    )
}