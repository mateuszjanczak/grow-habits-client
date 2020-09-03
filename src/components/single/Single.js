import React from "react";
import styled from "styled-components";
import Wheel from "./Wheel";
import {NavLink} from "react-router-dom";
import {routes} from "../../routes";
import Button from "../Button";
import TaskService from "../../services/TaskService";

class Single extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: "",
            title: "",
            cooldown: "",
            lockTime: ""
        }
    }

    componentDidMount() {
        const { params } = this.props.match;
        const { id } = params;
        this.setState({
            ...this.state,
            id
        }, () => {
            TaskService.getSingleTask(id)
                .then(response => response.json())
                .then(data => this.setState({...data}));
        })
    }

    render() {
        return (
            <Wrapper>
                <NavLink to={routes.list}>
                    <Button>Back</Button>
                </NavLink>
                <Heading>{this.state.title}</Heading>
                <Wheel id={this.state.id} cooldown={this.state.cooldown} lockTime={this.state.lockTime}/>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
  padding: 2rem;
  background: #e76f51;
`;

const Heading = styled.h2`
  text-align: center;
`;

export default Single;