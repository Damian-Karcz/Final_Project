import React,{useState, useEffect} from 'react';
import {useAPI} from "./useApi";
import firebase from "firebase";

export default function AddNewIngredient({ addNew }) {
    const [newIngredient, setNewIngredient] = useState({name:"", kcal:"",allergen:"",});
    const [message, setMessage] = useState("")

    const handleChangeIngredient = ({target}) => {
        setNewIngredient(prev => ({...prev, [target.name]: target.value}));
    };

    const db = firebase.firestore();

    const handleSubmitNewIngredient = (props) => {
        if (newIngredient.name.length > 1) {
            db.collection("Ingredients").doc(`${props}`).set({
                name: newIngredient.name,
                kcal: newIngredient.kcal,
                allergen: newIngredient.allergen
            })
                .then(function (docRef) {
                    addNew({
                        name: newIngredient.name,
                        kcal: newIngredient.kcal,
                        allergen: newIngredient.allergen
                    })
                    setNewIngredient({name: "", kcal: "", allergen: "",})
                    setMessage("")
                })

                .catch(function (error) {
                });
        } else {
            setMessage("Nazwa składnika musi składać się z co najmniej 2 liter")
        }
    }

    //-------WERSJA Z JSON SERVER----//
    // const handleSubmitNewIngredient = () => {
    //     if (newIngredient.name.length >0) {
    //         const ingredients = {
    //             id: "",
    //             name: newIngredient.name,
    //             kcal: newIngredient.kcal,
    //             allergen: newIngredient.allergen
    //         };
    //         fetch(`http://localhost:3000/ingredients`, {
    //             method: "POST",
    //             body: JSON.stringify(ingredients),
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         })
    //
    //             .then(response => fetchAllIngredients());
    //
    //     } else {
    //         setMessage("Wprowadź nazwę składnika")
    //     }
    // };

    return (
        <>
            <div className="mainPages addIngredientContainer">
                <div className="addNewIngredients">

                    <form onSubmit={(e) =>{
                        e.preventDefault();
                        handleSubmitNewIngredient (newIngredient.name) }} className="addIngredientForm">
                        <h1>Dodaj nowy składnik</h1>
                        <label>Nazwa składnika:
                            <input value={newIngredient.name} className="input-question" type="text" name="name" onChange={handleChangeIngredient} />
                        </label>
                        <label>Ilość kcal:
                            <input value={newIngredient.kcal} className="input-question-sec" type="number" name="kcal" onChange={handleChangeIngredient}/>/100g
                        </label>
                        <label>Czy zawiera alergeny?
                            <select value={newIngredient.allergen} name="allergen" onChange={handleChangeIngredient}>
                                <option></option>
                                <option>nie</option>
                                <option>tak</option>
                            </select>
                        </label>
                        {message && <p className="messageStyle">{message}</p>}
                        <input type="submit" value="Zapisz składnik"/>

                    </form>
                </div>
            </div>
        </>
    )
}