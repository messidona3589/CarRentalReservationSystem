import styled from "styled-components";

const Button = styled.button`
  background : none;
  outline : none;
  border : none;
  border-radius : 5px;
  background : #73685d;
  color : white;
  padding: 1rem;
  padding-top : 0.2rem;
  padding-bottom : 0.2rem;
  font-size : 1rem;
  display : flex;
  align-items: center;
  cursor : pointer;
  transition : 0.1s background ease-in;
  &:hover {
    background : #adb5bd;
  }
`;

export default Button;