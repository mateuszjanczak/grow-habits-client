import React from "react";
import styled from "styled-components";
import Winwheel from 'winwheel';
import {appendScript, removeScript} from "../../utils/scripts";
import Button from "../Button";
import dayjs from "dayjs";

class Wheel extends React.Component {

    constructor(props) {
        super(props)
        const { id, cooldown, lockTime } = this.props;
        const cdInterval =  parseInt( dayjs(lockTime).diff(dayjs()) / 1000 );//dayjs(lockTime).diff(dayjs()) / 1000;
        this.state = {
            id,
            cooldown,
            lockTime,
            cdInterval
        }
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

        const interval = setInterval(() => {
            const { cdInterval } = this.state;
            cdInterval ? this.setState({...this.state, cdInterval: cdInterval-1}) : clearInterval(interval);
        }, 1000);
    }


    componentWillUnmount() {
        removeScript("/static/js/TweenMax.min.js");
    }

    renderSpin(cdInterval) {
        const isDisabled = cdInterval > 0;

        return (
            <Button onClick={this.handleClick} disabled={isDisabled}>
                {isDisabled ? cdInterval : "Spin"}
            </Button>
        )
    }

    render() {
        return (
            <Wrapper>
                <canvas id="myCanvas" height="400" />
                <Action>
                    {this.renderSpin(this.state.cdInterval)}
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