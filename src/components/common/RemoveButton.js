import {AiFillDelete} from 'react-icons/ai';

const RemoveButton = ({onClick}) => {
  return (
    <div onClick={onClick}>
      <AiFillDelete />
    </div>
  );
};

export default RemoveButton;