import React from "react";
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import CarRentalTable from "../components/CarRentalTable";
import SearchBox from "../components/common/SearchBox";
import Entries from "../components/common/Entries";
import axios from 'axios';
import Loading from "../components/common/Loading";
import ModalCar from "../components/ModalCar";
import AddButton from "../components/common/AddButton";

const CarSectionPageBlock = styled.div`
  background : url(/images/BMW.jpg);
  background-size : 1000px;

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

const CarSectionPage = () => {
  
  //Database cars and transaction table
  const [cars, setCars] = useState([]);
  const [carId, setCarId] = useState();

  const [visible, setVisible] = useState(false); //Modal Box to Add
  const [searchText, setSearchText] = useState(''); //Search Box
  const [limit, setLimit] = useState(10); //Pagination Limit

  useEffect(
    () => {
      const getCars = async() => {
        const res = await axios.post('/carrentalreservationsystem/getCars.php', {value: "", type: "GET"});
        setCars(res.data);
        setCarId(Number(res.data[res.data.length-1]._id) + 1);
        console.log("Load Cars Successful in Car Section Page");
      };
      getCars();
    },
    []
  );

  const onInsert = useCallback(
    async (newCar) => {
      const res = await axios.post("/carrentalreservationsystem/getCars.php", {value: newCar, type: "ADD"});
      console.log(res.data);
      setCars(cars.concat(newCar));
    },
    [cars]
  );

  const onRemove = useCallback(
    async (id) => {
      const res = await axios.post("/carrentalreservationsystem/getCars.php", {value: id, type: "REMOVE"})
      setCars(cars.filter(c => c._id !== id));
      console.log(res.data);
    },
    [cars]
  );

  const onEdit = useCallback(
    async (id, newCar) => {
      const res = await axios.post("/carrentalreservationsystem/getCars.php", {value: {newCar : newCar, id : id}, type: "EDIT"});
      setCars(cars.map(c => c._id===id ? newCar : c));
      console.log(res.data);
    },
    [cars]
  );

  return (
    <CarSectionPageBlock>
      <header>
        <h1>Car Rental Details</h1>
        <ModalCar visible={visible} setVisible={setVisible} onInsert={onInsert} carId={carId}/>
      </header>
      <div className="content">
        <div className="function">
          <SearchBox searchText={searchText} setSearchText={setSearchText}/>
          <AddButton onClick={() => setVisible(!visible)}/>
          <Entries limit={limit} setLimit={setLimit}/>
        </div>
        <div className="carRentalTable">
          {cars ? <CarRentalTable cars={cars} onEdit={onEdit} onRemove={onRemove} searchText={searchText} limit={limit}/> : <Loading />}
        </div>
      </div>
    </CarSectionPageBlock>
  );
};

export default CarSectionPage;