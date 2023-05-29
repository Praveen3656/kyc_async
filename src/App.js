import logo from "./logo.svg";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import Liveface from "./Components/Dashboard/LiveFace";
import Uploadselfieid from "./Components/LiveWebCheck/UploadSelfieid";
import Test from "./Test";
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/LiveFace" element={<Liveface />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/Uploadselfieid" element={<Uploadselfieid />} />
      <Route exact path="/dashboard/uid=:uid/data=:data" element={<Dashboard />} />4
      <Route exact path="/Test" element={<Test />} />
    </Routes>
  );
}

export default App;
