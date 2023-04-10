import {AiFillEdit} from 'react-icons/ai';

const EditButton = ({onClick}) => {
  return (
    <div onClick={onClick}>
      <AiFillEdit />
    </div>
  );
};

export default EditButton;