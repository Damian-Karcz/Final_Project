import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom'


export default function MainPage() {
    return (
        <>
            <main className="mainMenu mainPages">
                <div className="mainMenuContainer">
                    <div className="addContainer">
                        <Link className="mainButtons" to="/ingredientsList"><span>Dodaj składnik</span></Link>
                        <button className="mainButtons"><a href="/#/addDish"><span>Dodaj danie</span></a></button>
                        <button className="mainButtons"><a href="/#/addMenu"><span>Dodaj menu</span></a></button>

                    </div>
                    <div className="todayMenu">
                        <h1>W przyszłości znajdziesz tu swoje Menu</h1>

                    </div>
                </div>
            </main>
        </>
    )
}