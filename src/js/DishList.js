import React,{useState, useEffect} from 'react';


export default function DishList() {
    return (
        <>
            <main className="mainDishList mainPages">
                <div className="dishesListContainer">
                    <form className="findDishForm">
                        <label>
                            Wyszukaj swoje danie:
                            <input type="text" />
                            lub dodaj nowe +
                        </label>
                    </form>
                    <div className="dishesList">
                        <p>Lista dodanych dań:</p>
                    </div>
                </div>
            </main>
        </>
    )
}