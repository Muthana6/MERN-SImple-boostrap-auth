import {useContext} from "react";
import {RecipeContext} from "../context/recipeContext.jsx";

export const useRecipeContext = ()=> {
    const context = useContext(RecipeContext)

    if (!context) {
        throw Error('useRecipeContext must be inside an AuthenticationContextProvider')
    }

    return context
}
