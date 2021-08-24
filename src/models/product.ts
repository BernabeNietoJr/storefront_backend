import client from '../database';
import jwt from 'jsonwebtoken';

export type Product = {
    id ?: Number;
    name: string;
    price: Number;
    category: string;
}

export class StoreProduct {

    async index(): Promise<Product[]> {
        
        try {

            const conn = await client.connect();
            const sql = 'SELECT * FROM products';
            const result = await  conn.query(sql);

            conn.release();

            return result.rows;

        }
        catch(err) {
            throw new Error(`Cannot get products ${err}`);
        }
    }

    async show(id: Number): Promise<Product> {

        try {
            const sql = 'SELECT * FROM products WHERE id =($1)';

            const conn = await client.connect();
            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        
        }catch (err) {
            throw new Error(`Could not find book ${id}. Error: ${err}`);
        }

    }

    async create(prod: Product): Promise<Product> {
        try {
            
            const sql = 'INSERT INTO products ( name, price, category) VALUES($1, $2, $3) RETURNING *';

            const conn = await client.connect();

            const result = await conn.query(sql, [prod.name, prod.price, prod.category]);

            const product = result.rows[0];

            conn.release();
            
            return product;

        } catch (err) {
            throw new Error(`Could not create new product ${prod.name}. Error ${err}`);
        }
    }

    async deleteAll(): Promise<Product[]> {

        try {
            const deleteSql = 'DELETE FROM products WHERE id > 0';

            const conn = await client.connect();

            const result = await conn.query(deleteSql);

            const product = result.rows;

            conn.release();

            return product;

        }
        catch (err) {
            throw new Error(`Could not delete all products.  ${err}`);
        }
        
    }  

    async getNewlyInsertedProductId(): Promise<Product> {

        try {
            
            const sql = "SELECT CURRVAL(pg_get_serial_sequence('id')) ";

            const conn = await client.connect();

            const result = await conn.query(sql);

            const product = result.rows;

            conn.release();
            
            return product[0];

        } catch (err) {
            throw new Error(`Could not get newly inserted Product. ${err}`);
        }
    
    }
    
}