import express, { Request, Response } from 'express'
import { Product, StoreProduct } from '../models/product'

const productStore = new StoreProduct()

const index = async (_req: Request, res: Response) => {
    const product = await productStore.index()
    res.json(product)
}

const show = async (req: Request, res: Response) => {
    const product = await productStore.show(req.body.id)
    res.json(product)
}

const create = async (req: Request, res: Response) => {
    
    try {
        const product: Product = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
        }

        const newProduct = await productStore.create(product)
        res.json(newProduct)

    } catch(err){
        res.status(400).json(err)
    }
}

const prod_routes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/product/:id', show)
    app.post('/products', create)
}

export default prod_routes