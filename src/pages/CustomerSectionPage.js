import React from "react";
import styled from "styled-components";
import { useCallback, useEffect, useState} from "react";
import CustomerTable from "../components/CustomerTable";
import SearchBox from "../components/common/SearchBox";
import Entries from "../components/common/Entries";
import axios from 'axios';
import Loading from "../components/common/Loading";
import AddButton from "../components/common/AddButton";
import ModalCustomer from "../components/ModalCustomer";

const CustomerSectionPageBlock = styled.div`
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
  header Button{
    margin-left : 100px;
  }

  .content{
    padding : 30px;
  }
  .function{
    display : flex;
    padding-bottom : 10px;
  }
`;

const CustomerSectionPage = () => {

  //Database customer table
  const [customers, setCustomers] = useState([]);
  const [cusId, setCusId] = useState();
  
  const [visible, setVisible] = useState(false); //Modal Box to Add
  const [searchText, setSearchText] = useState(''); //Search Box
  const [limit, setLimit] = useState(10); //Pagination Limit
  
  useEffect(
    () => {
      const getCustomers = async() => {
        const res = await axios.post('/carrentalreservationsystem/getCustomers.php', {value: "", type: "GET"});
        setCustomers(res.data);
        setCusId(Number(res.data[res.data.length-1]._id) + 1);
        console.log("Load Customers Successful in Customer Page");
      }
      getCustomers();
    },
    []
  );
  

  const onInsert = useCallback(
    async (newCustomer) => {
      const res = await axios.post("/carrentalreservationsystem/getCustomers.php", {value: newCustomer, type: "ADD"});
      setCustomers(customers.concat(newCustomer));
      console.log(res.data);
    },
    [customers]
  );

  const onRemove = useCallback(
    async (id) => {
      const res = await axios.post("/carrentalreservationsystem/getCustomers.php", {value: id, type: "REMOVE"});
      setCustomers(customers.filter(c => c._id !== id));
      console.log(res.data);
    },
    [customers]
  );

  const onEdit = useCallback(
    async (id, newCustomer) => {
      const res = await axios.post("/carrentalreservationsystem/getCustomers.php", {value: {newCustomer : newCustomer, id : id}, type: "EDIT"});
      setCustomers(customers.map(c => c._id===id ? newCustomer : c));
      console.log(res.data);
    },
    [customers]
  );

  return (
    <CustomerSectionPageBlock>
      <header>
        <h1 style={{color : 'white'}}>Customer Details</h1>
        <ModalCustomer visible={visible} setVisible={setVisible} cusId={cusId} onInsert={onInsert}/>
      </header>
      <div className="content">
        <div className="function">
          <SearchBox searchText={searchText} setSearchText={setSearchText}/>
          <AddButton onClick={() => setVisible(!visible)}/>
          <Entries limit={limit} setLimit={setLimit}/>
        </div>
        <div className="customerTable">
          {customers ? <CustomerTable customers={customers} onEdit={onEdit} onRemove={onRemove} searchText={searchText} limit={limit}/> : <Loading />}
        </div>
      </div>
    </CustomerSectionPageBlock>
  );
};

export default CustomerSectionPage;