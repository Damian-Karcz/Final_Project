import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom'


export default function MainPage() {
    return (
        <>
            <main className="mainMenu mainPages">
                <div className="mainMenuContainer">
                    <div className="addContainer">
                        <Link className="mainButtons" to="/ingredientsList"><span>Dodaj składnik</span></Link>
                        <Link className="mainButtons" to="/addDish"><span>Dodaj danie</span></Link>
                        <Link className="mainButtons" to="/addMenu"><span>Dodaj menu</span></Link>

                    </div>
                    <div className="todayMenu">
                        <h1>W przyszłości znajdziesz tu swoje Menu</h1>

                    </div>
                </div>
            </main>
        </>
    )
}