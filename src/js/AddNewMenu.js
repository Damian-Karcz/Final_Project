import React,{useState, useEffect} from 'react';
import {useAPI} from "./useApi";


export default function AddNewMenu() {
    const {ingredients, fetchAllIngredients, fetchAllDishes, dishes, fetchAllMenu} = useAPI();
    const [menu, setMenu] = useState([]);

    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        fetchAllDishes();
    },[])

    const handleDelete = (index) => {
        setMenu(prev => prev.filter((item, i) => index !== i ))
    }

    const handleChangeDate = e => {
        e.preventDefault()
        setDate(e.target.value)
    }
    const handleChangeDesc = e => {
        e.preventDefault()
        setDescription(e.target.value)
    }

    const handleClickAddDish =(e) => {
        e.preventDefault()
        setMenu(prev => [...prev, {category: '', dish: ''}]);
    }

    const handleChangeCategory = (index, name) => {
        const copyMenu = menu.slice();
        copyMenu[index].category = name;
        setMenu(copyMenu);
    }

    const handleChangeDish = (index, name) => {
        const copyMenu = menu.slice();
        copyMenu[index].dish = name;
        setMenu(copyMenu);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const menu1 = {
            id: "",
            date: date,
            description: description,
            dishes: menu,
        };
        fetch(`http://localhost:3000/menu`, {
            method: "POST",
            body: JSON.stringify(menu1),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => fetchAllMenu());
        setDescription("");
        setDate("");
        setMenu([]);
    }


    return (
        <>
            <main className="newMenuMain mainPages">
                <div className="newMenuDiv">

                    <form className="newMenuForm" onSubmit={handleSubmit}>

                        <h1>Dodaj nowe Menu na dzień:<input onChange={handleChangeDate} value={date} type="text" placeholder="DD:MM:YYYY"/></h1>

                        <div className="menuDetails">
                            <label>Opis
                                <textarea onChange={handleChangeDesc} value={description}/>
                                <input type="submit" value="Dodaj Menu"/>
                            </label>
                            <h2>Dodaj dania, które mają się znaleźć w dzisiejszym Menu<button onClick={handleClickAddDish}className="fas fa-plus-square"></button></h2>
                            <div className="returnDiv">
                            {
                                menu.map((item,index) => {
                                    return (
                                        <div className="oneDish">
                                            <label>
                                                Wybierz kategorie dania
                                                <select onChange={ e => handleChangeCategory(index, e.target.value) } value={item.category}>
                                                    <option></option>
                                                    <option>śniadanie</option>
                                                    <option>II śniadanie</option>
                                                    <option>przystawka</option>
                                                    <option>zupa</option>
                                                    <option>danie główne</option>
                                                    <option>deser</option>
                                                </select> oraz jego nazwę
                                                <select onChange={ e => handleChangeDish(index, e.target.value) } value={item.dish}>
                                                    <option></option>
                                                    {
                                                        dishes.map(elem => (
                                                            <option>{elem.name}</option>
                                                        ))
                                                    }
                                                </select>
                                                <button onClick={e => handleDelete(index,e)} className="far fa-trash-alt"></button>
                                            </label>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>

                    </form>

                </div>

            </main>
        </>
    )
}