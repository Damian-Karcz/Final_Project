import React,{useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAPI} from "./useApi";


export default function EditDish() {
    const {ingredients, fetchAllIngredients, menu, fetchAllMenu, oneDish, fetchAllDishes, fetchDish} = useAPI();
    const [dishDataEdit, setDishDataEdit] = useState({});
    const [message, setMessage] = useState("");
    const {id} = useParams();

    useEffect(() => {
        fetchDish(id).then(resp => setDishDataEdit(resp));
    },[])


    const [dishInstructionsEdit, setDishInstructionsEdit] = useState([]);
    const [instructionNameEdit, setInstructionNameEdit] = useState("");
    const [dishIngredientsEdit, setDishIngredientsEdit] = useState([]);
    const [ingredientEdit, setIngredientEdit] = useState({name:"", quantity:""})

    const handleDishDataEdit = ({target}) => {
        setDishDataEdit(prev=>({...prev, [target.name]: target.type === 'checkbox' ? target.checked : target.value}))
    }

    const handleDishInstructionEdit = (e) => {
        setInstructionNameEdit(e.target.value)
    }

    const handleDishInstructionsEdit = e => {
        e.preventDefault();
        setDishInstructionsEdit( prev => [...prev, instructionNameEdit]);
        setInstructionNameEdit("")
    }
    //END

    //Dodanie składników do state i listy
    const handleDishIngredientEdit = ({target}) => {
        setIngredientEdit(prev=>({...prev, [target.name]: target.value}))
    }
    const handleDishIngredientsEdit = (e) => {
        e.preventDefault();
        setDishIngredientsEdit(prev => [...prev, {name: ingredientEdit.name, quantity: ingredientEdit.quantity}])
        setIngredientEdit({name:"", quantity:""})
    }
    ///////----------------------///////////


    useEffect(()=> {
        fetchAllIngredients();
    },[]);





    const handleSubmit = (event) => {
        event.preventDefault();
        const dishesEdit = {
            id: "",
            name: dishDataEdit.name,
            description: dishDataEdit.description,
            category: dishDataEdit.category,
            vege: dishDataEdit.isVegan,
            ingredientsList: [...dishIngredientsEdit, ...dishIngredientsEdit],
            instruction: [...dishDataEdit.instruction, ...dishInstructionsEdit]
        };
        fetch(`http://localhost:3000/dishes/${id}`, {
            method: "PUT",
            body: JSON.stringify(dishesEdit),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => fetchAllDishes());
        setMessage("Danie zostało edytowane");
    }

    return (
        <>
            <main className="newDishMain mainPages">
                <div className="newDishContainer">
                    <form className="newDishForm" onSubmit={handleSubmit}>

                        <div className="dishData">
                            <h1>Dodaj nowe danie <input type="submit" value="Zapisz edytowane danie"/></h1>
                            {message && <p className="messageStyle">{message}</p>}

                            <label>Nazwa: {oneDish.name}
                                <input onChange={handleDishDataEdit} type="text" name="name" value={dishDataEdit.name}></input>
                            </label>
                            <label>Opis:
                                <textarea onChange={handleDishDataEdit} name="description" value={dishDataEdit.description}/>
                            </label>
                            <label>Kategoria:
                                <select onChange={handleDishDataEdit} value={dishDataEdit.category} name="category">
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
                                <input onChange={handleDishDataEdit} value={dishDataEdit.isVegan} type="checkbox"  name="isVegan"/>
                            </label>

                        </div>
                        <div className="detailDishContainer">
                            <div className="dishIngredients">
                                <label>Nazwa składnika:
                                    <select value={ingredients.name} onChange={handleDishIngredientEdit} name="name">
                                        <option></option>
                                        {
                                            ingredients.map(element => (
                                                <option key={element.id}>{element.name}</option>

                                            ))
                                        }
                                    </select>
                                    <button onClick={handleDishIngredientsEdit} className="fas fa-plus-square"></button>
                                </label>
                                <label>Ilość:
                                    <input value={ingredientEdit.quantity} onChange={handleDishIngredientEdit} type="number" name="quantity"/>/gramów
                                </label>

                                <ul>
                                    {
                                        dishDataEdit.ingredientsList && dishDataEdit.ingredientsList.map(el=> (
                                            <li key={`${el.name}-${el.quantity}`}>{el.name} {el.quantity}/g</li>
                                        ))
                                    }
                                    {
                                        dishIngredientsEdit.map(el=> (
                                            <li key={`${el.name}-${el.quantity}`}>{el.name} {el.quantity}/g</li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="instructionDish">
                                <label>Instrukcja:
                                    <textarea onChange={handleDishInstructionEdit} value={instructionNameEdit} />
                                    <button onClick={handleDishInstructionsEdit} className="fas fa-plus-square"></button>
                                </label>

                                <ul>
                                    {
                                        dishDataEdit.instruction && dishDataEdit.instruction.map(el => (
                                            <li>{el}</li>
                                        ))
                                    }
                                    {
                                        dishInstructionsEdit.map(instruction => (
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
