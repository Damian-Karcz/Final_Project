import {useState} from 'react';


export const useAPI = () => {
    const [ingredients, setIngredients] = useState([]);

    const fetchAllIngredients = () => {
        fetch('http://localhost:3000/ingredients')
            .then(res => res.json())
            .then(data => setIngredients(data));
    };


    const addTask = (ingredients) => {
        fetch(`http://localhost:3000/ingredients`, {
            method: "POST",
            body: JSON.stringify(ingredients),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => fetchAllIngredients());
    }

    return {
        ingredients,
        fetchAllIngredients,
        addTask,
    }
};