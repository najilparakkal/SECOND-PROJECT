import "./index.css";
import {  Routes, Route } from "react-router-dom";

import UserRouter from "./routers/UserRouter";
import OuterPage from "./pages/outerPage/OuterPage";
import VendorRouter from "./routers/VendorRouter";

function App() {
  return (
    <>
      
        <Routes>
        <Route path="/" element={< OuterPage />} />

          <Route path="/*" element={< UserRouter/>} />
          <Route path="/vendor/*" element={< VendorRouter/>} />
          
          
        </Routes>
     
    </>
  );
}
export default App;
