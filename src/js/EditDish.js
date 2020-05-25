import React,{useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useAPI} from "./useApi";
import firebase from "firebase";
import { useHistory } from 'react-router-dom';


export default function EditDish() {
    const {allDishes, allIngredients} = useAPI();
    const {id} = useParams();
    const history = useHistory();
    const [dishDataEdit, setDishDataEdit] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const index = allDishes.findIndex(menu => menu.name === id )
        setDishDataEdit([...allDishes][index])
    },[allDishes])

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

    const db = firebase.firestore();
    const handleSubmit = (props) => {
        if (dishDataEdit.name.length <3) {
            setMessage("Nazwa dania musi mieć co najmniej 4 znaki")
            return;
        }if (dishDataEdit.description.length <5) {
            setMessage("Opis dania musi mieć co najmniej 10 znaków")
            return;
        }if (dishDataEdit.category === "") {
            setMessage("Należy wybrać kategorie dania")
            return;
        }
            db.collection("Dishes").doc(`${props}`).set({
                name: dishDataEdit.name,
                description: dishDataEdit.description,
                category: dishDataEdit.category,
                vege: dishDataEdit.isVegan,
                ingredientsList: [...dishDataEdit.ingredientsList, ...dishIngredientsEdit],
                instruction: [...dishDataEdit.instruction, ...dishInstructionsEdit],
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

    const handleDeleteClickInstr = (index) => {
        setDishInstructionsEdit(prev => prev.filter((item, i) => index !== i ))
    }

    return (
        <>
            <main className="newDishMain mainPages">
                <div className="newDishContainer">
                    <form className="newDishForm" onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmit(dishDataEdit.name)
                    }}>

                        <div className="dishData">
                            <h1>Edytuj danie <input type="submit" value="Zapisz edytowane danie"/></h1>
                            {message && <p className="messageStyle">{message}</p>}

                            <label>Nazwa:
                                <input onChange={handleDishDataEdit} type="text" name="name" value={dishDataEdit?.name}></input>
                            </label>
                            <label>Opis:
                                <textarea onChange={handleDishDataEdit} name="description" value={dishDataEdit?.description}/>
                            </label>
                            <label>Kategoria:
                                <select onChange={handleDishDataEdit} value={dishDataEdit?.category} name="category">
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
                                <input onChange={handleDishDataEdit} value={dishDataEdit?.isVegan} type="checkbox"  name="isVegan"/>
                            </label>

                        </div>
                        <div className="detailDishContainer">
                            <div className="dishIngredients">
                                <label>Nazwa składnika:
                                    <select value={allDishes.name} onChange={handleDishIngredientEdit} name="name">
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
                                        dishDataEdit?.ingredientsList && dishDataEdit?.ingredientsList.map(el=> (
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
                                        dishDataEdit?.instruction && dishDataEdit?.instruction.map(el => (
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
