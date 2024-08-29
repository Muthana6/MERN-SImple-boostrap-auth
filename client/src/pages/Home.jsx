import {Button, Col, Container, Form, Row} from "react-bootstrap";
import customFetch from "../utils/customFetch.js";
import {useEffect, useState} from "react";
import RecipeCard from "../components/RecipeCard.jsx";
import RecipeForm from "../components/RecipeForm.jsx";
import {useRecipeContext} from "../../hooks/useRecipeContext.js";


const Home = () => {
    const [error, setError] = useState(null)
    const { dispatch, recipes } = useRecipeContext();

    // fetch Recipes
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const {data } = await customFetch.get('recipe');
                const {recipes} = data
                dispatch({type: 'SET_RECIPES', payload: recipes})
            } catch (error) {
                console.log('Error fetching data:', error);
                setError(error)
            }
        };

        fetchRecipes();
    }, []);

    return (
        <div >
            <Container>
                <div className={`container-xs`} >
                    <Row>
                        <Row>
                            <Col md={8}>
                                    <h1 className={`mt-5 text-center`}>Recipes</h1>
                            </Col>
                        </Row>


                        <Col md={8}>

                            {recipes && recipes.map((recipe) => {
                                return (
                                    <RecipeCard key={recipe._id} recipe={recipe}/>
                                )
                            })}
                        </Col>

                        <Col md={4} className={`mt-3 `}>
                            <RecipeForm/>
                        </Col>
                    </Row>

                </div>

            </Container>

        </div>
    );
};

export default Home;
