import React from "react";
import styled from "styled-components";
import Wheel from "../Wheel";
import {NavLink} from "react-router-dom";
import {routes} from "../../routes";
import Button from "../Button";

class Single extends React.Component {
    render() {
        return (
            <Wrapper>
                <NavLink to={routes.list}>
                    <Button>Back</Button>
                </NavLink>
                <Wheel />
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
  padding: 2rem;
  background: #343a40;
`;

export default Single;