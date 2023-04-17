import React from "react";
import styled from "styled-components";
import { useState, useCallback, useEffect } from "react";
import TransactionTable from "../components/TransactionsTable";
import SearchBox from "../components/common/SearchBox";
import Entries from "../components/common/Entries";
import axios from 'axios';
import Loading from "../components/common/Loading";
import ModalRental from "../components/ModalRental";
import AddButton from "../components/common/AddButton";

const RentalsPageBlock = styled.div`
  background : url(https://img.freepik.com/free-vector/realistic-car-headlights-ad-composition-headlights-with-green-purple-illumination_1284-56577.jpg?w=1380&t=st=1681632100~exp=1681632700~hmac=a12f1547272e0f596ff4b1b0e6f93f520821aa082ed22b7e2238217a70d8e7c4);
  background-size : 1400px;

  min-height : 500px;

  header{
    padding : 10px;
    display : flex;
  }
  header h1 {
    color : white;
  }

  .content{
    padding : 30px;
  }
  .function{
    display : flex;
    padding-bottom : 10px;
  }

`;

const RentalsPage = () => {

  //Database transaction and cars table
  const [transactions, setTransactions] = useState([]);
  const [cars, setCars] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [transactionNo, setTransactionNo] = useState();

  const [visible, setVisible] = useState(false); //Modal Box to Add
  const [searchText, setSearchText] = useState(''); //Search Box
  const [limit, setLimit] = useState(10); //Pagination Limit

  useEffect(
    () => {
      const getCars = async() => {
        const res = await axios.post('/carrentalreservationsystem/getCars.php', {value: "", type: "GET"});
        setCars(res.data);
        console.log("Load Cars Successful in Rentals Page");
      };
      const getTransactions = async() => {
        const res = await  axios.post('/carrentalreservationsystem/getTransactions.php', {value: "", type: "GET"});
        setTransactions(res.data);
        setTransactionNo(Number(res.data[res.data.length-1].transactionNo) + 1);
        console.log("Load Transactions Successful in Rentals Page");
      };
      const getCustomers = async() => {
        const res = await axios.post('/carrentalreservationsystem/getCustomers.php', {value: "", type: "GET"});
        setCustomers(res.data);
        console.log("Load Customers Successful in Rentals Page");
      }
      getCars();
      getTransactions();
      getCustomers();
    },
    []
  );

  const onInsert = useCallback(
    async (newTrans) => {
      //Insert new transaction in database
      const res = await axios.post("/carrentalreservationsystem/getTransactions.php", {value: newTrans, type: "ADD"})
      console.log(res.data);
      setTransactions(transactions.concat(newTrans));  
    },
    [transactions]
  );

  const onRemove = useCallback(
    async (id) => {
      //Delete transaction in database
      const res = await axios.post("/carrentalreservationsystem/getTransactions.php", {value: id, type: "REMOVE"});
      console.log(res.data);
      setTransactions(transactions.filter(t => t.transactionNo !== id));
    },
    [transactions]
  );

  const onEdit = useCallback(
    async (id, newTrans) => {
      //Edit transaction in database
      const res = await axios.post("/carrentalreservationsystem/getTransactions.php", {value: {newTrans : newTrans, id : id}, type: "EDIT"});
      console.log(res.data);
      setTransactions(transactions.map(t => t.transactionNo===id ? newTrans : t));
    },
    [transactions]
  );

  return (
    <RentalsPageBlock>
      <header>
        <h1>Transaction Data</h1>
        {(customers && cars && transactions) && <ModalRental visible={visible} setVisible={setVisible} onInsert={onInsert} cars={cars} customers={customers} transactions={transactions} transactionNo={transactionNo}/>}
      </header>
      <div className="content">
        <div className="function">
          <SearchBox searchText={searchText} setSearchText={setSearchText}/>
          <AddButton onClick={() => setVisible(!visible)}/>
          <Entries limit={limit} setLimit={setLimit}/>
        </div>
        <div className="transactionTable">
          {(transactions && cars) ? <TransactionTable cars={cars} transactions={transactions} onEdit={onEdit} onRemove={onRemove} searchText={searchText} limit={limit}/> : <Loading />}
        </div>
      </div>
    </RentalsPageBlock>
  );
};

export default RentalsPage;
