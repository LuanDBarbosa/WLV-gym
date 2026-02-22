import { useState } from 'react';
import axios from "axios";
import username from "./assets/username.png"
import lock from "./assets/lock.png"
import { Link,Navigate } from 'react-router-dom';
function Login() {
	const [users, setUsers] = useState([]);
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [wrong_credential, setWrongCredential] = useState(true);
	const [redirect, setRedirect] = useState(false);
	const [show, setShow] = useState(false);

	const login = () => {
		axios.post("http://localhost:8080/Login", {
			name: name,
			password: password
		})
		.then(res =>{ setShow(false); setRedirect(true)})
		.catch(() =>{setShow(true)});
	};

	function UserChange(e){
		setShow(false);
		setName(e.target.value);
	}

	function PasswordChange(e){
		setPassword(e.target.value);
		setShow(false);
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
						<input className="Input3" type="password" placeholder="Password" value={password} onChange={PasswordChange}/>
						<img className="user_img3" src={lock} alt=""></img>
					</div>
					{show && (<p className = "CheckPassword">Username or password is incorrect.</p>)}
					<button className="cred-button" onClick={login}>Login</button>
					<p className="SendToRegisterOrLogin">Haven't got an account click <Link to="/Register">here</Link></p>
				</div>
			</>
  
  )
}

export default Login