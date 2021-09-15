import express, { Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'
import { User, StoreUser } from '../models/user'
import dotenv from 'dotenv'
import  verifyAuthToken from '../middleware/verifyAuthToken'

dotenv.config();

//const { TOKEN_SECRET } = process.env

const Token =  process.env.TOKEN_SECRET || ''

const storeUser = new StoreUser()

const index = async (req: Request, res: Response) => {
    
    try {

        const user = await storeUser.index()
        res.json(user)

    }catch(err){
        res.status(400).json(err)
    }
    
}


const show = async (req: Request, res: Response) => {
    
    try {

        const user: User = await storeUser.show(Number(req.params.id))
        res.json(user)

    } catch (err) {
        res.status(400).json(err)
    }
    
}

const create = async (req: Request, res: Response) => {
    
    const user: User = {
        user_name: req.body.user_name,
        password_digest: req.body.password_digest,
    }

    try {
        const newUser = await storeUser.create(user)
        var token = jwt.sign({user: newUser}, Token)
        res.json(token)
    }
    catch (err) {
        res.status(400).json(err)
    }
}

const authenticate = async (req: Request, res: Response) => {
    
    const user: User = {
        user_name: req.body.user_name,
        password_digest: req.body.password_digest,
    }

    try{
        const u = await storeUser.authenticateUser(user)
        //added for verifying token
        var token = jwt.sign({user: u}, Token)
        res.json(token)
        //res.json(u)
    }
    catch (err) {
        res.status(401).json({err})
    }
}


const user_routes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index)
    app.get('/user/:id', verifyAuthToken, show)
    app.post('/user/authenticate', verifyAuthToken, authenticate)
    app.post('/user', create)
}


export default user_routes



