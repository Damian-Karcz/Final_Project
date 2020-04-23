import React,{useState, useEffect} from 'react';
import {useAPI} from "./useApi";
import {Link} from "react-router-dom";


export default function MenuList() {
    const {ingredients, fetchAllIngredients, menu, fetchAllMenu} = useAPI();
    const [filterText, setFilterText] = useState("");

    useEffect(()=> {
        fetchAllMenu();
    },[]);

    const handleChange = event => {
        setFilterText(event.target.value);
    };

    const handleDelete = (props) => {
        const API = "http://localhost:3000";
        fetch(`${API}/menu/${props}`, {
            method: "DELETE"
        })
            .then(fetchAllMenu)
    }

    return (
        <>
            <main className="mainMenuList mainPages">
                <div className="menuListContainer">
                    <form className="findMenuForm">
                        <label>
                            Wyszukaj swoje Menu po dacie:
                            <input value={filterText} onChange={handleChange} type="text" />
                            lub dodaj nowy <a href="/#/addMenu" className="fas fa-plus-square"></a>
                        </label>
                    </form>
                    <div className="menuList">
                        <p>Lista moich Menu:</p>
                        {/*<div className="dishesListContainer">*/}
                        {/*    <div className="dishesList">*/}
                                <table className="ingredientsTable">
                                    <thead className="ingredientsTableHead">
                                        <tr>
                                            <th>Data</th>
                                            <th>Dania</th>
                                            <th>Akcje</th>
                                        </tr>
                                    </thead>
                                    <tbody className="ingredientsTableBody">
                                    {
                                        menu.filter(el=> el.date.includes(filterText)).map(el => (
                                            <tr key={el.id}>
                                                <th>{el.date}</th>
                                                <td className="tdList">{el.dishes.map(el=> (
                                                    <>
                                                        <div className="divCat">
                                                            <span>
                                                                {el.category}
                                                            </span>
                                                            <span>
                                                                {el.dish}
                                                            </span>
                                                        </div>
                                                    </>
                                                ))}
                                                </td>
                                                <td className="actionButtonsMenu">
                                                    <button onClick={() => handleDelete(el.id)} className="far fa-trash-alt deleteButton"/>
                                                    <Link className="far fa-edit editButton" to={`/editMenu/${el.id}`}></Link>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </main>
        </>
    )
}