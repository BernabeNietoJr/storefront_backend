import client from "../database";

export type Order = {
    id ?: Number;
    product_id: Number;
    quantity: Number;
    user_id: Number;
    status: string;
}

export class StoreOrder {

    async create(order: Order): Promise<Order> {
        try {
            
            const sql = 'INSERT INTO orders ( prod_id, quantity, user_id) VALUES($1, $2, $3) RETURNING *';

            const conn = await client.connect();

            const result = await conn.query(sql, [order.product_id, order.quantity, order.user_id]);

            const product = result.rows[0];

            conn.release();
            
            return product;

        } catch (err) {
            throw new Error(`Could not create new order ${order.product_id}. Error ${err}`);
        }
    }



    async index(): Promise<Order[]> {
        
        try {

            const conn = await client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await  conn.query(sql);

            conn.release();

            return result.rows;

        }
        catch(err) {
            throw new Error(`Cannot get orders ${err}`);
        }
    }



    async show(id: Number): Promise<Order> {

        try {
            const sql = 'SELECT * FROM orders WHERE id =($1)';

            const conn = await client.connect();
            const result = await conn.query(sql, [id]);

            return result.rows[0];

            conn.release();
        
        }catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`);
        }

    }


    async deleteAllOrders(): Promise<Order[]> {

        try {
            const deleteSql = 'DELETE FROM orders WHERE id > 0';

            const conn = await client.connect();

            const result = await conn.query(deleteSql);

            const product = result.rows;

            conn.release();

            return product;

        }
        catch (err) {
            throw new Error(`Could not delete all orders.  ${err}`);
        }
        
    }  


}