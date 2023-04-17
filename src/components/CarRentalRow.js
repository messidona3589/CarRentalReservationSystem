import { useState } from "react";
import EditButton from "./common/EditButton";
import RemoveButton from "./common/RemoveButton";

const CarRentalRow = ({car, onEdit, onRemove}) => {
  const {_id, model, type, color, cost, unit} = car;

  const [newCarId, setNewCarId] = useState(_id);
  const [newModel, setNewModel] = useState(model);
  const [newType, setNewType] = useState(type);
  const [newColor, setNewColor] = useState(color);
  const [newCost, setNewCost] = useState(cost);
  const [newUnit, setNewUnit] = useState(unit);
  const [edit, setEdit] = useState(false);
  
  return (
    <tr>
      <td>{newCarId}</td>
      <td>{edit ? <input type="text" value={newModel} onChange={e => setNewModel(e.target.value)} placeholder={newModel}/> : newModel}</td>
      <td>{edit ? <input type="text" value={newType} onChange={e => setNewType(e.target.value)} placeholder={newType} /> : newType}</td>
      <td>{edit ? <input type="text" value={newColor} onChange={e => setNewColor(e.target.value)} placeholder={newColor} /> : newColor}</td>
      <td>{edit ? <input type="text" value={newCost} onChange={e => setNewCost(e.target.value)} placeholder={newCost}/> : newCost}</td>
      <td>{edit ? <input type="text" value={newUnit} onChange={e => setNewUnit(e.target.value)} placeholder={newUnit}/> : newUnit}</td>
      <td style={{display : "flex"}}>
        {edit ? (
            <>
              <button onClick={() => {onEdit(_id, {_id:newCarId, model: newModel, type:newType, color:newColor, cost:newCost, unit: newUnit}); setEdit(!edit)}}>Apply</button>
              <button onClick={() => {setEdit(!edit); setNewModel(model);setNewColor(color);setNewCost(cost);}}>Close</button>
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

export default CarRentalRow;