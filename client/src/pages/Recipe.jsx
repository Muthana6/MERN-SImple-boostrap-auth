import {Container} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import customFetch from "../utils/customFetch.js";

const Recipe = () => {
    const {id} = useParams()
    const [recipe, setRecipe] = useState()

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const {data } = await customFetch.get(`recipe/${id}`);
                // dispatch({type: 'SET_RECIPES', payload: recipes})
                setRecipe(data)
                console.log(data)
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchRecipe();
    }, []);


    return (
        <Container>
            {recipe && (
                <div>
                    <h2>{recipe.name}</h2>
                    <p>{recipe.description}</p>
                    <p>{recipe.calories}</p>
                </div>
            )}

        </Container>
    );
};

export default Recipe;
