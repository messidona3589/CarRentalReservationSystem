import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";
import axios from 'axios';

const LoginPageBlock = styled.div`

  .login-page {
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

  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .login-form input[type="text"],
  .login-form input[type="password"] {
    width: 100%;
    padding: 15px;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    background: #f2f2f2;
  }

  .login-form button {
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

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = e => {
    e.preventDefault();
    if (username==='') alert("Username has left Blank!");
    else if (password==='') alert("password has left Blank!");
    else {
      axios.post("/carrentalreservationsystem/getStaff.php", {value : {username : username, password : password}, type : "LOGIN"})
        .then(res => {
          if (res.data.Status==='200'){
            navigate(`/home/${res.data.fullName}`);
          } else {
            alert("Invalid User");
            setUsername('');
            setPassword('');
          }
        })
        .catch(e => {
          console.log(e);
        });
    };
  }

  return (
    <LoginPageBlock>
      <div class="login-page">
      <div class="form">
        <h1>Staff Login</h1>
        <form class="login-form" onSubmit={onSubmit}>
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
          <button>Login</button>
          <p class="message">Not registered? <a href="#" onClick={() => navigate('/register')}>Create an account</a></p>
        </form>
      </div>
    </div>
    </LoginPageBlock>
  );
}

export default LoginPage;