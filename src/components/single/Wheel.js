import React from "react";
import styled from "styled-components";
import Winwheel from 'winwheel';
import {appendScript, removeScript} from "../../utils/scripts";
import Button from "../Button";
import dayjs from "dayjs";
import wheelBackground from '../../assets/wheel_background.png';
import WheelService from "../../services/WheelService";

class Wheel extends React.Component {

    constructor(props) {
        super(props)

        const { id, cooldown, lockTime, optionList } = this.props;
        const cdInterval =  parseInt( dayjs(lockTime).diff(dayjs()) / 1000 );//dayjs(lockTime).diff(dayjs()) / 1000;
        const numSegments = optionList.length;

        this.state = {
            id,
            cooldown,
            lockTime,
            optionList,
            numSegments,
            cdInterval
        }
    }

    componentDidMount() {
        appendScript("/static/js/TweenMax.min.js");

        const wheel = new Winwheel({
            canvasId: "myCanvas",
            numSegments: 2,
            animation: {
                type: "spinToStop",
                duration: 5,
                spins: 8,
            },
        });

        const { optionList } = this.state;

        optionList.forEach(option => wheel.addSegment({"text": option.name + "\n" + option.power + "%", "size": option.power * 360 / 100, "fillStyle": option.color}));
        wheel.draw();

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
                <Canvas id="myCanvas" height="400" />
                <Action>
                    {this.renderSpin(this.state.cdInterval)}
                </Action>
            </Wrapper>
        )
    }

    handleClick = () => {
        let { wheel, id } = this.state;

        const data = {
            id
        };

        WheelService.roll(data)
            .then(response => response.json())
            .then(data => data.option.segment)
            .then(segment => wheel.getRandomForSegment(segment + 2))
            .then(angle => wheel.animation.stopAngle = angle)
            .then(() => wheel.startAnimation())

        }
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  padding: 1rem;
`;

const Canvas = styled.canvas`
  background-image: url(${wheelBackground});
  background-repeat: no-repeat;
  background-position: center;
`;

const Action = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
`;

export default Wheel;