import styled from "styled-components";

const SortByBoxBlock = styled.div`
  
`;

const SortByBox = ({setSortBy, options}) => {
  return (
    <SortByBoxBlock>
      <span>Sort By : </span>
      <select onChange={e => setSortBy(e.target.value)}>
        {options.map(o => <option key={o.value}>{o.name}</option>)}
      </select>
    </SortByBoxBlock>
      
  );
};

export default SortByBox;