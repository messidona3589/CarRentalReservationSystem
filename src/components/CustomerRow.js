import { useState } from "react";
import EditButton from "./common/EditButton";
import RemoveButton from "./common/RemoveButton";

const CustomerRow = ({customer, onEdit, onRemove}) => {
  const {_id, fullName, gender, contact, idCard, address} = customer;

  const [newFullName, setNewFullName] = useState(fullName);
  const [newGender, setNewGender] = useState(gender);
  const [newContact, setNewContact] = useState(contact);
  const [newIdCard, setNewIdCard] = useState(idCard);
  const [newAddress, setNewAddress] = useState(address);
  const [edit, setEdit] = useState(false);
  
  return (
    <tr>
      <td>{_id}</td>
      <td>{edit ? <input type="text" value={newFullName} onChange={e => setNewFullName(e.target.value)} placeholder={newFullName}/> : newFullName}</td>
      <td>{edit ? <select onChange={e => setNewGender(e.target.value)} value={newGender}><option key="male">male</option><option key="female">female</option></select> : newGender}</td>
      <td>{edit ? <input type="text" value={newContact} onChange={e => setNewContact(e.target.value)} placeholder={newContact}/> : newContact}</td>
      <td>{edit ? <input type="text" value={newIdCard} onChange={e => setNewIdCard(e.target.value)} placeholder={newIdCard}/> : newIdCard}</td>
      <td>{edit ? <input type="text" value={newAddress} onChange={e => setNewAddress(e.target.value)} placeholder={newAddress}/> : newAddress}</td>
      <td style={{display : 'flex'}}>
        {edit ? (
          <>
            <button onClick={() => {onEdit(_id, {_id:_id, fullName:newFullName, gender:newGender, contact:newContact, idCard:newIdCard, address:newAddress}); setEdit(!edit)}}>Apply</button>
            <button onClick={() => {setEdit(!edit); setNewFullName(fullName);setNewGender(gender);setNewContact(contact); setNewIdCard(idCard);setNewAddress(address)}}>Close</button>
          </>
        ) : (
          <>
            <EditButton onClick={() => setEdit(!edit)} />
            <RemoveButton onClick={() => onRemove(_id)}/>
          </>
        )}
      </td>
    </tr>
  );
};

export default CustomerRow;