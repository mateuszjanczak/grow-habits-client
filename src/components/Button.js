import styled from "styled-components";

const Button = styled.button`
  padding: 1rem 2rem;
  background: #e76f51;
  border: 1px solid #EEEEFF;
  color: white;
  transition-duration: 0.4s;
  box-shadow:0 2.5px 4px 0 rgba(0,0,0,0.2),0 1.5px 5px 0 rgba(0,0,0,0.19);

  &:hover {
    color: #eee;
    background: #264653;
  }
`;

export default Button;
