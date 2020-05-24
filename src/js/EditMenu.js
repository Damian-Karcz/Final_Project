import React, {useEffect, useState} from "react";
import {useHistory, useParams} from 'react-router-dom';
import {useAPI} from "./useApi";
import firebase from "firebase";

export default function EditMenu() {
    const {allMenu, allDishes,} = useAPI();
    const [menuDataEdit, setMenuDataEdit] = useState(null);
    const [menu, setMenu] = useState([]);
    const history = useHistory();
    const {id} = useParams();
    const db = firebase.firestore();

    useEffect(() => {
        const index = allMenu.findIndex(menu => menu.date === id )
        setMenuDataEdit([...allMenu][index])
    },[allMenu])

    const handleDishDataEdit = ({target}) => {
        setMenuDataEdit(prev=>({...prev, [target.name]: target.type === 'checkbox' ? target.checked : target.value}))
    }

    const handleClickAddMenu =(e) => {
        e.preventDefault()
        setMenu(prev => [...prev, {category: '', dish: ''}]);
    }
    const handleChangeCategory = (index, name) => {
        const copyMenu = menu.slice();
        copyMenu[index].category = name;
        setMenu(copyMenu);
    }
    const handleChangeDish = (index, name) => {
        const copyMenu = menu.slice();
        copyMenu[index].dish = name;
        setMenu(copyMenu);
    }

    const handleDelete = (index) => {
        setMenu(prev => prev.filter((item, i) => index !== i ))
    }

    const handleSubmit = (props) => {
        db.collection("Menu").doc(`${props}`).set({
            date: menuDataEdit.date,
            description: menuDataEdit.description,
            dishes: [...menuDataEdit.dishes, ...menu],
        })
            .then(function (docRef) {
                history.push("/menuList")
            })
            .catch(function (error) {
                // console.error("Error adding document: ", error);
            });
    }

    return (
        <>
            <main className="newMenuMain mainPages">
                <div className="newMenuDiv">

                    <form className="newMenuForm" onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmit(menuDataEdit.date)
                    }}> >
                        <h1>Edytuj menu:<input onChange={handleDishDataEdit} type="text" value={menuDataEdit?.date}/></h1>
                        <div className="menuDetails">
                            <label>Opis
                                <textarea value={menuDataEdit?.description} onChange={handleDishDataEdit} name="description"/>
                                <input type="submit" value="Zaakceptuj zmiany"/>
                            </label>
                            <h2>Dodaj dania, które mają się znaleźć w dzisiejszym Menu<button onClick={handleClickAddMenu} className="fas fa-plus-square"></button></h2>
                            <div className="returnDiv">
                                {
                                    menuDataEdit?.dishes.map(el => (
                                        <>
                                            <ul>
                                                <li>{el.category}: {el.dish}</li>
                                            </ul>
                                        </>
                                    ))
                                }
                                {
                                    menu.map((item,index) => {
                                        return (
                                            <div className="oneDish">
                                                <label>
                                                    Wybierz kategorie dania
                                                    <select onChange={ e => handleChangeCategory(index, e.target.value)} value={item.category}>
                                                        <option></option>
                                                        <option>śniadanie</option>
                                                        <option>II śniadanie</option>
                                                        <option>przystawka</option>
                                                        <option>zupa</option>
                                                        <option>danie główne</option>
                                                        <option>deser</option>
                                                    </select> oraz jego nazwę
                                                    <select onChange={ e => handleChangeDish(index, e.target.value)} value={item.dish}>
                                                        <option></option>
                                                        {
                                                            allDishes.map(elem => (
                                                                <option>{elem.name}</option>
                                                            ))
                                                        }
                                                    </select><button onClick={e => handleDelete(index,e)} className="far fa-trash-alt"></button>
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
