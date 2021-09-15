import express, { Request, Response } from 'express'
import verifyAuthToken from '../middleware/verifyAuthToken'
import { Product, StoreProduct } from '../models/product'

const productStore = new StoreProduct()

const index = async (_req: Request, res: Response) => {
    
    try { 
        
        const product = await productStore.index()
        res.json(product)
    }
    catch (err) {
        res.status(400).json(err)
    }
}

const show = async (req: Request, res: Response) => {
    try {
        
        const prod_id: number = Number(req.params.id)
        const product = await productStore.show(prod_id)
        res.json(product)

    }
    catch (err) {
        res.status(400).json(err)
    }
}





const create = async (req: Request, res: Response) => {
    
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        }

        const newProduct = await productStore.create(product)
        res.json(newProduct)

    } catch(err){
        res.status(400)
        res.json(err)
    }
}

const product_routes = (app: express.Application) => {

    app.get('/products', index)
    app.get('/product/:id', show)
    app.post('/product', verifyAuthToken, create)

}

export default product_routes