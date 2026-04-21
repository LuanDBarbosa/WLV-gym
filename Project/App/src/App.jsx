import { useEffect } from "react";
import Register from "./Register.jsx"
import Login from "./Login.jsx"
import Home from "./Home.jsx"
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import icon from "./assets/Icon.png"
function App() {
  useEffect(() => {
    document.title = "Student Hub";
    const link = document.querySelector("link[rel~='icon']");
    if (link) {
      link.href = icon;
    } else {
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.href = icon;
      document.head.appendChild(newLink);
    }
  }, []);
  return (
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Register/>} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/Register" element={<Register/>} />
            <Route path="/Home" element={<Home/>} />
            </Routes>
        </BrowserRouter>
  )
}

export default App