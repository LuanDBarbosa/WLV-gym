import {useState} from 'react';
import username from "./assets/username.png"
import email from "./assets/email.png"
import lock from "./assets/lock.png"
import Login from "./Login.jsx"
import { Link } from 'react-router-dom';
function Register() {
	const [name, setName] = useState("");
	function InputChange(e){
		setName(e.target.value);
	}
	return (<div>
				<h2>Registration</h2>
				<div>
					<input className="Input" type="username" placeholder="Username" value={name} onChange={InputChange}/>
					<img className="user_img" src={username} alt=""></img>
				</div>
				<br/>
				<div>
					<input className="Input2" type="email" placeholder="Email" value={name} onChange={InputChange}/>
					<img className="user_img2" src={email} alt=""></img>
				</div>
				<br/>
				<div>
					<input className="Input3" type="password" placeholder="Password" value={name} onChange={InputChange}/>
					<img className="user_img3" src={lock} alt=""></img>
				</div>
				<button className="cred-button">Register</button>
				<p className="SendToRegisterOrLogin">Already got an account click <Link to="/Login">here</Link></p>
			</div>
  
  )
}

export default Register