import React,{useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAPI} from "./useApi";
import firebase from "firebase";


export default function EditDish() {
    const {ingredients, fetchAllIngredients, menu, fetchAllMenu, oneDish, fetchAllDishes, fetchDish, allDishes, allIngredients} = useAPI();
    const [dishDataEdit, setDishDataEdit] = useState({});
    const [message, setMessage] = useState("");
    const {id} = useParams();
    const index = allDishes.findIndex(menu => menu.name === id )
    const thisDish = [...allDishes][index]
    const [test, setTest] = useState("coś")

    // useEffect(() => {
    //     fetchDish(id).then(resp => setDishDataEdit(resp));
    // },[])

    const [dishInstructionsEdit, setDishInstructionsEdit] = useState([]);
    const [instructionNameEdit, setInstructionNameEdit] = useState("");
    const [dishIngredientsEdit, setDishIngredientsEdit] = useState([]);
    const [ingredientEdit, setIngredientEdit] = useState({name:"", quantity:""})

    const handleDishDataEdit = ({target}) => {
        thisDish(prev=>({...prev, [target.name]: target.type === 'checkbox' ? target.checked : target.value}))
    }
    const handleTest =(e) => {
        setTest(e.target.value)
    }
    // const handleNewName = (e) => {
    //     setNewName(e.target.value)
    // }
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


    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const dishesEdit = {
    //         id: "",
    //         name: dishDataEdit.name,
    //         description: dishDataEdit.description,
    //         category: dishDataEdit.category,
    //         vege: dishDataEdit.isVegan,
    //         ingredientsList: [...dishDataEdit.ingredientsList, ...dishIngredientsEdit],
    //         instruction: [...dishDataEdit.instruction, ...dishInstructionsEdit]
    //     };
    //     fetch(`http://localhost:3000/dishes/${id}`, {
    //         method: "PUT",
    //         body: JSON.stringify(dishesEdit),
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
    //         .then(response => fetchAllDishes());
    //     setMessage("Danie zostało edytowane");
    // }
    const db = firebase.firestore();

    const handleSubmit = (props) => {
            db.collection("Dishes").doc(`${props}`).set({
                name: thisDish.name,
                description: thisDish.description,
                category: thisDish.category,
                vege: thisDish.isVegan,
                ingredientsList: [...thisDish.ingredientsList, ...dishIngredientsEdit],
                instruction: [...thisDish.instruction, ...dishIngredientsEdit],
            })
                .then(function (docRef) {
                    history.push("/dishesList")

                })
                .catch(function (error) {
                });
    }

    const handleDeleteClick = (index) => {
        setDishIngredientsEdit(prev => prev.filter((item, i) => index !== i ))
    }

    // const handleDeleteEditClick = (props, index) => {
    //     // const API = "http://localhost:3000";
    //     // fetch(`${API}/dishes/${props}/${index}`, {
    //     //     method: "DELETE"
    //     // })
    //     //     .then(fetchAllDishes)
    //
    //     setDishDataEdit(...prev => {prev.filter((item, i) => index !== i )})
    // }

    const handleDeleteClickInstr = (index) => {
        setDishInstructionsEdit(prev => prev.filter((item, i) => index !== i ))
    }

    return (
        <>
            <main className="newDishMain mainPages">
                <div className="newDishContainer">
                    <form className="newDishForm" onSubmit={handleSubmit}>

                        <div className="dishData">
                            <h1>Edytuj danie <input type="submit" value="Zapisz edytowane danie"/></h1>
                            {message && <p className="messageStyle">{message}</p>}

                            <label>Nazwa:
                                <input onChange={handleTest} type="text" name="name" value={thisDish?.name}></input>
                            </label>
                            <label>Opis:
                                <textarea onChange={handleDishDataEdit} name="description" value={thisDish?.description}/>
                            </label>
                            <label>Kategoria:
                                <select onChange={handleDishDataEdit} value={thisDish?.category} name="category">
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
                                <input onChange={handleDishDataEdit} value={thisDish?.isVegan} type="checkbox"  name="isVegan"/>
                            </label>

                        </div>
                        <div className="detailDishContainer">
                            <div className="dishIngredients">
                                <label>Nazwa składnika:
                                    <select value={thisDish?.name} onChange={handleDishIngredientEdit} name="name">
                                        <option></option>
                                        {
                                            allIngredients.map(element => (
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
                                        thisDish?.ingredientsList && thisDish?.ingredientsList.map(el=> (
                                            <li key={`${el.name}-${el.quantity}`}>{el.name} {el.quantity}/g <a  className="fas fa-backspace backspaceButton "></a></li>
                                        ))
                                    }
                                    {
                                        dishIngredientsEdit.map((el, index)=> (
                                            <li key={`${el.name}-${el.quantity}`}>{el.name} {el.quantity}/g <a onClick={e => handleDeleteClick(index,e)} className="fas fa-backspace backspaceButton "></a></li>
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
                                        thisDish?.instruction && thisDish?.instruction.map(el => (
                                            <li>{el} <a className="fas fa-backspace backspaceButton "></a></li>
                                        ))
                                    }
                                    {
                                        dishInstructionsEdit.map((instruction, index) => (
                                            <li key={instruction.id}>
                                                {instruction}
                                                <a onClick={e => handleDeleteClickInstr(index,e)} className="fas fa-backspace backspaceButton "></a>

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
