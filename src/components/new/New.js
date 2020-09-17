import React from "react";
import styled from "styled-components";
import {routes} from "../../routes";
import Button from "../Button";
import {NavLink} from "react-router-dom";
import TaskService from "../../services/TaskService";

class New extends React.Component {

    state = {
        title: "",
        cooldown: "",
        optionRequestList: [{"name" : "", "power" : "", "color" : "" }]
    }

    handleAdd = () => {
        this.setState({
            ...this.state,
            optionRequestList: [...this.state.optionRequestList, {"name" : "", "power" : "", "color" : "" }]
        })
    }

    handleDel = () => {
        this.setState({
            ...this.state,
            optionRequestList: this.state.optionRequestList.slice(0, -1)
        })
    }

    handleSubmit = () => {
        const data = this.state;
        TaskService.addTask(data)
            .then((res) => this.checkError(res))
            .then(() => this.props.history.push(routes.list))
            .catch((error) => alert(error))
    }

    checkError = async (response) => {
        const json = await response.json();

        if (response.status >= 200 && response.status <= 299) {
            return json;
        } else {
            throw new Error(json.message);
        }
    }

    handleChangeOptions = (event, index) => {

        const { name, value } = event.target;
        const { optionRequestList } = this.state;
        const list = [...optionRequestList];

        list[index][name] = value;

        this.setState(
            {
                ...this.state,
                optionRequestList: list
            }
        );
    };

    handleChange = (event) => {
        this.setState(
            {
                [event.target.name]
                    :event.target.value
            }
        );
    };


    render() {
        return (
            <Wrapper>
                <NavLink to={routes.list}>
                    <Button>Back</Button>
                </NavLink>
                <Form>
                    <h1>New task</h1>
                    <div>
                        <Input type="text" placeholder="Title" name="title" value={this.state.title} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <Input type="number" placeholder="Cooldown in seconds" name="cooldown" value={this.state.cooldown} onChange={this.handleChange}/>
                    </div>
                    <h2>Options</h2>
                    <div>
                        {this.state.optionRequestList.map((item, i) =>
                            <Inputs>
                                <span> {i+1} </span>
                                <Input type="text" placeholder="Name" name="name" value={item.name} onChange={e => this.handleChangeOptions(e, i)}/>
                                <Input type="number" placeholder="Power" name="power" value={item.power} onChange={e => this.handleChangeOptions(e, i)}/>
                                <Input type="color" placeholder="Color" name="color" value={item.color} onChange={e => this.handleChangeOptions(e, i)}/>
                            </Inputs>
                        )}
                    </div>
                    <div>
                        <Control onClick={this.handleAdd}>+</Control>
                        <Control onClick={this.handleDel}>-</Control>
                    </div>

                    <Action>
                        <Button onClick={this.handleSubmit}>Save</Button>
                    </Action>
                </Form>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
  padding: 2rem;
  background: #e76f51;
  border: 1px solid #EEEEFF;
  margin: 1rem;
`;

const Form = styled.div`
  display: grid;
  justify-content: center;
  text-align: center;
`;

const Input = styled.input`
  height: 4rem;
  margin: 1rem 0.5rem;
  padding: 1rem;
  color: black;
  
  @media (max-width: 575px) {
    width: 100%;
    justify-self: center;
  }
`;

const Action = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  margin-top: 2rem;
`;

const Control = styled.button`
  width: 2.5rem;
  padding: 0.25rem;
  margin: 0.25rem;
`;

const Inputs = styled.div`
  //border-bottom: 1px solid white;
  margin-bottom: 1rem;
  @media (max-width: 575px) {
    display: grid;
  }
`;

export default New;
