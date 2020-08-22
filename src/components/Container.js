import React from "react";
import styled from "styled-components";
import {Route, Switch} from "react-router-dom";
import {routes} from "../routes";
import Single from "./single/Single";
import List from "./list/List";

class Container extends React.Component {
    render() {
        return (
            <Wrapper>
                <Switch>
                    <Route path={routes.single} component={Single}/>
                    <Route path={routes.list} component={List}/>
                </Switch>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
  @media (min-width: 576px) {
    display: grid;
  }
  
  @media (min-width: 576px) {
    width: 540px;
    margin: 0 auto;
  }
    
  @media (min-width: 768px) {
   width: 720px;
  }
    
  @media (min-width: 992px) {
    width: 960px;
  }
    
  @media (min-width: 1200px) {
    width: 1140px;
  }
`;

export default Container;