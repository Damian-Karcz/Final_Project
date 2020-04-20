import React,{useState, useEffect} from 'react';


export default function MenuList() {
    return (
        <>
            <main className="mainMenuList mainPages">
                <div className="menuListContainer">
                    <form className="findMenuForm">
                        <label>
                            Wyszukaj swój jadłospis po dacie:
                            <input type="text" />
                            lub dodaj nowe +
                        </label>
                    </form>
                    <div className="menuList">
                        <p>Lista moich jadłospisów:</p>
                        <ul>
                            <li> Jadłospis na dzień: 18-04-2020</li>
                        </ul>
                    </div>
                </div>
            </main>
        </>
    )
}