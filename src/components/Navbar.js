import React from "react";
import styled from "styled-components";

class Navbar extends React.Component {
    render() {
        return (
            <Wrapper>
                <h2>Grow Habits Wheel</h2>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
  background: #2a9d8f;
  text-align: center;
  padding: 1rem;
  margin-bottom: 1rem;
`;

export default Navbar;