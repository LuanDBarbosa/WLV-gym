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
				<div>
					<h3>Login</h3>
					<div>
						<input className="Input4" type="text" placeholder="Username or Email" value={name} onChange={UserChange}/>
						<img className="user_img4" src={username} alt=""></img>
					</div>
					<br/>
					<div>
						<input className="Input3" type={passwordState} placeholder="Password" value={password} onChange={PasswordChange}/>
						<button className = "img4" onClick = {PasswordStateChange}><img className = "img5" src={image} alt=""></img></button>
					</div>
					{show && (<p className = "CheckPassword">Username or password is incorrect.</p>)}
					<button className="cred-button" onClick={login}>Login</button>
					<p className="SendToRegisterOrLogin">Haven't got an account click <Link to="/Register">here</Link></p>
				</div>
			</>
  
  )
}

export default Login