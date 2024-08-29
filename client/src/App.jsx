import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import './App.css'
import Header from "./components/Header.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import {useAuthContext} from "../hooks/useAuthContext.js";
import Register from "./pages/Register.jsx";
import Recipe from "./pages/Recipe.jsx";

function App() {
    const {user, authIsReady} = useAuthContext()

    return (
        <BrowserRouter >

            <Header/>

            <Routes>
                <Route path="/" element={user?
                    <Home /> : <Navigate to="/login" replace/>} />
                <Route path="/:id" element={<Recipe />} />

                <Route path="/login" element={ !user?
                    <Login  /> : <Navigate to="/" replace/> } />

                <Route path="/register" element={ !user?
                    <Register  /> : <Navigate to="/" replace/> } />

            </Routes>

        </BrowserRouter>


  )
}

export default App
