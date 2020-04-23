import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {useAPI} from "./useApi";

export default function EditMenu() {
    const {fetchOneMenu, dishes, fetchAllDishes} = useAPI();
    const [menuDataEdit, setMenuDataEdit] = useState({});
    const [menu, setMenu] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        fetchAllDishes();
    },[])

    useEffect(() => {
        fetchOneMenu(id).then(resp => setMenuDataEdit(resp));
    },[])

    const handleClickAddDish =(e) => {
        e.preventDefault()
        setMenu(prev => [...prev, {category: '', dish: ''}]);
    }

    return (
        <>
            <main className="newMenuMain mainPages">
                <div className="newMenuDiv">

                    <form className="newMenuForm" >

                        <h1>Edytuj menu:<input type="text" value={menuDataEdit.date}/></h1>

                        <div className="menuDetails">
                            <label>Opis
                                <textarea value={menuDataEdit.description}/>
                                <input type="submit" value="Zaakceptuj zmiany"/>
                            </label>
                            <h2>Dodaj dania, które mają się znaleźć w dzisiejszym Menu<button onClick={handleClickAddDish} className="fas fa-plus-square"></button></h2>
                            <div className="returnDiv">
                                {/*<div className="oneDish">*/}
                                {/*    <label>*/}
                                {/*        Wybierz kategorie dania*/}
                                {/*        <select>*/}
                                {/*            {*/}
                                {/*                menuDataEdit.dishes && menuDataEdit.dishes.map(el => (*/}
                                {/*                    <>*/}
                                {/*                        <option>{el.category}</option>*/}
                                {/*                    </>*/}
                                {/*                ))*/}
                                {/*            }*/}
                                {/*        </select> oraz jego nazwę*/}
                                {/*        <select>*/}
                                {/*            {*/}
                                {/*                menuDataEdit.dishes && menuDataEdit.dishes.map(el => (*/}
                                {/*                    <>*/}
                                {/*                        <option>{el.dish}</option>*/}
                                {/*                    </>*/}
                                {/*                ))*/}
                                {/*            }*/}
                                {/*        </select><button className="far fa-trash-alt"></button>*/}
                                {/*    </label>*/}
                                {/*</div>*/}
                                {
                                    menu.map((item,index) => {
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
