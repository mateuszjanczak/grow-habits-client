import React from "react";
import styled from "styled-components";
import Element from "./Element";

class List extends React.Component {
    render() {
        return (
            <Wrapper>
                <Element />
                <Element />
                <Element />
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`

`;

export default List;