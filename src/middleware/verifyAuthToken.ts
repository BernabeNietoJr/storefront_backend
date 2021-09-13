import express, { Response, Request, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from '../models/user'

dotenv.config();

const { TOKEN_SECRET } = process.env

const TokenSecret =  TOKEN_SECRET || ''


const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        //let authHeader = req.headers.authorization || '5gtrertetg'
        //const token = authHeader.split(' ')[1]
        
        const token = req.body.token;
        
        const decoded = jwt.verify(token, TokenSecret)
        
        next()

    }
    catch (err) {
        res.status(401).json(`Access Denied: Invalid Token ${err}`)
        return
    }

}

export default verifyAuthToken