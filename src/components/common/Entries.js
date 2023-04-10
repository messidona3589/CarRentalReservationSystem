
const Entries = ({limit, setLimit}) => {
  return (
    <div>
      <span style={{color : 'white'}}>Entries : &nbsp;</span>
      <select type="number" value={limit} onChange={({target : {value}}) => setLimit(Number(value))}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
};

export default Entries;