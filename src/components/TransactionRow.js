import { useState, useEffect, useCallback} from "react";
import EditButton from "./common/EditButton";
import RemoveButton from "./common/RemoveButton";

const getToday = () => {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
};

const TransactionRow = ({transactions, cars, transaction, onEdit, onRemove}) => {

  const {transactionNo, customer, car, carType, borrowDate, returnDate, price, status} = transaction;

  const [newCar, setNewCar] = useState(car);
  const [newCarType, setNewCarType] = useState(carType);
  const [newBorrowDate, setNewBorrowDate] = useState(borrowDate);
  const [newReturnDate, setNewReturnDate] = useState(returnDate);
  const [newPrice, setNewPrice] = useState(price);
  const [newStatus, setNewStatus] = useState(status);
  const [edit, setEdit] = useState(false);

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

  useEffect(
    () => {
      if (newStatus==='0' && (new Date(returnDate) < new Date())){
        onEdit(transactionNo, {...transaction, status: '1'});
      }
    },
    []
  );

  return (
    <tr>
      <td>{transactionNo}</td>
      <td>{customer}</td>
      <td>{(edit && (new Date() < new Date(borrowDate))) ? (<select onChange={e => {setNewCar(e.target.value);setNewCarType(cars[cars.findIndex(c => c.model===e.target.value)].type)}} value={newCar}>{cars.map(c => <option key={c.model}>{c.model}</option>)}</select>) : newCar}</td>
      <td>{newCarType}</td>
      <td>{(edit && (new Date() < new Date(borrowDate))) ? <input type="date" value={newBorrowDate} onChange={e => {setNewBorrowDate(e.target.value);setNewPrice(cars[cars.findIndex(c => c.model===newCar)].cost * ((new Date(newReturnDate) - new Date(e.target.value))/(1000 * 3600 * 24) +1))}} min={getToday()}/> : newBorrowDate}</td>
      <td>{edit ? <input type="date" value={newReturnDate} onChange={e => {setNewReturnDate(e.target.value);setNewPrice(cars[cars.findIndex(c => c.model===newCar)].cost * ((new Date(e.target.value) - new Date(newBorrowDate))/(1000 * 3600 * 24) +1))}} min={newBorrowDate || getToday()}/> : newReturnDate}</td>
      <td>{newPrice}</td>
      <td>{newStatus==='1' ? 'Complete' : 'Process'}</td>
      <td style={{display : 'flex'}}>
        {newStatus==='1'? (
          <>-</>
        ):(
          edit ? (
          <>
            <button onClick={() => {
              if (isPossible(newCar, newBorrowDate, newReturnDate)){
                onEdit(transactionNo, {transactionNo:transactionNo, customer:customer, car:newCar, carType:newCarType, borrowDate:newBorrowDate, returnDate:newReturnDate, price:newPrice, status:newStatus});
                setEdit(!edit);
              } else {
                alert(`${newCar} is not available from ${newBorrowDate} to ${newReturnDate}`);
              }}}>Apply</button>
            <button onClick={() => {setEdit(!edit); setNewCar(car);setNewCarType(carType);setNewBorrowDate(borrowDate);setNewReturnDate(returnDate);setNewPrice(price);setNewStatus(status)}}>Close</button>
          </>
        ):(
          <>
            <EditButton onClick={() => {
              let transNo = prompt('Enter in the transaction Number for confirmation', '');
              if (transNo===transactionNo) setEdit(!edit);
            }} />
            <RemoveButton onClick={() => {
              let transNo = prompt('Enter in the transaction Number for confirmation', '');
              if (transNo===transactionNo) onRemove(transactionNo);
              }}
            />
          </>
        )
        )}
      </td>
    </tr>
  );
};

export default TransactionRow;