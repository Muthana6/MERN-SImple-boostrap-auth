import {Button, Form} from "react-bootstrap";
import customFetch from "../utils/customFetch.js";
import {useState} from "react";
import {useRecipeContext} from "../../hooks/useRecipeContext.js";

const RecipeForm = () => {
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [calories, setCalories] = useState(0)
    const [error, setError] = useState(null)
    const { dispatch } = useRecipeContext();




    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            // console.log('Form',name, description, calories)
            const result = await customFetch.post('/recipe', {name, description, calories})
            const {recipe} = result.data
            console.log(recipe)
            dispatch({type: 'ADD_RECIPE', payload: recipe})
        } catch (error) {
            setError(error?.response?.data?.msg)
            console.log(error?.response?.data?.msg)
            return
        }
        setCalories(0)
        setName('')
        setDescription('')
    }
    return (
        <div>
            <Form className={`ms-4 shadow p-3 rounded ` }
                  onSubmit={submitHandler}>
                <h2>Add Meal</h2>
                <Form.Group className="mb-3" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  placeholder="Enter Name"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Calories Count</Form.Label>
                    <Form.Control type="number"
                                  value={calories}
                                  onChange={(e) => setCalories(e.target.value)}
                                  placeholder="Calories"/>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Description</Form.Label>
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Tell me something about your food...">

                    </textarea>
                </Form.Group>


                <div className={`d-grid`}>
                    <Button variant="primary" type="submit" className={`mt-2`}>
                        Add Recipe
                    </Button>
                </div>


            </Form>
        </div>
    );
};

export default RecipeForm;
