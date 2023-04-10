import {GrAddCircle} from 'react-icons/gr';
import Button from './Button';

const AddButton = ({onClick}) => {
  return(
    <Button onClick={onClick}>
      <GrAddCircle style={{width : "40px", height:"30px"}}/>
    </Button>
  );
};

export default AddButton;