import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './pages/user/authotications/Signup';
import Otp from "./pages/user/authotications/Otp";
import Home from "./pages/user/homePage/Home";
import Login from "./pages/user/authotications/Login";

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}
export default App;
