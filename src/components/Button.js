import styled from "styled-components";

const Button = styled.button`
  padding: 1rem 2rem;
  background: none;
  border: 1px solid #e9c46a;
  color: white;
  transition-duration: 0.4s;
  &:hover {
    color: #eee;
    background: #264653;
  }
`;

export default Button;