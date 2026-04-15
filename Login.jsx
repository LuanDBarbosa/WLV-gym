import { useState } from 'react';
import axios from "axios";
import username from "./assets/username.png"
import lock from "./assets/lock.png"
import OpenLock from "./assets/Openlock.png"
import { Link,Navigate } from 'react-router-dom';
function Login() {
	const [users, setUsers] = useState([]);
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [wrong_credential, setWrongCredential] = useState(true);
	const [redirect, setRedirect] = useState(false);
	const [show, setShow] = useState(false);
	const [passwordState, setPasswordState] = useState("password");
	const [image, setShowImage] = useState(lock);
	const [count, setCount] = useState(0);

	const login = async () => {
		try {
			const res = await axios.post("/api/login.php", { name, password });
			const data = res?.data;

			if (!data) {
			  alert("Server did not return valid response");
			  return;
			}

			if (data.success) {
				localStorage.setItem("username", name);
				sessionStorage.setItem('user', JSON.stringify({name, password}));
				setShow(false);
				setRedirect(true);
			// Redirect, save token, etc.
			} else {
				setShow(true);
			}
		} catch (err) {
			console.error(err);
			alert("Network error or server down");
		}
};

	function UserChange(e){
		setShow(false);
		setName(e.target.value);
	}

	function PasswordChange(e){
		setPassword(e.target.value);
		setShow(false);
	}
	
	function  PasswordStateChange(){
		setCount(prev => prev + 1);
		const newCount = count + 1;
		if (newCount % 2 !== 0){
			setShowImage(OpenLock);
			setPasswordState("text");
		}
		else{
			setShowImage(lock);
			setPasswordState("password");
		}
	}

	return (<>
				{redirect && <Navigate to="/Home" />}
				<div className="auth-container">
					<div className="auth-card">
						<h2 className="auth-title">Login</h2>
						
						<div className="auth-input-group">
							<input className="auth-input" type="text" placeholder="Student Number or Email" value={name} onChange={UserChange}/>
							<img className="auth-icon" src={username} alt="User Icon" />
						</div>
						
						<div className="auth-input-group">
							<input className="auth-input" type={passwordState} placeholder="Password" value={password} onChange={PasswordChange}/>
							<button type="button" className="auth-icon-button" onClick={PasswordStateChange}>
								<img src={image} alt="Toggle Password Visibility" />
							</button>
						</div>
						
						{show && (<p className="auth-error">Student number or password is incorrect.</p>)}
						
						<button className="auth-button" onClick={login}>Login</button>
						<p className="auth-footer">Haven't got an account? Click <Link to="/Register">here</Link></p>
					</div>
				</div>
			</>
  
  )
}

export default Login