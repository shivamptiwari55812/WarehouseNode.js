import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import Landing from './components/setup/Landing.jsx';
import Login from './components/setup/Login.jsx';
import SignUp from './components/setup/SignUp.jsx';
import Verify from './components/setup/verify.jsx';
import PrivacyPolicy from './components/setup/PrivacyPolicy.jsx';
import TermsOfService from './components/setup/TermsOfService.jsx';
import { Dashboard } from "./components/Warehouse/Dashboard.jsx";
import { Header1 } from './components/Warehouse/header.jsx';
import { Roles } from "./components/setup/SltRole.jsx";
import { AddCompany } from './components/setup/addCompany.jsx';
import { WarehouseDetails } from "./components/Warehouse/setWarehouse.jsx";
import { Orderplacement } from './components/inbound/OrderPlacement.jsx';
import OrderManagement from './components/inbound/OrderManagement.jsx';
import AnnualReports from "./components/reports/AnnualReports.jsx";
import Bills from "./components/reports/Bills.jsx";
import BarcodeScanner from "./components/setup/ScannerQR.tsx";
import InventoryManagement from './components/Warehouse/InventoryManagement.jsx';
import AddReport from './components/reports/AddReport.jsx';
import AdminPanel from "./components/Warehouse/AdminPanel.jsx";
import LocationMap  from "./components/Warehouse/Layout.jsx";

// Layout for pages with Header
function AuthLayout({ children }) {
  return (
    <>
      <Header1 />
      {children}
    </>
  );
}
function QrScanner({}){
  return(
    <>
      <BarcodeScanner />
    </>
  )
}

// Router setup
const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/verify", element: <Verify /> },
  { path: "/terms-of-service", element: <TermsOfService /> },
  { path: "/privacy-policy", element: <PrivacyPolicy /> },
  {path:"/qr-scanner",element:<QrScanner/>},
  {path:"/setWarehouse",element:<WarehouseDetails/>},
  { path: "/add-report", element: <AuthLayout><AddReport /></AuthLayout> },
  {path:"/layout",element:<LocationMap />},


  // Authenticated pages
  { path: "/dashboard", element: <AuthLayout><Dashboard /></AuthLayout> },
  { path: "/inventory-management", element: <AuthLayout><InventoryManagement /></AuthLayout> },
  
  { path: "/order-placement", element: <AuthLayout><Orderplacement /></AuthLayout> },
  { path: "/order-management", element: <AuthLayout><OrderManagement /></AuthLayout> },
  { path: "/roles", element: <AuthLayout><Roles /></AuthLayout> },
  { path: "/inbound-company-details", element: <AuthLayout><AddCompany /></AuthLayout> },
  { path: "/annual-reports", element: <AuthLayout><AnnualReports /></AuthLayout> },
  { path: "/bills", element: <AuthLayout><Bills /></AuthLayout> },

 { path: "/admin-panel", element: <AdminPanel /> },

  // 404 fallback
  { path: "*", element: <div>Page Not Found</div> }
]);

function App() {
  // Optional: check token
  const token = localStorage.getItem("token");

  return <RouterProvider router={router} />;
}

export default App;
