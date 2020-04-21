import React,{useState, useEffect} from 'react';
import {useAPI} from "./useApi";

export default function AddNewIngredient() {
    const {ingredients, fetchAllIngredients} = useAPI();
    const [newIngredient, setNewIngredient] = useState({name:"", kcal:"",allergen:"nie",});
    const [message, setMessage] = useState("")

    const handleChangeIngredient = ({target}) => {
        setNewIngredient(prev => ({...prev, [target.name]: target.value}));
    };

    const handleSubmitNewIngredient = () => {
        if (newIngredient.name.length >0) {
            const ingredients = {
                id: "",
                name: newIngredient.name,
                kcal: newIngredient.kcal,
                allergen: newIngredient.allergen
            };
            fetch(`http://localhost:3000/ingredients`, {
                method: "POST",
                body: JSON.stringify(ingredients),
                headers: {
                    "Content-Type": "application/json"
                }
            })

                .then(response => fetchAllIngredients());

        } else {
            setMessage("Wprowadź nazwę składnika")
        }
    };

    return (
        <>
            <div className="mainPages addIngredientContainer">
                <div className="addNewIngredients">

                    <form onSubmit={handleSubmitNewIngredient} className="addIngredientForm">
                        <h1>Dodaj nowy składnik</h1>
                        <label>Nazwa składnika:
                            <input value={newIngredient.name} className="input-question" type="text" name="name" onChange={handleChangeIngredient} />
                        </label>
                        <label>Ilość kcal:
                            <input value={newIngredient.kcal} className="input-question-sec" type="number" name="kcal" onChange={handleChangeIngredient}/>/100g
                        </label>
                        <label>Czy zawiera alergeny?
                            <select value={newIngredient.allergen} name="allergen" onChange={handleChangeIngredient}>
                                <option>nie</option>
                                <option>tak</option>
                            </select>
                        </label>
                        <input type="submit" value="Zapisz składnik"/>
                        {message && <p className="messageStyle">{message}</p>}
                    </form>
                </div>
            </div>
        </>
    )
}