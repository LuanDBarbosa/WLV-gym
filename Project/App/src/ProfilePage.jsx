import { User, Mail, Book, Lock, Edit2 } from "lucide-react";
import { useState, useEffect } from 'react'
import axios from "axios";

export default function ProfilePage({ onBack, user, allUsers }) {
  const root = document.documentElement;
  const styles = getComputedStyle(root);
  const [isDark,setIsDark] = useState(false);
  const [displayUser,setDisplayUser] = useState(user?.username || "Guest");
  const [displayEmail,setDisplayEmail] = useState("guest");
  const [displayCourse,setDisplayCourse] = useState("Computer Science BSc");
  const [displayPassword,setDisplayPassword] = useState("");
  const initials = displayUser.charAt(0).toUpperCase();
  const [show, setShow] = useState(false);
  const [fixed,setFixed] = useState(true);
  const [invalid,setInvalid] = useState(false);
  const [invalidUsername,setInvalidUsername] = useState(false);
  const [invalidEmail,setInvalidEmail] = useState(false);
  const [invalidPassword,setInvalidPassword] = useState(false);
  const [count,setCount] = useState(0);
  useEffect(() => {
      if (styles.getPropertyValue("--background").trim() == "white"){
          setCount(0);
          setIsDark(false);
      }else{
          setCount(1);
          setIsDark(true);
      }
      
  }, []);

  const update = () => {
      if (displayUser== "" || displayEmail == "" || displayPassword == "" || displayCourse == ""){
          setInvalid(true);
      }
	  if(!invalidUsername && !invalidEmail && !invalidPassword && displayUser!== "" && displayEmail !== "" && displayPassword !== ""){
		axios.post("/api/update.php", {displayUser, displayEmail, displayPassword})
			.then(res => {
				setShow(false);
                setFixed(true);
			})
			.catch(err => console.log(err));
		};
  }

  function DarkMode(){
      setCount(count+1);
      if (count % 2 !== 0){
        root.style.setProperty('--primary-color', '#0f766e');
        root.style.setProperty('--bg-color', '#f8fafc');
        root.style.setProperty('--card-bg', '#ffffff');
        root.style.setProperty('--background', 'white');
        root.style.setProperty('--text-main', '#1e293b');
        root.style.setProperty('--secondary-color', '#475569');
        root.style.setProperty('--text-muted', '#64748b');
        root.style.setProperty('--library-color', 'hsl(1, 1%, 90%)');
        root.style.setProperty('--icon-color', '#f1f5f9');
        setIsDark(false);
      }else{
        root.style.setProperty('--primary-color', '#20b2aa');
        root.style.setProperty('--card-bg', '#333333');
        root.style.setProperty('--bg-color', '#1f1f1f');
        root.style.setProperty('--background', '#474747');
        root.style.setProperty('--text-main', '#f5f5f5');
        root.style.setProperty('--secondary-color', '#f5f5f5');
        root.style.setProperty('--text-muted', '#f5f5f5');
        root.style.setProperty('--library-color', '#333333');
        root.style.setProperty('--icon-color', '#333333');
        setIsDark(true);
      }
  }

  function ChangeInfo(){
      setShow(true);
      setFixed(false);
  }

  function StudentNumChange(e){
      const value = e.target.value;
      if (value.length == 1){
          setInvalid(false);
      }
      setDisplayUser(value);
      const exists = allUsers.some(u => u.username === value);
      setInvalidUsername(exists);
  }

  function EmailChange(e){
      const value = e.target.value;
      if (value.length == 1){
          setInvalid(false);
      }

      setDisplayEmail(value);
      const exists = allUsers.some(u => u.username === value);
      setInvalidEmail(exists);
      const lastTen = value.slice(-10);
	  if (lastTen !== "@wlv.ac.uk") {
          setInvalidEmail(true);
      }
  }
  function CourseChange(e){
      const value = e.target.value;
      setDisplayCourse(value);
      if (value.length == 1){
          setInvalid(false);
      }
  }

  function PasswordChange(e){
      const value = e.target.value;
      if (value.length == 1){
          setInvalid(false);
      }
	  setDisplayPassword(value);
	  if (value.length < 8 && value !== ""){
         setInvalidPassword(true);
	  }else{
		  setInvalidPassword(false);
	  }
  }

  return (
    <div className="sub-page-container">
      <button className="back-btn" onClick={onBack}>← Back to Hub</button>
      
      <div className="page-header">
        <h1 className="page-title">Student Profile</h1>
      </div>

      <div className="profile-layout">
        <div className="profile-sidebar">
          <div className="profile-avatar-large">
            <span>{initials}</span>
            <button className="edit-avatar-btn">
              <Edit2 size={16}/>
            </button>
          </div>
          <h2 className="profile-name">{displayUser}</h2>
          <p className="profile-role">Computer Science BSc (Hons)</p>
          <span className="status-badge status-green">Enrolled</span>
        </div>

        <div className="profile-content">
          <div className="section">
            <div className="section-header-flex">
               <h2>Account Information</h2>
               <button className="text-btn flex-center gap-sm" onClick={ChangeInfo}>
                 <Edit2 size={14} /> Edit
               </button>
            </div>
            
            <table className="info-table profile-table">
              <tbody>
                <tr>
                  <td className="icon-col"><User size={20} color="var(--primary-color)" /></td>
                  <td className="label-col">Student Number</td>
                  {fixed && <td className="value-col">{displayUser}</td>}
                  {show && <td><input className="value-col" type = "text" value = {displayUser} onChange = {StudentNumChange} style={{ fontSize: '1.05rem'}}/></td>}
                </tr>
                <tr>
                  <td className="icon-col"><Mail size={20} color="var(--primary-color)" /></td>
                  <td className="label-col">Email</td>
                  {fixed && <td className="value-col">{user?.email || displayEmail}</td>}
                  {show && <td><input className="value-col" type = "text" value = {displayEmail} onChange = {EmailChange} style={{ fontSize: '1.05rem'}}/></td>}
                </tr>
                <tr>
                  <td className="icon-col"><Book size={20} color="var(--primary-color)" /></td>
                  <td className="label-col">Course Name</td>
                  {fixed && <td className="value-col">{user?.course || displayCourse}</td>}
                  {show && <td><input className="value-col" type = "text" value = {displayCourse} onChange = {CourseChange} style={{ fontSize: '1.05rem'}}/></td>}
                </tr>
                <tr>
                  <td className="icon-col"><Lock size={20} color="var(--primary-color)" /></td>
                  <td className="label-col">Password</td>
                  {fixed && <td className="value-col"><span className="obscured-password">••••••••••••</span></td>}
                  {show && <td><input className="value-col" type = "password" value = {displayPassword} onChange = {PasswordChange} style={{ fontSize: '1.05rem'}}/></td>}
                </tr>
               </tbody>
            </table>
            {show && <button className="action-btn outline small ml-auto" onClick = {update}>Change</button>}
            {invalid && (<p className="auth-error">Enter valid details.</p>)}
            {invalidUsername && (<p className="auth-error">Username already taken.</p>)}
            {invalidEmail && (<p className="auth-error">Needs to be a school account and linked to one account only.</p>)}
            {invalidPassword && (<p className="auth-error">Password must be 8 characters or more.</p>)}
          </div>

          <div className="section">
            <h2>System Preferences</h2>
            <div className="preferences-grid">
               <div className="preference-item">
                  <div className="pref-info">
                     <h3>Email Notifications</h3>
                     <p>Receive weekly updates and alerts.</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
               </div>
               <div className="preference-item">
                  <div className="pref-info">
                     <h3>Dark Mode</h3>
                     <p>Use dark theme for the interface.</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked = {isDark} onChange = {DarkMode}/>
                    <span className="slider round"></span>
                  </label>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
