import Register from "./Register.jsx"
import Login from "./Login.jsx"
import Home from "./Home.jsx"
import { Routes, Route,BrowserRouter } from 'react-router-dom';

function App() {
	document.title = "Student Hub"
	return (
	  <>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Register/>} />
				<Route path="/Login" element={<Login/>} />
				<Route path="/Register" element={<Register/>} />
				<Route path="/Home" element={<Home/>} />
			</Routes>
		</BrowserRouter>
	  </>
  
  )
}

export default App