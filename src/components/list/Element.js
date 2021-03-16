import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import {NavLink} from "react-router-dom";
import {routes} from "../../routes";
import Button from "../Button";

class Element extends React.Component {

    constructor(props) {
        super(props)
        const { id, title, lockTime } = this.props.item;
        const cdInterval =  parseInt( dayjs(lockTime).diff(dayjs()) / 1000 );
        this.state = {
            id,
            title,
            lockTime,
            cdInterval
        }
    }

    componentDidMount() {
        const interval = setInterval(() => {
            const { cdInterval } = this.state;
            cdInterval ? this.setState({...this.state, cdInterval: cdInterval-1}) : clearInterval(interval);
        }, 1000);
    }

    render() {
        return (
            <Wrapper>
                <Heading>{this.state.title}</Heading>
                <Action>
                    {this.renderEntry(this.state.id, this.state.cdInterval)}
                </Action>
            </Wrapper>
        )
    }

    renderEntry(id, cdInterval) {
        const isDisabled = cdInterval > 0;

        return (
            <NavLink to={routes.list + id}>
                <Button disabled={isDisabled}>
                    {isDisabled ? cdInterval : "Entry"}
                </Button>
            </NavLink>
        )
    }

}

const Wrapper = styled.div`
  display: grid;
  padding: 1rem 2rem;
  margin-bottom: 1rem;
  background: #e76f51;
  border: 1px solid #EEEEFF;
  box-shadow:0 2.5px 4px 0 rgba(0,0,0,0.2),0 1.5px 5px 0 rgba(0,0,0,0.19);

  @media (min-width: 576px) {
    grid-template-columns: 1fr auto;
  }
`;

const Heading = styled.h3`
  @media (max-width: 575px) {
    text-align: center;
  }
`;

const Action = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`;

export default Element;
