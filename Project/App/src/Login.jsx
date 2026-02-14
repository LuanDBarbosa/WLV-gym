import {useState} from 'react';
import username from "./assets/username.png"
import lock from "./assets/lock.png"
import { Link } from 'react-router-dom';
function Login() {
  const [name, setName] = useState("");
	function InputChange(e){
		setName(e.target.value);
	}
	return (<div>
				<h3>Login</h3>
				<div>
					<input className="Input4" type="username" placeholder="Username or Email" value={name} onChange={InputChange}/>
					<img className="user_img4" src={username} alt=""></img>
				</div>
				<br/>
				<div>
					<input className="Input3" type="password" placeholder="Password" value={name} onChange={InputChange}/>
					<img className="user_img3" src={lock} alt=""></img>
				</div>
				<button className="cred-button">Login</button>
				<p className="SendToRegisterOrLogin">Haven't got an account click <Link to="/Register">here</Link></p>
			</div>
  
  )
}

export default Login