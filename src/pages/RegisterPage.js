import React from "react";
import styled from "styled-components";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";
import { useState } from "react";
import axios from 'axios';

const RegisterPageBlock = styled.div`

  padding : 50px;

  .register-page {
    width: 360px;
    padding: 8% 0 0;
    margin: auto;
  }

  .form {
    position: relative;
    z-index: 1;
    background: #ffffff;
    max-width: 360px;
    margin: 0 auto 100px;
    padding: 45px;
    text-align: center;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  .register-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .register-form input[type="text"],
  .register-form input[type="email"],
  .register-form input[type="tel"],
  .register-form input[type="password"] {
    width: 100%;
    padding: 15px;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    background: #f2f2f2;
  }

  .register-form button {
    width: 100%;
    padding: 15px;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    background: #1D4088;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }

  .message {
    margin: 15px 0 0;
    color: #777;
    font-size: 14px;
  }

  .message a {
    color: #1D4088;
    text-decoration: none;
  }

  .message a:hover {
    text-decoration: underline;
  }
`;

const RegisterPage = () => {
  const navigate = useNavigate();
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmPassword, setNewConfirmPassword] = useState('');
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newId, setNewId] = useState(2);

  const onSubmit = e => {
    e.preventDefault();
    if (newFullName==='') alert("Full Name has left blank!");
    else if (newUsername==='') alert("Username has left blank!");
    else if (newEmail==='') alert("Email has left blank!");
    else if (newContact==='') alert("Contact has left blank!");
    else if (newPassword==='') alert("Password has left blank!");
    else if (newConfirmPassword==='') alert("Confirm Password has left blank!");
    else if (newConfirmPassword!==newPassword) alert("Confirm Password is different!");
    else {
      axios.post("/carrentalreservationsystem/getStaff.php", {value : {_id : newId, fullName : newFullName, username : newUsername, email : newEmail, contact : newContact, password : newPassword}, type : "ADD"})
        .then(res => {
          console.log(res.data);
          alert("Register Successful!\nYou can Log in to the server after the VERIFICATION from the company...");
          navigate('/');
        })
        .catch(e => console.log(e));
    }
  }

  return(
    <RegisterPageBlock>
      <div class="register-page">
        <div class="form">
          <h1>Staff Register</h1>
          <form class="register-form" onSubmit={onSubmit}>
            <input type="text" placeholder="Full Name" value={newFullName} onChange={e => setNewFullName(e.target.value)}/>
            <input type="text" placeholder="Username" value={newUsername} onChange={e => setNewUsername(e.target.value)}/>
            <input type="email" placeholder="Email" value={newEmail} onChange={e => setNewEmail(e.target.value)}/>
            <input type="tel" placeholder="Phone" value={newContact} onChange={e => setNewContact(e.target.value)}/>
            <input type="password" placeholder="Password" value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
            <input type="password" placeholder="Confirm Password" value={newConfirmPassword} onChange={e => setNewConfirmPassword(e.target.value)}/>
            <button onClick={() => onSubmit}>Register</button>
            <p class="message">Already registered? <a href="#" onClick={() => navigate('/')}>Sign In</a></p>
          </form>
        </div>
      </div>
    </RegisterPageBlock>
  );
};

export default RegisterPage;