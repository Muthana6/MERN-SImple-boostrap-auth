import {useContext} from "react";
import {AuthContext} from "../context/authContext.jsx";

export const useAuthContext = ()=> {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuthContext must be inside an AuthenticationContextProvider')
    }

    return context
}
