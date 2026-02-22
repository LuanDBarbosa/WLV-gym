import { useState, useEffect } from "react";
import axios from "axios";
import User from "./assets/username.png"
import Email from "./assets/email.png"
import lock from "./assets/lock.png"
import Login from "./Login.jsx"
import { Link,Navigate} from 'react-router-dom';

function Register() {
	const [users, setUsers] = useState([]);
	const [username, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [usernameTaken, setUsernameTaken] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const [validEmail, setValidEmail] = useState(false);
	const [newEmail, setNewEmail] = useState(false);
	const [passwordLength, setPasswordLength] = useState(false);

	useEffect(() => {
	  axios.get("http://localhost:8080/users")
		.then(res => {
		  setUsers(res.data);
		})
		.catch(err => console.log(err));
	}, []);

	const addUser = () => {
		if(!usernameTaken && !validEmail && !newEmail && !passwordLength && username !== "" && email !== "" && password !== ""){
			axios.post("http://localhost:8080/users", { username, email,password})
				.then(res => {
				setUsers([...users, { username, email,password }]);
				setRedirect(true);
				})
				.catch(err => console.log(err));
			};
		}

	function UserChange(e){
		setUserName(e.target.value);
		const exists = users.some(u => u.username === e.target.value);
		setUsernameTaken(exists);
	}
	function EmailChange(e){
		const value = e.target.value;
		const exists = users.some(u => u.email === value) && value !== "";
		setEmail(value);
		setNewEmail(exists);

		const lastTen = value.slice(-10);
		if (lastTen !== "@wlv.ac.uk" && value !== "") {
			setValidEmail(true);
		} else {
			setValidEmail(false);
		}

	}
	function PasswordChange(e){
		const value = e.target.value;
		setPassword(value);
		if (value.length < 8 && value !== ""){
			setPasswordLength(true);
		}else{
			setPasswordLength(false);
		}
	}

	return (<>
				{redirect && <Navigate to="/Login" />}

				<div>
					<h4>Registration</h4>
					<div>
						<input className="Input" type="text" placeholder="Username" value={username} onChange={UserChange}/>
						<img className="user_img" src={User} alt=""></img>
						{usernameTaken && (<p className = "CheckUsername">Username already taken</p>)}
					</div>
					<br/>
					<div>
						<input className="Input2" type="text" placeholder="Email" value={email} onChange={EmailChange}/>
						<img className="user_img2" src={Email} alt=""></img>
						{validEmail && (<p className = "CheckEmail">Email must be your school account.</p>)}
						{newEmail && (<p className = "CheckEmail">This email already belongs to an existing account.</p>)}
					</div>
					<br/>
					<div>
						<input className="Input3" type="password" placeholder="Password" value={password} onChange={PasswordChange}/>
						<img className="user_img3" src={lock} alt=""></img>
						{passwordLength && (<p className = "CheckPassword">Password must be 8 characters or more.</p>)}
					</div>
					<button className="cred-button" onClick={addUser}>Register</button>
					<p className="SendToRegisterOrLogin">Already got an account click <Link to="/Login">here</Link></p>
				</div>
			</>

  
  )
}

export default Register