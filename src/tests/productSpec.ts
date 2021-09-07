import { Product, StoreProduct } from "../models/product"
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';


dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
const saltRounds = SALT_ROUNDS || '';

const productStore = new StoreProduct()


describe('PRODUCT Model', () => {

    let current_id: Number | undefined;
    let product_justInserted: Product;

    //need to run this before all test so that
    //show and index method will not fail test
    beforeAll(async () => {
        const result = await productStore.create({
            //id: 'DEFAULT',
            name: 'Soy Sauce',
            price: 1.75,
            category: 'Condiment'
        });

        product_justInserted = result;
        current_id = result.id //productStore.getNewlyInsertedProductId; //result.id 
    });

    afterAll(async () => {
        await productStore.deleteAll();
    });

    it('should have a product index method', () => {
        expect(productStore.index).toBeDefined();
    });

    it('should have a product show method', () => {
        expect(productStore.show).toBeDefined();
    });

    it('create method should add a product', async () => {
        
        const prod: Product = {
            id: current_id,
            name: 'Soy Sauce',
            price: 1.75,
            category: 'Condiment'
        } 
        //expect(current_id).toEqual(product_justInserted.id);
        expect(prod).toEqual(product_justInserted);
    });

    it('index method should return a list of products', async () => {

        const result = await productStore.index();
        expect(result.length).toBeGreaterThan(0);

    });


    it('show method should return the correct product', async () => {
        const result = await productStore.show(Number(current_id));
        expect(result).toEqual({
            id: Number(current_id),
            name: 'Soy Sauce',
            price: 1.75,
            category: 'Condiment'
        });
    });


});

// describe('Product routes Endpoint', () => {

//     it('post create product', async done => {
//         //const await Request.post('/product', create)
//     });

// });

