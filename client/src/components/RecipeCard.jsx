import {Card, Col, Row} from "react-bootstrap";
import {useRecipeContext} from "../../hooks/useRecipeContext.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { FaTrashAlt } from "react-icons/fa";
import {CiHeart} from "react-icons/ci";
import {IoMdHeart} from "react-icons/io";
import {useEffect, useState} from "react";
import {MdOutlineModeEdit} from "react-icons/md";
import customFetch from "../utils/customFetch.js";



const RecipeCard = ({recipe}) => {
    const {recipes, dispatch} = useRecipeContext()

    const updateRecipe = async (recipe)=>{
        try {
            recipe.isFav = !recipe.isFav;
            await customFetch.patch(`recipe/${recipe._id}`,{
                 recipe,
            })
            dispatch({type: 'UPDATE_RECIPE', payload: recipe})
        }
        catch (error) {
            console.log('Error fetching data:', error);
        }
    }

    const handleDelete = async (id) => {
        try {
            await customFetch.delete(`recipe/${id}`);
            dispatch({ type: 'DELETE_RECIPE', payload: id });
        } catch (error) {
            console.log('Error deleting recipe:', error);
        }
    };

    return (
        <div className="container-md">
            <Card className={`my-5 shadow border-start border-3 border-0 border-primary`}>
                <Card.Header className={`border-bottom border-primary`}>
                    <Row>
                        <Col md={9} className={`text-primary`}>
                            {recipe.name}
                        </Col>
                        <Col className={`d-flex justify-content-end pe-4`}>
                            <div>

                                    <FaTrashAlt className={`me-2 cursor`} style={{ cursor: 'pointer' }} onClick={() => handleDelete(recipe._id)} />

                                {recipe.isFav?
                                    ( <IoMdHeart onClick={()=> updateRecipe(recipe)}  className={`text-danger`} style={{ fontSize: '1.5rem', cursor: 'pointer' }}/>) :

                                    ( <CiHeart onClick={()=> updateRecipe(recipe)} style={{ fontSize: '1.5rem',cursor: 'pointer' }}/>)
                                   }
                                <MdOutlineModeEdit style={{ cursor: 'pointer' }} className={`ms-1`} />

                                {/*<IoMdHeart />*/}

                            </div>


                        </Col>
                    </Row>
                </Card.Header>

                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p>{recipe.description}</p>

                        <footer className="blockquote-footer">
                            {recipe.calories} calories
                        </footer>
                    </blockquote>
                </Card.Body>
            </Card>
        </div>
    );
};

export default RecipeCard;
