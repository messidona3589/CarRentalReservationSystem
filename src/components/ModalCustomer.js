import Button from "./common/Button";
import { useState, useCallback } from "react";
import Modal from "react-modal";
import styled from "styled-components";

const ModalBlock = styled.form`
  display : flex;

  .fullName {
    padding : 10px;
  }
  .fullName input{
    margin-left:10px;
  }

  .gender{
    padding: 10px;
  }
  .gender select{
    margin-left:10px;
  }

  .contact{
    padding : 10px;
  }
  .contact input{
    margin-left : 10px;
  }

  .email{
    padding : 10px;
  }
  .email input{
    margin-left : 10px;
  }

  .idCard{
    padding : 10px;
  }
  .idCard input{
    margin-left : 10px;
  }

  .address{
    padding : 10px;
  }
  .address input{
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
		left: "5vw",
		right: "5vw",
		bottom: "45vh",
		WebkitOverflowScrolling: "touch",
		outline: "none",
		zIndex: 10,
	},
};

const ModalCustomer = ({cusId, visible, setVisible, onInsert}) => {

  //New Customer Details
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('male');
  const [contact, setContact] = useState('');
  const [idCard, setIdCard] = useState('');
  const [address, setAddress] = useState('');

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (fullName && contact && idCard && address){
        onInsert({
          _id : cusId,
          fullName : fullName,
          gender : gender,
          contact : contact,
          idCard : idCard,
          address : address
        });
        //initialize
        setFullName('');
        setGender('male');
        setContact('');
        setIdCard('');
        setAddress('');
      } else alert("There is a blank section");
    },
    [cusId, fullName, contact, idCard, address]
  );
  
  return (
    <Modal isOpen={visible} style={ModalStyle} ariaHideApp={false}>
      <ModalBlock>
        <div className="fullName">
          <label>Name</label>
          <input type="text" onChange={e => setFullName(e.target.value)} value={fullName} placeholder="fullName"/>
        </div>
        <div className="gender">
          <label>Gender</label>
          <select onChange={e => setGender(e.target.value)} value={gender}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="contact">
          <label>Contact</label>
          <input type="tel" onChange={e => setContact(e.target.value)} value={contact} placeholder="contact"/>
        </div>
        <div className="idCard">
          <label>ID Card</label>
          <input type="text" onChange={e => setIdCard(e.target.value)} value={idCard} placeholder="idCard"/>
        </div>
        <div className="address">
          <label>Address</label>
          <input type="text" onChange={e => setAddress(e.target.value)} value={address} placeholder="address"/>
        </div>
        <div className="buttons">
          <Button onClick={e => onSubmit(e)} style={{height : '30px', padding : '5px', margin : '10px', marginTop:'0px'}}>Add</Button>
          <Button onClick={() => setVisible(!visible)} style={{height : '30px', padding : '5px', margin : '10px', marginTop : '0px'}}>Close</Button>
        </div>
      </ModalBlock>
    </Modal>
  );
};

export default ModalCustomer;