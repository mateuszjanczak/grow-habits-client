import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {routes} from "../../routes";
import Button from "../Button";

class Element extends React.Component {

    state = {
        id: 1,
        title: "Title",
        cooldown: 0
    }

    render() {
        return (
            <Wrapper>
                <Heading>{this.state.title}</Heading>
                <Action>
                    {this.renderEntry(this.state.id, this.state.cooldown)}
                </Action>
            </Wrapper>
        )
    }

    renderEntry(id, cooldown) {
        const isDisabled = cooldown > 0;

        return (
            <NavLink to={routes.list + id}>
                <Button disabled={isDisabled}>
                    {isDisabled ? cooldown : "Entry"}
                </Button>
            </NavLink>
        )
    }

}

const Wrapper = styled.div`
  display: grid;
  padding: 1rem;
  margin-bottom: 1rem;
  background: #343a40;
      
  @media (min-width: 576px) {
    grid-template-columns: 1fr auto;
  }
`;

const Heading = styled.h3`
  text-align: center;
`;

const Action = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`;

export default Element;