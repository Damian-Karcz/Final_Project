import React,{useState, useEffect} from 'react';


export default function MainPage() {
    return (
        <>
            <main className="mainMenu mainPages">
                <div className="mainMenuContainer">
                    <div className="addContainer">
                        <button className="mainButtons"><a href="/#/ingredientsList"><span>Dodaj składnik</span></a></button>
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