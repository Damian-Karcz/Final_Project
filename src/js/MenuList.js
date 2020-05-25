import React,{useState, useEffect} from 'react';
import {useAPI} from "./useApi";
import {Link} from "react-router-dom";
import firebase from "firebase";


export default function MenuList() {
    const {allMenu, setAllMenu} = useAPI();
    const [filterText, setFilterText] = useState("");
    //
    // useEffect(()=> {
    //     fetchAllMenu();
    // },[]);

    const handleChange = event => {
        setFilterText(event.target.value);
    };

    // const handleDelete = (props) => {
    //     const API = "http://localhost:3000";
    //     fetch(`${API}/menu/${props}`, {
    //         method: "DELETE"
    //     })
    //         .then(fetchAllMenu)
    // }
    const db = firebase.firestore();
    const handleDelete = (date) => {
        db.collection("Menu").doc(`${date}`).delete().then(function() {
            alert("Document usunięty poprawnie")
        }).then ( () => {
            const all = allMenu.filter(menu => menu.date !== date)
            setAllMenu(all)
        }).catch(function(error) {
            alert("Błąd");
        });
    }

    return (
        <>
            <main className="mainMenuList mainPages">
                <div className="menuListContainer">
                    <form className="findMenuForm">
                        <label>
                            Wyszukaj swoje Menu po dacie:
                            <input value={filterText} onChange={handleChange} type="text" />
                            lub dodaj nowy <Link to="/addMenu" className="fas fa-plus-square"></Link>
                        </label>
                    </form>
                    <div className="menuList">
                        <p>Lista moich Menu:</p>
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
                                        allMenu.filter(el=> el.date.includes(filterText)).map(el => (
                                            <tr key={el.id}>
                                                <th>{el.date}<br/>{el.description}</th>
                                                <td className="tdList">{el.dishes.map(el=> (
                                                    <>
                                                        <div className="divCat">
                                                            <span>
                                                                {el.category}:
                                                            </span>
                                                            <span>
                                                                {el.dish}
                                                            </span>
                                                        </div>
                                                    </>
                                                ))}
                                                </td>
                                                <td className="actionButtonsMenu">
                                                    <button onClick={() => handleDelete(el.date)} className="far fa-trash-alt deleteButton"/>
                                                    <Link className="far fa-edit editButton" to={`/editMenu/${el.date}`}></Link>
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