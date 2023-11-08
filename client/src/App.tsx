import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import "./styles/global.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
