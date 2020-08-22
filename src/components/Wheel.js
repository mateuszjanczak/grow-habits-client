import React from "react";
import styled from "styled-components";
import Winwheel from 'winwheel';
import {appendScript, removeScript} from "../utils/scripts";
import Button from "./Button";

class Wheel extends React.Component {

    state = {
        wheel: null
    }

    componentDidMount() {
        appendScript("/static/js/TweenMax.min.js");
        const wheel = new Winwheel({
            canvasId: "myCanvas",
            numSegments: 4,
            segments: [
                {fillStyle: "#eae56f", text: "One"},
                {fillStyle: "#89f26e", text: "Two"},
                {fillStyle: "#7de6ef", text: "Three"},
                {fillStyle: "#e7706f", text: "Four"},
            ],
            animation: {
                type: "spinToStop",
                duration: 5,
                spins: 8,
            },
        });

        this.setState({
            ...this.state,
            wheel
        })
    }


    componentWillUnmount() {
        removeScript("/static/js/TweenMax.min.js");
    }

    render() {
        return (
            <Wrapper>
                <canvas id="myCanvas" height="400" />
                <Action>
                    <Button onClick={this.handleClick}>Spin</Button>
                </Action>
            </Wrapper>
        )
    }

    handleClick = () => {
        let { wheel } = this.state;
        wheel.startAnimation();
    }
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  padding: 1rem;
`;

const Action = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`;

export default Wheel;