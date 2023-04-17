import styled from "styled-components";
import axios from 'axios';
import {useState, useEffect} from 'react';
import { useParams } from "react-router";
import Loading from "../components/common/Loading";


const ProfilePageBlock = styled.div`
  background : url(https://img.freepik.com/free-vector/realistic-car-headlights-ad-composition-headlights-with-green-purple-illumination_1284-56577.jpg?w=1380&t=st=1681632100~exp=1681632700~hmac=a12f1547272e0f596ff4b1b0e6f93f520821aa082ed22b7e2238217a70d8e7c4);
  background-size : 1400px;

  min-height : 500px;

  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
  }

  .profile-header {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 30px;
    text-align: center;
  }

  .profile-header img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 20px;
    border: 5px solid #fff;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
  }

  .profile-header h1 {
    font-size: 36px;
    margin: 0;
    color: #333;
  }

  .profile-header p {
    font-size: 20px;
    margin-top: 0;
    color: #666;
  }

  .profile-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .profile-info div {
    width: 48%;
    margin-bottom: 20px;
  }

  .profile-info label {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    display: block;
    color: #666;
  }

  .profile-info p {
    margin: 0;
    font-size: 16px;
    color: #333;
  }
`;

const ProfilePage = () => {
  const [info, setInfo] = useState();
  const {username} = useParams();

  useEffect(
    () => {
      const getStaff = async () => {
        const res = await axios.post("/carrentalreservationsystem/getStaff.php", {value: username, type: "GET"});
        console.log(res.data);
        setInfo(res.data);
      }
      getStaff();
    },
    []
  );
  
  return(
    <ProfilePageBlock>
      <div style={{padding : '10px', display: 'flex'}}>
        <div>
          <h1 style={{color : 'white'}}>Profile Page</h1>
        </div>
      </div>
      {info ? (
        <div class="container">
          <div class="profile-header">
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Profile" />
            <h1>{info.fullName}</h1>
            <p>Car Rental Service Manager</p>
          </div>
    
          <div class="profile-info">
            <div>
              <label>ID</label>
              <p>{info._id}</p>
            </div>
            <div>
              <label>Username</label>
              <p>{info.username}</p>
            </div>
            <div>
              <label>Password</label>
              <p>{info.password}</p>
            </div>
            <div>
              <label>Full Name</label>
              <p>{info.fullName}</p>
            </div>
            <div>
              <label>Contact</label>
              <p>{info.contact}</p>
            </div>
            <div>
              <label>Email</label>
              <p>{info.email}</p>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </ProfilePageBlock>
  );
};

export default ProfilePage;