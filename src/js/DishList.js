import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {useAPI} from "./useApi";
import firebase from "firebase";
import { useHistory } from 'react-router-dom';

export default function DishList() {
    const {allDishes, setAllDishes} = useAPI();
    const [filterText, setFilterText] = useState("");
    const [filterCategory, setFilterCategory] = useState("")

    const history = useHistory();

    const handleChange = event => {
        setFilterText(event.target.value);
    };
    const handleChangeCategory = event => {
        setFilterCategory(event.target.value);
    }
    const db = firebase.firestore();
    const handleDelete = (name) => {
        db.collection("Dishes").doc(`${name}`).delete().then(function() {
            alert("Document usunięty poprawnie")
        }).then ( () => {
            const all = allDishes.filter(dish => dish.name !== name)
            setAllDishes(all)
        })
        .catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }

    return (
        <>
            <main className="mainDishList mainPages">
                <div className="dishesListContainer">
                    <form className="findDishForm">
                        <label>
                            Wyszukaj swoje danie:
                            <input type="text" value={filterText} placeholder="Wpisz nazwę dania" onChange={handleChange} />
                            <label>Kategoria</label>
                            <select value={filterCategory} onChange={handleChangeCategory}>
                                <option></option>
                                <option>śniadanie</option>
                                <option>II śniadanie</option>
                                <option>przystawka</option>
                                <option>zupa</option>
                                <option>danie główne</option>
                                <option>deser</option>
                            </select>
                            lub dodaj nowe <Link className="fas fa-plus-square" to="/addDish"></Link>
                        </label>
                    </form>
                    <h1>Lista dań</h1>
                    <div className="dishesList">
                        <table className="ingredientsTable">
                            <thead className="ingredientsTableHead">
                            <tr>
                                <th>Nazwa dania</th>
                                <th>Kategoria</th>
                                {/*<th className="thVeg">Wege?</th>*/}
                                <th>Akcje</th>
                            </tr>
                            </thead>
                            <tbody className="ingredientsTableBody">
                            {
                                allDishes.filter(element=> element.name.substr(0, filterText.length).toLowerCase().includes(filterText) && element.category.substr(0, filterCategory.length).includes(filterCategory)).map(el => (
                                    <tr key={el.id}>
                                        <th>{el.name} {el.vege ===true? <i className="fas fa-seedling vegeIcon"></i>:""}</th>
                                        <td>{el.category}</td>
                                        {/*<td>{el.vege ===true? <i className="fas fa-seedling vegeIcon"></i>:""}</td>*/}
                                        <td className="buttons">
                                            <button onClick={ () => handleDelete(el.name)} className="far fa-trash-alt deleteButton"/>
                                            <Link className="far fa-edit editButton" to={`/editDish/${el.name}`}></Link>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                    <p>*<i className="fas fa-seedling vegeIcon"></i> - danie wegańskie</p>
                </div>
            </main>
        </>
    )
}