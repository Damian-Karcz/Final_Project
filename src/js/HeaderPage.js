import React,{useState, useEffect} from 'react';
import {HashRouter as Router, Link, Route, Switch} from 'react-router-dom';

export default function HeaderPage() {
    return (
        <>
            <Router>
                <header className="headerPage">
                    <h1>Moje Menu</h1>
                    <nav className="headerNav">
                        <ul className="navLis">
                            <li><Link to="/">Strona Główna</Link></li>
                            <li><Link to="/dishesList">Lista Dań</Link></li>
                            <li><Link to="/ingredientsList">Lista Składników</Link></li>
                            <li><Link to="/menuList">Moje Menu</Link></li>
                        </ul>
                    </nav>
                </header>
            </Router>
        </>
    )
}