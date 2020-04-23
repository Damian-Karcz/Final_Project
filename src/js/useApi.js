import {useState} from 'react';


export const useAPI = () => {
    const [ingredients, setIngredients] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [menu, setMenu] = useState([]);
    const [oneDish, setOneDish] = useState([]);

    const fetchAllIngredients = () => {
        fetch('http://localhost:3000/ingredients')
            .then(res => res.json())
            .then(data => setIngredients(data));
    };
    const addIngredient = (ingredients) => {
        fetch(`http://localhost:3000/ingredients`, {
            method: "POST",
            body: JSON.stringify(ingredients),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => fetchAllIngredients());
    }

    const fetchAllDishes = () => {
        fetch('http://localhost:3000/dishes')
            .then(res => res.json())
            .then(data => setDishes(data));
    };


    const addDish = (dishes) => {
        fetch(`http://localhost:3000/dishes`, {
            method: "POST",
            body: JSON.stringify(dishes),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => fetchAllIngredients());
    }


    const fetchAllMenu = () => {
        fetch('http://localhost:3000/menu')
            .then(res => res.json())
            .then(data => setMenu(data));
    };


    const fetchDish = (id) => {
        return fetch(`http://localhost:3000/dishes/${id}`)
            .then(res => res.json())
    };

    const fetchOneMenu = (id) => {
        return fetch(`http://localhost:3000/menu/${id}`)
            .then(res => res.json())
    };

    return {
        ingredients,
        fetchAllIngredients,
        addIngredient,
        fetchAllDishes,
        addDish,
        dishes,
        fetchAllMenu,
        menu,
        fetchDish,
        oneDish,
        fetchOneMenu,
    }
};