import React from "react";
import styled from "styled-components";
import Wheel from "./Wheel";
import {NavLink} from "react-router-dom";
import {routes} from "../../routes";
import Button from "../Button";
import TaskService from "../../services/TaskService";
import WheelService from "../../services/WheelService";

class Single extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: "",
            title: "",
            cooldown: "",
            lockTime: "",
            optionList: [],
            isLoaded: false
        }
    }

    componentDidMount() {
        const { params } = this.props.match;
        const { id } = params;
        this.loadTask(id);
    }

    loadTask = (id) => {
        this.setState({
            ...this.state,
            id
        }, () => {
            TaskService.getSingleTask(id)
                .then(response => response.json())
                .then(data => this.setState({...data, isLoaded: true}))
        })
    }

    spinWheel = (id, callback) => {
        return WheelService.roll({id})
            .then((res) => this.checkError(res))
            .then(({option}) => {
                const { segment } = option;
                callback(segment);
                this.loadTask(id);
            })
            .catch((error) => alert(error))
    }

    checkError = async (response) => {
        const json = await response.json();

        if (response.status >= 200 && response.status <= 299) {
            return json;
        } else {
            throw Error(json.message);
        }
    }

    render() {
        return (
            <Wrapper>
                <NavLink to={routes.list}>
                    <Button>Back</Button>
                </NavLink>
                <Heading>{this.state.title}</Heading>
                {this.state.isLoaded && <Wheel id={this.state.id} cooldown={this.state.cooldown} lockTime={this.state.lockTime} optionList={this.state.optionList} loadTaskFn={this.loadTask} spinWheelFn={this.spinWheel}/>}
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
  padding: 2rem;
  background: #e76f51;
  border: 1px solid #EEEEFF;
  margin: 1rem;
  box-shadow:0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
`;

const Heading = styled.h2`
  text-align: center;
`;

export default Single;
