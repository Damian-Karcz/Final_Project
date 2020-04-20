import React,{useState, useEffect} from 'react';
import {useAPI} from "./useApi";

export default function AddNewDish() {
    const {ingredients, fetchAllIngredients, addTask} = useAPI();

    return (
        <>
            <div className="newDishContainer">
                <form className="newDishForm">

                    <div className="dishData">
                        <h1>Dodaj nowe danie</h1>
                        <label>Nazwa:
                            <input type="text"/>
                        </label>
                        <label>Opis:
                            <textarea type="text"/>
                        </label>
                        <label>Kategoria:
                            <select>
                                <option>śniadanie</option>
                                <option>II śniadanie</option>
                                <option>przystawka</option>
                                <option>zupa</option>
                                <option>danie główne</option>
                                <option>deser</option>
                            </select>
                        </label>
                        <label>Czy danie wegańskie?
                            <input type="checkbox"/>
                        </label>

                    </div>
                    <div className="detailDishContainer">
                        <div className="dishIngredients">
                            <label>Nazwa składnika:
                                <input type="text"/>
                            </label>
                            <label>Ilość:
                                <input type="number"/>/gramów
                            </label>
                            <button>Dodaj składnik</button>
                            <ul>
                                <li>
                                    Składnik1
                                </li>
                            </ul>
                        </div>
                            <div className="instructionDish">
                                <label>Instrukcja:
                                    <input type="text"/>
                                </label>
                                <button>Dodaj instrukcje</button>
                                <ul>
                                    <li>
                                        Instrukcja1
                                    </li>
                                </ul>
                            </div>
                    </div>
                    <input type="submit" value="Zapisz danie"/>
                </form>

            </div>
        </>
    )
}