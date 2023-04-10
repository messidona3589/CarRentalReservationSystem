import Button from "./common/Button";
import { useState, useCallback } from "react";
import Modal from "react-modal";
import styled from "styled-components";

const ModalBlock = styled.form`
  display : flex;

  .customer{
    padding : 10px;
  }
  .customer select{
    margin-left:10px;
  }

  .car{
    padding: 10px;
  }
  .car select{
    margin-left:10px;
  }

  .borrowDate{
    padding : 10px;
  }
  .borrowDate input{
    margin-left : 10px;
  }

  .returnDate{
    padding : 10px;
  }
  .returnDate input{
    margin-left : 10px;
  }

  .buttons{
    display : flex;
    margin: auto;
  }
`;

const ModalStyle = {
	overlay: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(255, 255, 255, 0.45)",
		zIndex: 10,
	},
	content: {
		display: "flex",
		justifyContent: "center",
		background: "#ffffe7",
		overflow: "auto",
		top: "42vh",
		left: "10vw",
		right: "10vw",
		bottom: "45vh",
		WebkitOverflowScrolling: "touch",
		outline: "none",
		zIndex: 10,
	},
};

const getToday = () => {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}

const ModalRental = ({visible, setVisible, transactionNo, transactions, customers, cars, onInsert}) => {

  //New Transaction
  const [customer, setCustomer] = useState();
  const [car, setCar] = useState();
  const [borrowDate, setBorrowDate] = useState(getToday());
  const [returnDate, setReturnDate] = useState(getToday());

  const isPossible = useCallback(
    (car, borrowDate, returnDate) => {
      if (!transactions) return true;

      return (transactions.filter(t => {return (t.car===car
                && (
                  (t.borrowDate<=borrowDate && borrowDate<=t.returnDate)
                  || (t.borrowDate <= returnDate && returnDate<=t.returnDate)
                  || (borrowDate<=t.borrowDate && t.returnDate<=returnDate)
                )
              );  
      }).length < Number(cars.find(c => c.model===car).unit));
    },
    [transactions, cars]
  );

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      console.log(customer, car, borrowDate, returnDate);
      if (customer && car){
        if (isPossible(car, borrowDate, returnDate)){
          onInsert({
            transactionNo : transactionNo, 
            customer : customer, 
            car: car, 
            carType: cars[cars.findIndex(c => c.model===car)].type, 
            borrowDate: borrowDate, 
            returnDate : returnDate, 
            price: cars[cars.findIndex(c => c.model===car)].cost * ((new Date(returnDate) - new Date(borrowDate))/(1000 * 3600 * 24) +1), 
            status: '0'
          });
          //initialize
          setCustomer("");
          setCar("");
          setBorrowDate(getToday());
          setReturnDate(getToday());
        } else alert(`${car} is not available from ${borrowDate} to ${returnDate}`);
      } else alert("There is a blank section");
    },
    [customer, car, borrowDate, returnDate]
  );

  return (
    <Modal isOpen={visible} style={ModalStyle} ariaHideApp={false}>
      <ModalBlock>
        <div className="customer">
          <label>Customer</label>
          <select onChange={e => setCustomer(e.target.value)} placeholder="Customer">
            <option>---</option>
            {customers.map(c => <option key={c._id} value={c.fullName}>{c.fullName}</option>)}
          </select>
        </div>
        <div className="car">
          <label>Car</label>
          <select onChange={e => setCar(e.target.value)} value={car}>
          <option>---</option>
            {cars.map(car => <option key={car.model} value={car.model}>{car.model}</option>)}
          </select>
        </div>
        <div className="borrowDate">
          <label>Borrow</label>
          <input type="date" value={borrowDate} onChange={e => setBorrowDate(e.target.value)} min={getToday()} style={{height : '25px'}} placeholder={borrowDate}/>
        </div>
        <div className="returnDate">
          <label>Return</label>
          <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} min={borrowDate || getToday()} style={{height : '25px'}}/>
        </div>
        <div className="buttons">
          <Button onClick={e => onSubmit(e)} style={{height : '30px', padding : '5px', margin : '10px', marginTop:'0px'}}>ADD</Button>
          <Button onClick={() => setVisible(!visible)} style={{height : '30px', padding : '5px', margin : '10px', marginTop : '0px'}}>CLOSE</Button>
        </div>
      </ModalBlock>
    </ Modal>
  );
};

export default ModalRental;