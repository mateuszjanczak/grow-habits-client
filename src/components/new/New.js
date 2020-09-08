import React from "react";
import styled from "styled-components";
import {routes} from "../../routes";
import Button from "../Button";
import {NavLink} from "react-router-dom";

class New extends React.Component {

    state = {
        title: "",
        cooldown: "",
        options: [{"name" : "", "power" : "", "color" : "" }]
    }

    handleAdd = () => {
        this.setState({
            ...this.state,
            options: [...this.state.options, {"name" : "", "power" : "", "color" : "" }]
        })
    }

    handleDel = () => {
        this.setState({
            ...this.state,
            options: this.state.options.slice(0, -1)
        })
    }

    handleChangeOptions = (event, index) => {

        const { name, value } = event.target;
        const { options } = this.state;
        const list = [...options];

        list[index][name] = value;

        this.setState(
            {
                ...this.state,
                options: list
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
                        {this.state.options.map((item, i) =>
                            <div>
                                <Input type="text" placeholder="Name" name="name" value={item.name} onChange={e => this.handleChangeOptions(e, i)}/>
                                <Input type="number" placeholder="Power" name="power" value={item.power} onChange={e => this.handleChangeOptions(e, i)}/>
                                <Input type="color" placeholder="Color" name="color" value={item.color} onChange={e => this.handleChangeOptions(e, i)}/>
                            </div>
                        )}
                    </div>
                    <div>
                        <Control onClick={this.handleAdd}>+</Control>
                        <Control onClick={this.handleDel}>-</Control>
                    </div>

                    <Action>
                        <Button>Save</Button>
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

export default New;