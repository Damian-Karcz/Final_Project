import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Link, Route, Switch} from 'react-router-dom';
import MainPage from './MainPage'
import '../sass/allStyles.scss';
import HeaderPage from "./HeaderPage";
import Main3 from './Main3'

const App = () => {
    return (
        <>
            <Router>
                <HeaderPage/>
                <Switch>
                    <Route path="/main">
                        <MainPage/>
                    </Route>
                    <Route path="/main3">
                        <Main3/>
                    </Route>
                </Switch>
            </Router>
        </>
    )
}


ReactDOM.render(<App/>, document.getElementById("app"));

