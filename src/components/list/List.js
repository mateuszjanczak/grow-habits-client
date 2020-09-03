import React from "react";
import styled from "styled-components";
import Element from "./Element";
import TaskService from "../../services/TaskService";

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
                {items.map(item =>
                <Element item={item} key={item.id}/>)}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`

`;

export default List;