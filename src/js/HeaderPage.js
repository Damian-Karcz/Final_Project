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
                            <li><Link to="/main">Home</Link></li>
                            <li><Link to="/main3">Main3</Link></li>
                            <li><Link to="/pricing">Cennik</Link></li>
                            <li><Link to="/pricing">Cennik</Link></li>
                        </ul>
                    </nav>
                </header>
            </Router>
        </>
    )
}