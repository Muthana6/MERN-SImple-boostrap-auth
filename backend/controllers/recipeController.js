import {StatusCodes} from "http-status-codes";

import Recipe from "../models/RecipeModel.js";
import mongoose from "mongoose";




export const getRecipe = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(StatusCodes.NOT_FOUND).json({error: 'No such Recipe'})
    }

    const recipe = await Recipe.findById(id)

    if (!recipe) {
        return res.status(StatusCodes.NOT_FOUND).json({error: 'No such Recipe'})
    }

    res.status(200).json(recipe)
}

export const getRecipes = async (req, res) => {
    const recipes =  await Recipe.find({})
        .sort({createdAt: -1})

    res.status(StatusCodes.OK).json({msg:'Recipes ', recipes})
}

export const addRecipe = async (req, res) => {
    const createdBy = req.user.userId
    console.log(createdBy)

    const {name, calories,description} = req.body
    const recipe = await Recipe.create({name, calories, description, createdBy});

    res.status(StatusCodes.CREATED).json({msg: `Recipe created`,recipe});
}

export const updateRecipe = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(StatusCodes.NOT_FOUND).json({error: 'No such Recipe'})
    }
    const recipe = await Recipe.findById(id)

    if (!recipe) {
        return res.status(StatusCodes.NOT_FOUND).json({error: 'No such Recipe'})
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body?.recipe, {
        new: true,
    });

    res.status(StatusCodes.OK).json(updatedRecipe)
}

export const deleteRecipe = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const recipe = await Recipe.findOneAndDelete({_id: id})

    if (!recipe) {
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(StatusCodes.OK).json({message: `Recipe was deleted`, recipe})
}
