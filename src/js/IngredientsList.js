import React,{useState, useEffect} from 'react';
import AddNewIngredient from "./AddNewIngredient";
import {useAPI} from "./useApi";


export default function IngredientsList() {
    const {ingredients, fetchAllIngredients} = useAPI();
    const [filterText, setFilterText] = useState("");

    useEffect(()=> {
        fetchAllIngredients();
    },[]);

    const handleChange = event => {
        setFilterText(event.target.value);
    };

    const handleDelete = (props) => {
        const API = "http://localhost:3000";
        fetch(`${API}/ingredients/${props}`, {
            method: "DELETE"
        })
            .then(fetchAllIngredients)
    }
    return (
        <>
            <main className="mainIngredientsList mainPages">
                <AddNewIngredient/>
                <div className="ingredientsListContainer">
                    <form className="findIngredientsForm">
                        <label>
                            Wyszukaj swój składnik:
                            <input type="text" value={filterText} placeholder="Wpisz nazwę składnika" onChange={handleChange}/>
                        </label>
                    </form>
                    <div className="ingredientsList">
                        <p>Lista moich składników:</p>
                        <table className="ingredientsTable">
                            <thead className="ingredientsTableHead">
                                <tr>
                                    <th>Nazwa składnika</th>
                                    <th>Kalorie</th>
                                    <th>Alergen</th>
                                    <th>Akcje</th>
                                </tr>
                            </thead>
                            <tbody className="ingredientsTableBody">
                            {
                                ingredients.filter(el=> el.name.includes(filterText)).map(ingredient => (
                                    <>
                                    <tr key={ingredient.id}>
                                        <th>{ingredient.name}</th>
                                        <td>{ingredient.kcal}</td>
                                        <td>{ingredient.allergen}</td>
                                        <td><button onClick={() => handleDelete(ingredient.id)} className="far fa-trash-alt deleteButton"/></td>
                                    </tr>
                                    </>
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