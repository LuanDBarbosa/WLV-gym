import { useState, useEffect } from "react";
import axios from "axios";
import User from "./assets/username.png"
import Email from "./assets/email.png"
import lock from "./assets/lock.png"
import OpenLock from "./assets/Openlock.png"
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
	const [passwordState, setPasswordState] = useState("password");
	const [image, setShowImage] = useState(lock);
	const [count, setCount] = useState(0);

	useEffect(() => {
	  axios.get("/api/get_users.php")
		.then(res => {
		  setUsers(res.data);
		})
		.catch(err => console.log(err));
	}, []);

	const addUser = () => {
		if(!usernameTaken && !validEmail && !newEmail && !passwordLength && username !== "" && email !== "" && password !== ""){
			axios.post("/api/register.php", { username, email,password})
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
				{redirect && <Navigate to="/Login" />}

				<div className="auth-container">
					<div className="auth-card">
						<h2 className="auth-title">Registration</h2>
						
						<div className="auth-input-group">
							<input className="auth-input" type="text" placeholder="Student Number" value={username} onChange={UserChange}/>
							<img className="auth-icon" src={User} alt="User Icon" />
						</div>
						{usernameTaken && (<p className="auth-error">Student number already taken</p>)}
						
						<div className="auth-input-group">
							<input className="auth-input" type="text" placeholder="Email" value={email} onChange={EmailChange}/>
							<img className="auth-icon" src={Email} alt="Email Icon" />
						</div>
						{validEmail && (<p className="auth-error">Email must be your school account.</p>)}
						{newEmail && (<p className="auth-error">This email already belongs to an existing account.</p>)}
						
						<div className="auth-input-group">
							<input className="auth-input" type={passwordState} placeholder="Password" value={password} onChange={PasswordChange}/>
							<button type="button" className="auth-icon-button" onClick={PasswordStateChange}>
								<img src={image} alt="Toggle Password Visibility" />
							</button>
						</div>
						{passwordLength && (<p className="auth-error">Password must be 8 characters or more.</p>)}
						
						<button className="auth-button" onClick={addUser}>Register</button>
						<p className="auth-footer">Already got an account? Click <Link to="/Login">here</Link></p>
					</div>
				</div>
			</>

  
  )
}

export default Register