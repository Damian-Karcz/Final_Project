import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {useAPI} from "./useApi";
import firebase from "firebase";

export default function EditMenu() {
    const {allMenu, fetchOneMenu, dishes, fetchAllDishes} = useAPI();
    const [menuDataEdit, setMenuDataEdit] = useState({});
    const [menu, setMenu] = useState([]);
    const [editMenu, setEditMenu] = useState([]);
    const {id} = useParams();
    const db = firebase.firestore();
    const [oneMenu, setOneMenu] = useState([])
    const index = allMenu.findIndex(menu => menu.date === id )
    const thisMenu = [...allMenu][index]

    // useEffect(() => {
    //     fetchAllDishes();
    // },[])
    // useEffect(() => {
    //     fetchOneMenu(id).then(resp => setMenuDataEdit(resp));
    // },[])
    const handleClickAddDish =(e) => {
        e.preventDefault()
        setMenu(prev => [...prev, {category: '', dish: ''}]);
    }
    return (
        <>
            <main className="newMenuMain mainPages">
                <div className="newMenuDiv">

                    <form className="newMenuForm" >

                        <h1>Edytuj menu:<input type="text" value={thisMenu?.date}/></h1>

                        <div className="menuDetails">
                            <label>Opis
                                <textarea value={thisMenu?.description}/>
                                <input type="submit" value="Zaakceptuj zmiany"/>
                            </label>
                            <h2>Dodaj dania, które mają się znaleźć w dzisiejszym Menu<button onClick={handleClickAddDish} className="fas fa-plus-square"></button></h2>
                            <div className="returnDiv">

                                {
                                    editMenu.map((item,index) => {
                                        return (
                                            <div className="oneDish">
                                                <label>
                                                    Wybierz kategorie dania
                                                    <select>
                                                        <option></option>
                                                        <option>śniadanie</option>
                                                        <option>II śniadanie</option>
                                                        <option>przystawka</option>
                                                        <option>zupa</option>
                                                        <option>danie główne</option>
                                                        <option>deser</option>
                                                    </select> oraz jego nazwę
                                                    <select>
                                                        {
                                                            dishes.map(elem => (
                                                                <option>{elem.name}</option>
                                                            ))
                                                        }
                                                    </select><button className="far fa-trash-alt"></button>
                                                </label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                    </form>

                </div>

            </main>
        </>
    )
}
