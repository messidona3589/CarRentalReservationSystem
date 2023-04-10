import { useState, useEffect } from "react";
import CustomerRow from "./CustomerRow";
import Pagination from "./common/Pagination";
import styled from "styled-components";
import {BiSort} from 'react-icons/bi';

const CustomerTableBlock = styled.div`
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
  {title : "ID", value : "_id"},
  {title : "Full Name", value : "fullName"}, 
  {title : "Gender", value : "gender"}, 
  {title : "Contact", value : "contact"}, 
  {title : "ID Card", value : "idCard"}, 
  {title : "Address", value : "address"},
];

const CustomerTable = ({customers, onEdit, onRemove, searchText, limit}) => {

  const [showList, setShowList] = useState(customers);
  const [page, setPage] = useState(1);
  const offset = (page-1) * limit;

  const [sortBy, setSortBy] = useState('_id');

  useEffect(
    () => {
      setShowList(customers
        .filter(c => c.fullName.includes(searchText))
        .sort(
          (prev, cur) => {
            if (sortBy==='_id') return (Number(prev._id) > Number(cur._id)) ? 1 : -1;
            else if (sortBy==='fullName') return (prev.fullName > cur.fullName) ? 1 : -1;
            else if (sortBy==='gender') return (prev.gender > cur.gender) ? 1 : -1;
            else if (sortBy==='contact') return (prev.contact > cur.contact) ? 1 : -1;
            else if (sortBy==='idCard') return (prev.idCard > cur.idCard) ? 1 : -1;
            else if (sortBy==='address') return (prev.address > cur.address) ? 1 : -1;
            return 0;
          }
        )
      );
    },
    [customers, sortBy, searchText]
  );

  return(
    <CustomerTableBlock>
      <table>
        <thead>
          <tr>
            {headers.map(h => {
              return (<th>
                <label>{h.title}</label>
                <BiSort style={{marginLeft : '10px'}} onClick = {() => setSortBy(h.value)}/>
              </th>
            )})}
            <th>
              <label>Action</label>
            </th>
          </tr>
        </thead>
        <tbody>
          {showList.slice(offset, offset + limit).map(c => <CustomerRow key={c._id} customer={c} onEdit={onEdit} onRemove={onRemove}/>)}
        </tbody>
      </table>
      <footer>
        <Pagination total={showList.length} limit={limit} page={page} setPage={setPage}/>
      </footer>
    </CustomerTableBlock>
    
  );
};

export default CustomerTable;