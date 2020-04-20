import React,{useState, useEffect} from 'react';


export default function MainPage() {
    return (
        <>
            <main className="mainMenu mainPages">
                <div className="mainMenuContainer">
                    <div className="addContainer">
                        <a href="/#/ingredientsList" className="addDishIcon">Dodaj składnik</a>
                        <a href="/#/addDish" className="addDishIcon">Dodaj danie</a>
                        <a href="" className="addDishIcon">Dodaj menu</a>

                    </div>
                    <div className="todayMenu">

                    </div>
                </div>
            </main>
        </>
    )
}