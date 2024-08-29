import User from '../models/UserModel.js'
import {StatusCodes} from "http-status-codes";
import {comparePassword, hashPassword} from "../util/passwordUtils.js";
import {UnauthenticatedError} from "../errors/customError.js";
import {createJWT} from "../util/tokenUtils.js";

export const register = async (req, res) => {
    const isFirstAccount = await User.countDocuments() === 0
    req.body.role = isFirstAccount? 'admin': 'user'

    const hashedPassword = await hashPassword(req.body.password)
    req.body.password = hashedPassword
    const user = await User.create(req.body);

    const token = createJWT({userId: user._id, role: user.role })
    const oneDay = 1000*60*60*24 // One day in ms

    res.cookie('token', token,
        {   httpOnly: true,
            expires: new Date(Date.now() + oneDay),

            // if production then secure 'https', if not then http
            secure: process.env.NODE_ENV === 'production'
        })
    res.status(StatusCodes.CREATED).json({msg: `user created`, user});
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})

    const isValidUser = user && await comparePassword(password, user.password)
    if(!isValidUser) throw new UnauthenticatedError('invalid email or password')

    const token = createJWT({userId: user._id, role: user.role })
    const oneDay = 1000*60*60*24 // One day in ms

    res.cookie('token', token,
        {   httpOnly: true,
            expires: new Date(Date.now() + oneDay),

            // if production then secure 'https', if not then http
            secure: process.env.NODE_ENV === 'production'
        })
    res.status(StatusCodes.OK).json({msg:'user logged in', user})
}

export const getCurrentUser = async (req, res) => {
    const user =  await User.findOne({_id:req.user.userId})

    const userWithoutPassword = user.toJSON() // check UserModel 'toJSON' function
    res.status(StatusCodes.OK).json({user: userWithoutPassword})
}

export const logout = (req, res) => {
    res.cookie('token','logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.status(StatusCodes.OK).json({msg:'user logged out'})
}
