import React from "react";
import styled from "styled-components";
import Element from "./Element";
import TaskService from "../../services/TaskService";
import Button from "../Button";
import {NavLink} from "react-router-dom";
import {routes} from "../../routes";

class List extends React.Component {

    constructor(props) {
        super(props)
        this.state = { items: [] }
    }

    componentDidMount() {
        TaskService.getTaskList()
            .then(response => response.json())
            .then(data => this.setState({items: data}))
    }

    render() {
        const { items } = this.state;
        return (
            <Wrapper>
                <Action>
                    <NavLink to={routes.new}>
                        <Button>+</Button>
                    </NavLink>
                </Action>
                {items.map(item =>
                <Element item={item} key={item.id}/>)}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`

`;

const Action = styled.div`
  display: grid;
  justify-content: end;
  margin: 1rem 0;
`;

export default List;