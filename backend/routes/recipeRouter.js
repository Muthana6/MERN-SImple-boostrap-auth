import {Router} from 'express'
import {addRecipe, deleteRecipe, getRecipe, getRecipes, updateRecipe} from "../controllers/recipeController.js";
import {authenticateUser} from "../middleware/authMiddleware.js";


const router = Router()

router.get('/',getRecipes)
router.post('/', addRecipe)
router.delete('/:id', deleteRecipe)
router.get('/:id', getRecipe)
router.patch('/:id' ,updateRecipe)



export default router

