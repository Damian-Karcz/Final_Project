import React,{useState, useEffect} from 'react';
import {useAPI} from "./useApi";

export default function AddNewDish() {
    const {ingredients, fetchAllIngredients, fetchAllDishes, dishes} = useAPI();
    const [dishData, setDishData] = useState({name:"", description:"", category:"", isVegan:false})
    const [dishInstructions, setDishInstructions] = useState([]);
    const [instructionName, setInstructionName] = useState("");
    const [dishIngredients, setDishIngredients] = useState([]);
    const [ingredient, setIngredient] = useState({name:"", quantity:""})
    const [message, setMessage] = useState("");


    useEffect(()=> {
        fetchAllIngredients();
    },[]);

    useEffect(() => {
        fetchAllDishes();
    },[])


    //Dodanie podstawowych informacji do state
    const handleDishDataChange = ({target}) => {
        setDishData(prev=>({...prev, [target.name]: target.type === 'checkbox' ? target.checked : target.value}))
    }
    //END

    //Dodanie instrukcji do state i listy
    const handleDishInstruction = (e) => {
        setInstructionName(e.target.value)
    }
    const handleDishInstructions = e => {
        e.preventDefault();
        setDishInstructions( prev => [...prev, instructionName]);
    }
    //END

    //Dodanie składników do state i listy
    const handleDishIngredient = ({target}) => {
        setIngredient(prev=>({...prev, [target.name]: target.value}))
    }
    const handleDishIngredients = (e) => {
        e.preventDefault();
        setDishIngredients(prev => [...prev, {name: ingredient.name, quantity: ingredient.quantity}])
    }

    // wysyłanie danych na server
    const handleSubmit = (event) => {
        event.preventDefault();
        if (dishData.name.length <3) {
            setMessage("Nazwa dania musi mieć co najmniej 4 znaki")
            return;
        }if (dishData.description.length <5) {
            setMessage("Opis dania musi mieć co najmniej 10 znaków")
            return;
        }if (dishData.category === "") {
            setMessage("Należy wybrać kategorie dania")
            return;
        }
        const dishes = {
            id: "",
            name: dishData.name,
            description: dishData.description,
            category: dishData.category,
            vege: dishData.isVegan,
            ingredientsList: dishIngredients,
            instruction: dishInstructions
        };
        fetch(`http://localhost:3000/dishes`, {
            method: "POST",
            body: JSON.stringify(dishes),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => fetchAllDishes());
        setMessage("Danie zostało dodane");
        setDishData({name:"", description:"", category:"", isVegan:false});
    }


    return (
        <>
            <main className="newDishMain mainPages">
                <div className="newDishContainer">
                    <form className="newDishForm" onSubmit={handleSubmit}>

                        <div className="dishData">
                            <h1>Dodaj nowe danie <input type="submit" value="Zapisz danie"/></h1>
                            {message && <p className="messageStyle">{message}</p>}

                            <label>Nazwa:
                                <input value={dishData.name} type="text" onChange={handleDishDataChange} name="name"/>
                            </label>
                            <label>Opis:
                                <textarea value={dishData.description} onChange={handleDishDataChange} name="description"/>
                            </label>
                            <label>Kategoria:
                                <select value={dishData.category} onChange={handleDishDataChange} name="category">
                                    <option></option>
                                    <option>śniadanie</option>
                                    <option>II śniadanie</option>
                                    <option>przystawka</option>
                                    <option>zupa</option>
                                    <option>danie główne</option>
                                    <option>deser</option>
                                </select>
                            </label>
                            <label>Czy danie wegańskie?
                                <input value={dishData.isVegan} type="checkbox" onChange={handleDishDataChange} name="isVegan"/>
                            </label>

                        </div>
                        <div className="detailDishContainer">
                            <div className="dishIngredients">
                                <label>Nazwa składnika:
                                    <select value={ingredient.name} onChange={handleDishIngredient} name="name">
                                        <option></option>
                                        {
                                            ingredients.map(element => (
                                                <option key={element.id}>{element.name}</option>
                                            ))
                                        }
                                    </select>
                                    <button onClick={handleDishIngredients} className="fas fa-plus-square"></button>
                                </label>
                                <label>Ilość:
                                    <input value={ingredient.quantity} onChange={handleDishIngredient} type="number" name="quantity"/>/gramów
                                </label>

                                <ul>
                                    {
                                        dishIngredients.map(el=> (
                                            <li key={`${el.name}-${el.quantity}`}>{el.name} {el.quantity}/g</li>
                                        ))
                                    }

                                </ul>
                            </div>
                                <div className="instructionDish">
                                    <label>Instrukcja:
                                        <textarea value={instructionName} onChange={handleDishInstruction}/>
                                        <button onClick={handleDishInstructions} className="fas fa-plus-square"></button>
                                    </label>

                                    <ul>
                                        {
                                            dishInstructions.map(instruction => (
                                                <li key={instruction.id}>
                                                    {instruction}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                        </div>
                    </form>

                </div>
            </main>
        </>
    )
}