import { useEffect } from "react";
import { useCallback} from "react";
import styled from "styled-components";
import axios from 'axios';
import { useState } from "react";

const DashboardPageBlock = styled.div`

  background : url(/images/BMW.jpg);
  background-size : 1000px;

  min-height : 500px;
  

  h1 {
    padding : 20px;
    color : white;
  }
  h2 {
    padding : 10px;
  }
  h3 {
    padding-top : 20px;
  }

  .content {
    margin : 10px;
    padding : 10px;
    display: grid;
  }
  .content1{
    display : flex;
  }

  .content2{
    display : flex;
  }

  .availableCars{
    border-radius : 5px;
    text-align : center;
    padding : 10px;
    background-color : #F0F0F0;
    margin : 10px;
    width : 500px;
    height : 150px;
  }
  .availableCars:hover {
    box-shadow : 5px 5px 5px 5px #404040;
  }

  .customers{
    border-radius : 5px;
    text-align : center;
    padding : 10px;
    background-color : #F0F0F0;
    margin : 10px;
    width : 500px;
    height : 150px;
  }
  .customers:hover {
    box-shadow : 5px 5px 5px 5px #404040;
  }

  .transactions{
    border-radius : 5px;
    text-align : center;
    padding : 10px;
    background-color : #F0F0F0;
    margin : 10px;
    width : 500px;
    height : 150px;
  }
  .transactions:hover {
    box-shadow : 5px 5px 5px 5px #404040;
  }

  .completedRentals{
    border-radius : 5px;
    text-align : center;
    padding : 10px;
    background-color : #F0F0F0;
    margin : 10px;
    width : 500px;
    height : 150px;
  }
  .completedRentals:hover {
    box-shadow : 5px 5px 5px 5px #404040;
  }
`;

const DashboardPage = () => {

  const [cars, setCars] = useState();
  const [transactions, setTransactions] = useState();
  const [customers, setCustomers] = useState();

  useEffect(()=>{
    const getCars = async() => {
      const res = await axios.post('/carrentalreservationsystem/getCars.php', {value: "", type: "GET"});
      setCars(res.data);
      console.log("Load Cars Successful in Dashboard Page");
    };
    const getTransactions = async() => {
      const res = await  axios.post('/carrentalreservationsystem/getTransactions.php', {value: "", type: "GET"});
      setTransactions(res.data);
      console.log("Load Transactions Successful in Dashboard Page");
    };
    const getCustomers = async() => {
      const res = await axios.post('/carrentalreservationsystem/getCustomers.php', {value: "", type: "GET"});
      setCustomers(res.data);
      console.log("Load Customers Successful in Dashboard Page");
    }
    getCars();
    getTransactions();
    getCustomers();
  }, [])

  const countTotalCars = useCallback(
    (cars) => {
      let cnt = 0;
      for (const car in cars){
        cnt += Number(cars[car].unit);
      };
      return cnt;
    },
    [cars]
  );

  const countCompleteRentals = useCallback(
    (transactions) => {
      let cnt = 0;
      for (const obj in transactions){
        if (transactions[obj].status==='1'){
          cnt += 1;
        }
      };
      return cnt;
    },
    [transactions]
  );

  const getTotalTransaction = useCallback(
    (transactions) => {
      let sum = 0;
      for (const key in transactions){
        sum += transactions[key].price;
      }
      return sum;
    },
    [transactions]
  );

  return (
    <DashboardPageBlock>
      <h1>Dashboard</h1>
      <div className="content">
        <div className="content1">
          <div className="availableCars">
            <h2>TOTAL CARS</h2>
            <hr />
            <h3>{cars ? countTotalCars(cars) : "Loading..."}</h3>
          </div>
          <div className="customers">
            <h2>CUSTOMERS</h2>
            <hr />
            <h3>{customers ? customers.length : "Loading..."}</h3>
          </div>
        </div>
        <div className="content2">
          <div className="transactions">
            <h2>PAYMENTS</h2>
            <hr />
            <h3>{transactions ? getTotalTransaction(transactions) : "Loading..."}</h3>
          </div>
          <div className="completedRentals">
            <h2>COMPLETED RENTALS</h2>
            <hr />
            <h3>{transactions ? countCompleteRentals(transactions) : "Loading..."}</h3>
          </div>
        </div>
      </div>
    </DashboardPageBlock>
  );
};

export default DashboardPage;