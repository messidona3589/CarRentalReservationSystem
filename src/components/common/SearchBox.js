import styled from "styled-components";

const SearchBoxBlock = styled.div`
  input {
    background: #495057;
    border-radius : 5px;
    outline: none;
    border: none;
    padding : 0.3rem;
    font-size: 1rem;
    line-height: 1.5;
    color : white;
  }
`;

const SearchBox = ({searchText, setSearchText}) => {
  return (
    <SearchBoxBlock>
      <input type="text" value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="search"/> 
    </SearchBoxBlock>
  );
};

export default SearchBox;