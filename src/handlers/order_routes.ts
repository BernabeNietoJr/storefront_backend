import { Order, StoreOrder } from '../models/order';
import express, { Request, Response } from 'express';
import verifyAuthToken from '../middleware/verifyAuthToken';

const orderStore = new StoreOrder();

const index = async ( req: Request, res: Response ) => {

    try {
        
        const orders = await orderStore.index()

        res.json(orders);

    } catch (err) {
        
        res.status(400).json(err);

    }

};


const show = async ( req: Request, res: Response ) => {

    try {

        const id = Number(req.params.id);
        
        const order = await orderStore.show(id)
        
        res.json(order)

    } catch (err) {
        res.status(400).json(err)
    }

}



const create = async ( req: Request, res: Response ) => {

    try {

        const order: Order = {
            status: req.body.status,
            quantity: req.body.quantity,
            user_id: req.body.user_id,
        }

        const newOrder = await orderStore.create(order);

        res.json(newOrder);
        
    } catch (err) {
        res.status(400).json(err)
    }
}

const addProduct = async (req: Request, res: Response) => {

    // const orderId: number = Number(req.params.order_id);
    // const productId: number = Number(req.params.product_id);
    // const quantity: number = parseInt(req.body.quantity)

    const orderId = (req.params.id);
    const productId  = (req.body.productId);
    const quantity = req.body.quantity;

    console.log(orderId)
    console.log(productId)
    console.log(quantity)

    try {

        const addProdToOrder = await orderStore.addProduct(quantity, Number(orderId), Number(productId))

        res.json(addProdToOrder)

    } catch (error) {

        res.status(400).json(error)

    }
}


const order_routes = (app: express.Application) => {

    app.get('/orders', verifyAuthToken, index)
    app.get('/order/:id', verifyAuthToken, show)
    app.post('/order', verifyAuthToken, create)
    app.post('/orders/:id/product', verifyAuthToken, addProduct)

}

export default order_routes