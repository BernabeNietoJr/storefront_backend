import express, { Response, Request, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

//dotenv.config();

const { TOKEN_SECRET } = process.env

const TokenSecret =  TOKEN_SECRET || ''


 const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        let authHeader = req.headers.authorization
        
        if (authHeader===undefined)
            authHeader = '3642wgsh35653656bghv hrhvh'
        
        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, TokenSecret)
        
        next()

    }
    catch (err) {
        res.status(401).json('Access Denied: invalid Token')
    }

}

export default verifyAuthToken