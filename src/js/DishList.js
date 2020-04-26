import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {useAPI} from "./useApi";

export default function DishList() {
    const {ingredients, fetchAllIngredients, dishes, fetchAllDishes} = useAPI();
    const [filterText, setFilterText] = useState("");
    const [filterCategory, setFilterCategory] = useState("")

    useEffect(()=> {
        fetchAllDishes();
    },[]);

    const handleChange = event => {
        setFilterText(event.target.value);
    };
    const handleChangeCategory = event => {
        setFilterCategory(event.target.value);
    }
    const handleDelete = (props) => {
        const API = "http://localhost:3000";
        fetch(`${API}/dishes/${props}`, {
            method: "DELETE"
        })
            .then(fetchAllDishes)
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
                            lub dodaj nowe <a href="/#/addDish" className="fas fa-plus-square"></a>
                        </label>
                    </form>
                    <h1>Lista dań</h1>
                    <div className="dishesList">
                        <table className="ingredientsTable">
                            <thead className="ingredientsTableHead">
                            <tr>
                                <th>Nazwa dania</th>
                                <th>Kategoria</th>
                                <th className="thVeg">Wege?</th>
                                <th>Akcje</th>
                            </tr>
                            </thead>
                            <tbody className="ingredientsTableBody">
                            {
                                dishes.filter(element=> element.name.substr(0, filterText.length).toLowerCase().includes(filterText) && element.category.substr(0, filterCategory.length).includes(filterCategory)).map(el => (
                                    <tr key={el.id}>
                                        <th>{el.name}</th>
                                        <td>{el.category}</td>
                                        <td>{el.vege ===true? <i className="fas fa-seedling vegeIcon"></i>:""}</td>
                                        <td className="buttons">
                                            <button onClick={() => handleDelete(el.id)} className="far fa-trash-alt deleteButton"/>
                                            <Link className="far fa-edit editButton" to={`/editDish/${el.id}`}></Link>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    )
}