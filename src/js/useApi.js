import {useState} from 'react';


export const useAPI = () => {
    const [ingredients, setIngredients] = useState([]);
    const [dishes, setDishes] = useState([]);

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
    return {
        ingredients,
        fetchAllIngredients,
        addIngredient,
        fetchAllDishes,
        addDish,
        dishes
    }
};