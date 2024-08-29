import { createContext, useEffect, useReducer } from "react";
import customFetch from "../src/utils/customFetch.js";

export const AuthContext = createContext();

// Reducer function to manage authentication state
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'REGISTER':
            // Update state with user information when logged in
            return { ...state, user: action.payload };

        case 'LOGIN':
            // Update state with user information when logged in
            return { ...state, user: action.payload };

        case 'LOGOUT':
            // Clear user information when logged out
            return { ...state, user: null };

        case 'AUTH_IS_READY':
            // Indicate that authentication is ready and set the user
            return { ...state, user: action.payload, authIsReady: true };
        default:
            return state;
    }
}

// Authentication context provider component
export const AuthContextProvider = ({ children }) => {
    // Use reducer to manage authentication state
    const [state, dispatch] = useReducer(authReducer, {
        user: null, // Current user information
        authIsReady: false  // Flag to indicate if authentication is ready
    });

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const { data } = await customFetch.get('auth/current-user');
                dispatch({ type: 'AUTH_IS_READY', payload: data.user });
            } catch (error) {
                console.log('Error fetching current user:', error);
            }
        };

        fetchCurrentUser();
    }, []);

    // Log the current authentication state for debugging
    console.log('AuthContext state: ', state);

    // Provide the authentication state and dispatch function to children components
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}
