import React,{useState, useEffect} from 'react';
import AddNewIngredient from "./AddNewIngredient";
import {useAPI} from "./useApi";
import firebase from "firebase";


export default function IngredientsList() {
    const [filterText, setFilterText] = useState("");
    const [allIngredients, setAllIngredients] = useState([])

    const handleChange = event => {
        setFilterText(event.target.value);
    };
    const db = firebase.firestore();
    useEffect( ( ) => {
        db.collection("Ingredients").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                setAllIngredients( prev => ([...prev, doc.data()]))
            });
        });
    },[])

    const handleDelete = (name) => {
        db.collection("Ingredients").doc(`${name}`).delete().then(function() {
            alert("Składnik usunięty prawidłowo")
        }).then ( () => {
            const all = allIngredients.filter(ingredient => ingredient.name !== name)
            setAllIngredients(all)
        })
            .catch(function(error) {
        });
    }
    const addNew = (obj) => {
        setAllIngredients(prevState => ([
            ...prevState,
            obj
        ]))
    }
    return (
        <>
            <main className="mainIngredientsList mainPages">
                <AddNewIngredient addNew={addNew}/>
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
                                    <th>KCAL/100g</th>
                                    <th>Alergen</th>
                                    <th>Akcje</th>
                                </tr>
                            </thead>
                            <tbody className="ingredientsTableBody">
                            {
                                allIngredients.filter(el=> el.name.substr(0, filterText.length).toLowerCase().includes(filterText.toLowerCase())).map(ingredient => (
                                    <>
                                    <tr key={ingredient.name}>
                                        <th>{ingredient.name}</th>
                                        <td>{ingredient.kcal}</td>
                                        <td>{ingredient.allergen}</td>
                                        <td><button onClick={() => handleDelete(ingredient.name)} className="far fa-trash-alt deleteButton"/></td>
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