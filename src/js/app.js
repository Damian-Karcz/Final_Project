import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Link, Route, Switch} from 'react-router-dom';
import MainPage from './MainPage'
import '../sass/allStyles.scss';
import HeaderPage from "./HeaderPage";
import DishList from './DishList'
import IngredientsList from "./IngredientsList";
import MenuList from "./MenuList";
import AddNewIngredient from "./AddNewIngredient";
import AddNewDish from "./AddNewDish";

const App = () => {
    return (
        <>
            <Router>
                <HeaderPage/>
                <Switch>
                    <Route path="/main">
                        <MainPage/>
                    </Route>
                    <Route path="/dishesList">
                        <DishList/>
                    </Route>
                    <Route path="/ingredientsList">
                        <IngredientsList/>
                    </Route>
                    <Route path="/menuList">
                        <MenuList/>
                    </Route>
                    <Route path="/addDish">
                        <AddNewDish/>
                    </Route>
                </Switch>
            </Router>
        </>
    )
}


ReactDOM.render(<App/>, document.getElementById("app"));

