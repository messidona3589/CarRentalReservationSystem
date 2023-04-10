import CarRentalRow from "./CarRentalRow";
import { useEffect, useState } from "react";
import Pagination from "./common/Pagination";
import styled from "styled-components";
import {BiSort} from 'react-icons/bi';

const CarRentalTableBlock = styled.div`
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
  {title : "Model", value : "model"}, 
  {title : "Type", value : "type"}, 
  {title : "Color", value : "color"}, 
  {title : "Cost", value : "cost"}, 
  {title : "Unit", value : "unit"},
];

const CarRentalTable = ({cars, onEdit, onRemove, searchText, limit}) => {

  const [showList, setShowList] = useState(cars);
  const [page, setPage] = useState(1);
  const offset = (page-1) * limit;

  const [sortBy, setSortBy] = useState('_id');

  useEffect(
    () => {
      setShowList(cars
        .filter(c => c.model.includes(searchText))
        .sort(
          (prev, cur) => {
            if (sortBy==='_id'){
              if (Number(prev._id) > Number(cur._id)) return 1;
              else return -1;
            }
            else if (sortBy==='model'){
              if (prev.model > cur.model) return 1;
              else return -1;
            }
            else if (sortBy==='type'){
              if (prev.type > cur.type) return 1;
              else return -1;
            }
            else if (sortBy==='color'){
              if (prev.color > cur.color) return 1;
              else return -1;
            }
            else if (sortBy==='cost'){
              if (prev.cost > cur.cost) return 1;
              else return -1;
            }
            else if (sortBy==='unit'){
              if (prev.cost > cur.cost) return 1;
              else return -1;
            }
            return 0;
          }
        )  
      );
    },
    [cars, searchText, sortBy]
  );

  return (
    <CarRentalTableBlock>
      <table>
        <thead>
          <tr>
            {headers.map(h => {
              return (
                <th>
                  <label>{h.title}</label>
                  <BiSort style={{marginLeft : '10px'}} onClick = {() => setSortBy(h.value)}/>
                </th>
              );
            })}
            <th>
              <span>Action</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {showList.slice(offset, offset + limit).map(c => <CarRentalRow key={c._id} car={c} onEdit={onEdit} onRemove={onRemove}/>)}
        </tbody>
      </table>
      <footer>
        <Pagination total={showList.length} limit={limit} page={page} setPage={setPage}/>
      </footer>
    </CarRentalTableBlock>
  );
};

export default CarRentalTable;