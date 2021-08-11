import client from "../database";

export type Product = {
    id: Number;
    name: string;
    price: Number;
    category: string;
}

export class StoreProduct {

    async index(): Promise<Product[]> {
        
        try {

            const conn = await client.connect();
            const sql = 'SELECT * FROM product';
            const result = await  conn.query(sql);

            conn.release();

            return result.rows;

        }
        catch(err) {
            throw new Error(`Cannot get products ${err}`);
        }
    }

    async show(id: string): Promise<Product> {

        try {
            const sql = 'SELECT * FROM product WHERE id =($1)';

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
            const sql = 'INSERT INTO product (id, name, price, category) VALUES($1, $2, $3, $4) RETURNING *';

            const conn = await client.connect();

            const result = await conn.query(sql, [prod.id, prod.name, prod.price, prod.category]);

            const product = result.rows[0];

            conn.release();
            
            return product;

        } catch (err) {
            throw new Error(`Could not add new product ${prod.name}. Error ${err}`);
        }
    }

}