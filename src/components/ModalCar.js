import Button from "./common/Button";
import {useState, useCallback} from "react";
import Modal from "react-modal";
import styled from "styled-components";

const ModalBlock = styled.form`
  display : flex;

  .model{
    padding : 10px;
  }
  .model input{
    margin-left:10px;
  }

  .type{
    padding: 10px;
  }
  .type input{
    margin-left:10px;
  }

  .color{
    padding : 10px;
  }
  .color input{
    margin-left : 10px;
  }

  .cost{
    padding : 10px;
  }
  .cost input{
    margin-left : 10px;
  }

  .unit{
    padding : 10px;
  }
  .unit input{
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

const ModalCar = ({visible, setVisible, onInsert, carId}) => {
  //New Car
  const [model, setModel] = useState('');
  const [type, setType] = useState('');
  const [color, setColor] = useState('');
  const [cost, setCost] = useState('');
  const [unit, setUnit] = useState('');

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (model!=='' && type!=='' && color!=='' && cost!=='' && unit!==''){
        onInsert({
        _id : carId,
        model : model,
        type : type,
        color : color,
        cost : cost,
        unit : unit
        });
        //initialize
        setModel('');
        setType('');
        setColor('');
        setCost('');
        setUnit('');
      } else {
        alert("There is a blank section");
      }
    },
    [model, type, color, cost, unit]
  );

  return(
    <Modal isOpen={visible} style={ModalStyle} ariaHideApp={false}>
      <ModalBlock>
        <div className="model">
          <label>Model</label>
          <input type="text" onChange={e => setModel(e.target.value)} value={model} placeholder="model"/>
        </div>
        <div className="type">
          <label>Type</label>
          <input type="text" onChange={e => setType(e.target.value)} value={type} placeholder="type"/>
        </div>
        <div className="color">
          <label>Color</label>
          <input type="text" onChange={e => setColor(e.target.value)} value={color} placeholder="color"/>
        </div>
        <div className="cost">
          <label>Cost</label>
          <input type="text" onChange={e => setCost(e.target.value)} value={cost} placeholder="cost"/>
        </div>
        <div className="unit">
          <label>Unit</label>
          <input type="text" onChange={e => setUnit(e.target.value)} value={unit} placeholder="unit"/>
        </div>
        <div className="buttons">
          <Button onClick={e => onSubmit(e)} style={{height : '30px', padding : '5px', margin : '10px', marginTop:'0px'}}>Add</Button>
          <Button onClick={() => setVisible(!visible)} style={{height : '30px', padding : '5px', margin : '10px', marginTop : '0px'}}>Close</Button>
        </div>
      </ModalBlock>
    </Modal>
  );
};

export default ModalCar;
