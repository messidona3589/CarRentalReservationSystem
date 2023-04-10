import { useState, useEffect } from "react";
import Pagination from "./common/Pagination";
import TransactionRow from "./TransactionRow";
import styled from "styled-components";
import {BiSort} from 'react-icons/bi';


const TransactionTableBlock = styled.div`
  table {
    border: 1px #a39485 solid;
    font-size: .9em;
    box-shadow: 0 2px 5px rgba(0,0,0,.25);
    width: 100%;
    border-collapse: collapse;
    border-radius: 5px;
    overflow: hidden;
  }

  th {
    text-align: left;
  }
    
  thead {
    font-weight: bold;
    color: #fff;
    background: #73685d;
  }
    
  td, th {
    padding: 1em .5em;
    vertical-align: middle;
  }
    
  td {
    border-bottom: 1px solid rgba(0,0,0,.1);
    background: #fff;
  }

  footer {
    padding : 10px;
    margin : 0 auto;
  }
`;

const headers = [
  {title : "Transaction No", value : "transactionNo"},
  {title : "Customer", value : "customer"}, 
  {title : "Car", value : "car"}, 
  {title : "Car Type", value : "carType"}, 
  {title : "Borrow Date", value : "borrowDate"}, 
  {title : "Return Date", value : "returnDate"}, 
  {title : "Price", value : "price"},
  {title : "Status", value : "status"}
];

const TransactionTable = ({cars, transactions, onRemove, onEdit, searchText, limit}) => {
  const [showList, setShowList] = useState(transactions);
  const [page, setPage] = useState(1);
  const offset = (page-1) * limit;

  const [sortBy, setSortBy] = useState('transactionNo');

  useEffect(
    () => {
      setShowList(transactions
        .filter(t =>t.customer.includes(searchText) || t.car.includes(searchText))
        .sort(
          (prev, cur) => {
            if (sortBy==='transactionNo'){
              if (Number(prev.transactionNo) > Number(cur.transactionNo)) return 1;
              else return -1;
            }
            else if (sortBy==='customer'){
              if (prev.customer > cur.customer) return 1;
              else return -1;
            }
            else if (sortBy==='car'){
              if (prev.car > cur.car) return 1;
              else return -1;
            }
            else if (sortBy==='carType'){
              if (prev.carType > cur.carType) return 1;
              else return -1;
            }
            else if (sortBy==='borrowDate'){
              if (prev.borrowDate > cur.borrowDate) return 1;
              else return -1;
            }
            else if (sortBy==='returnDate'){
              if (prev.returnDate > cur.returnDate) return 1;
              else return -1;
            }
            else if (sortBy==='price'){
              if (prev.price > cur.price) return 1;
              else return -1;
            }
            else if (sortBy==='status'){
              if (prev.status > cur.status) return 1;
              else return -1;
            }
            return 0;
          }
        )
      )
    },
    [transactions, searchText, sortBy]
  );
  return (
    <TransactionTableBlock>
      <table>
        <thead>
          <tr>
            {headers.map(h => {
              return (<th>
                <label>{h.title}</label>
                <BiSort style={{marginLeft : '10px'}} onClick={() => setSortBy(h.value)} />
              </th>);
            })}
            <th>
              <label>Action</label>
            </th>
          </tr>
        </thead>
        <tbody>
          {showList.slice(offset, offset + limit).map(t => <TransactionRow key={t.transactionNo} transactions={transactions} cars={cars} transaction={t} onEdit={onEdit} onRemove={onRemove}/>)}
        </tbody>
      </table>  
      <footer>
        <Pagination total={showList.length} limit={limit} page={page} setPage={setPage}/>
      </footer>
    </ TransactionTableBlock>
  );
};

export default TransactionTable;
