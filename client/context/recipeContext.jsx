import { createContext, useEffect, useReducer } from "react";
import customFetch from "../src/utils/customFetch.js";

export const RecipeContext = createContext();

// Reducer function to manage authentication state
export const recipeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_RECIPES':
            return {
                recipes: action.payload
            }
        case 'ADD_RECIPE':
            // Update state with user information when logged in
            return {
                recipes:[action.payload,...state.recipes, ]
            };

        case 'DELETE_RECIPE':
            return {
                recipes: state.recipes.filter((r) => r._id !== action.payload)
            }
        case 'UPDATE_RECIPE':
            return {
                recipes: state.recipes.map((r) =>
                    r._id === action.payload._id ? action.payload : r
                )
            };

        default:
            return state;
    }
}

// Authentication context provider component
export const RecipeContextProvider = ({ children }) => {
    // Use reducer to manage authentication state
    const [state, dispatch] = useReducer(recipeReducer, {
        recipes: null,
    });

    // useEffect(() => {
    //     const fetchCurrentUser = async () => {
    //         try {
    //             const { data } = await customFetch.get('auth/current-user');
    //             dispatch({ type: 'AUTH_IS_READY', payload: data.user });
    //         } catch (error) {
    //             console.log('Error fetching current user:', error);
    //         }
    //     };
    //
    //     fetchCurrentUser();
    // }, []);

    // Log the current authentication state for debugging
    console.log('RecipeContext state: ', state);

    // Provide the authentication state and dispatch function to children components
    return (
        <RecipeContext.Provider value={{ ...state, dispatch }}>
            {children}
        </RecipeContext.Provider>
    );
}
