import {BadRequestError, UnauthenticatedError, UnauthorizedError} from "../errors/customError.js";
import {verifyJWT} from "../util/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
    const {token} = req.cookies
    if(!token){
        throw new UnauthenticatedError('authentication invalid');
    }

    try {
        const {userId,role} = verifyJWT(token)
        const testUser = userId === '66b8a368071e90464980569d' // Demo user
        req.user = {userId, role, testUser}
        next()
    }catch (error){
        throw new UnauthenticatedError('authentication invalid');
    }
}

export const authorizedPermissions = (...roles) => {
    return(req, res, next) => {
        if(!roles.includes(req.user.role)) {
            throw new UnauthorizedError('unauthorized to access this route')
        }
        next()
    }
}

export const checkForTestUser = (req, res, next) => {
    if(req.user.testUser) throw new BadRequestError('Demo user. Read only')
    next()
}
