import { Order, StoreOrder } from "../models/order"
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';


dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
const saltRounds = SALT_ROUNDS || '';

const productOrder= new StoreOrder();

describe("Order Model", () => {

    let currentOrder: Order
    let currentOrderId: number | undefined

    beforeAll(async () => {
        const order = await productOrder.create({
            //id: 'DEFAULT',
            status: 'active',
            quantity: 10,
            user_id: 5,
            
        });

        currentOrder = order;
        currentOrderId = order.id;
    });

    afterAll(async () => {
        await productOrder.deleteAllOrders();
    });

    it('Order Create should insert new order' , async () => {

        const orderToCompare: Order = {
            id: currentOrderId,
            status: 'active',
            user_id: 5,
            quantity: 10,
            
        }

        expect(orderToCompare).toEqual(currentOrder);
    })

    it('Order Index should return an array of orders', async () => {

        const orders = await productOrder.index();
        expect(orders.length).toBeGreaterThanOrEqual(0);
    })


    it('Order Show should retrieve order with specified ID' , async () => {

        const orderToSHOW: Order = {
            id: currentOrderId,
            status: 'active',
            user_id: 5,
            quantity: 10,
            
        }

        const order = await productOrder.show(Number(currentOrderId));

        expect(orderToSHOW).toEqual(order);
    })



})