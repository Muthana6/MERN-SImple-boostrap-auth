import { body, param, validationResult } from "express-validator";
import {BadRequestError, NotFoundError, UnauthorizedError} from "../errors/customError.js";
import mongoose from "mongoose";
import User from "../models/UserModel.js";

// A higher-order function to apply validation and handle errors
const withValidationErrors = (validateValues) => {

    // Returns an array where the first element is the validation chain and the second element is the error handling middleware
    return [
        validateValues, // Array of validation rules
        (req, res, next) => {
            // Check for validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // If there are errors, map them to an array of error messages
                const errorMessages = errors.array().map((error) => {
                    return error.msg;
                });

                if(errorMessages[0].endsWith('not authorized')){
                    throw new UnauthorizedError(errorMessages)
                }

                // Throw a custom BadRequestError with the error messages
                throw new BadRequestError(errorMessages);
            }
            // If no errors, proceed to the next middleware
            next();
        }
    ];
}



export const validateRegisterInput = withValidationErrors(
    [
        body('name').notEmpty().withMessage('name is required'),
        body('email').isEmail().withMessage('invalid email address')
            .custom(async (email)=> {
                const user = await User.findOne({email});
                if(user){
                    throw new BadRequestError('email already exists');
                }
            }),
        body('password').isLength({min:6}).withMessage('password must be 6 characters at least'),

    ]
)

export const validateLoginInput = withValidationErrors(
    [
        body('email').isEmail().withMessage('invalid email address'),
        body('password').notEmpty().withMessage('password is required'),
    ]
)



// validate id params, weather it is a legit mongoose id
export const validateIdParam = withValidationErrors([
    param('id')
        .custom(async (value,{req}) => { // value is the value of the id param
            const isValidId = mongoose.Types.ObjectId.isValid(value)

            // because this function was a sync, we cant return true or false, but we have to throw it as an error
            if(!isValidId) throw new BadRequestError('invalid mongoDB id')

        })
])

export const validateUserInput = withValidationErrors(
    [
        body('name').notEmpty().withMessage('name is required'),
        body('email').isEmail().withMessage('invalid email address')
            .custom(async (email,{req})=> {
                const user = await User.findOne({email});
                if(user && user._id.toString() !== req.user.userId){
                    throw new BadRequestError('email already exists');
                }
            }),
    ]
)
