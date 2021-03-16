import React from "react";
import styled from "styled-components";
import Winwheel from 'winwheel';
import {appendScript, removeScript} from "../../utils/scripts";
import Button from "../Button";
import dayjs from "dayjs";
import wheelBackground from '../../assets/wheel_background.png';

class Wheel extends React.Component {
    
    constructor(props) {
        super(props)

        const { id, cooldown, lockTime, optionList } = this.props;
        const numSegments = optionList.length;

        this.state = {
            id,
            cooldown,
            lockTime,
            optionList,
            numSegments
        }
    }

    componentDidMount() {
        appendScript("/static/js/TweenMax.min.js");

        this.createWheel();

        const { lockTime } = this.props;
        this.checkInterval(lockTime)
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.lockTime !== this.props.lockTime) {
            const { lockTime } = this.props;
            this.checkInterval(lockTime);
            this.createWheel();
        }
    }

    componentWillUnmount() {
        removeScript("/static/js/TweenMax.min.js");
    }

    createWheel = () => {
        const wheel = new Winwheel({
            canvasId: "myCanvas",
            numSegments: 2,
            textFontSize  : 18,
            animation: {
                type: "spinToStop",
                duration: 5,
                spins: 8,
            },
        });

        const { optionList } = this.state;

        optionList.forEach(option => wheel.addSegment({"text": option.name + "\n" + option.power.toFixed(2) + "%", "size": option.power * 360 / 100, "fillStyle": option.color}));
        wheel.draw();

        this.setState({wheel})
    }

    checkInterval = (lockTime) => {
        const cdInterval = parseInt( dayjs(lockTime).diff(dayjs()) / 1000);

        this.setState({
            ...this.state,
            cdInterval
        }, () => {
            let { interval } = this.state;

            clearInterval(interval);

            interval = setInterval(() => {
                const { cdInterval } = this.state;
                cdInterval > 0 ? this.setState({...this.state, cdInterval: cdInterval - 1}) : clearInterval(interval);
            }, 1000);

            this.setState({
                ...this.state,
                interval
            })
        })
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
        let { id } = this.state;
        const { spinWheelFn } = this.props;
        spinWheelFn(id, this.spinWheel);
    }

    spinWheel = (segment) => {
        const { wheel } = this.state;
        wheel.animation.stopAngle = wheel.getRandomForSegment(segment + 2);
        wheel.startAnimation();
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