import client from "../database";

export type Order = {
    id ?: number;
    product_id ? : number;
    quantity: Number;
    user_id: number;
    status ?: string;
}

export class StoreOrder {

    async create(order: Order): Promise<Order> {

        try {
            
            const sql = 'INSERT INTO orders ( status, quantity, user_id ) VALUES($1, $2, $3) RETURNING *';

            const conn = await client.connect();

            const result = await conn.query(sql, [order.status, order.quantity, order.user_id]);

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

    async addProduct(quantity: number, orderId: number, productId: number): Promise<Order> {
        
        try {

        const orderStat: boolean =  await this.isOrderOpen(Number(orderId), Number(productId))

          if (orderStat === false){
            throw new Error(`Could not add proudct ${productId} to order ${orderId} because order status is close`)
          }
            

          const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
          
          const conn = await client.connect()
    
          const result = await conn
              .query(sql, [quantity, orderId, productId])
    
          const order = result.rows[0]
    

          conn.release()
    
          return order

        } catch (err) {
          throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
      }


      async isOrderOpen(orderId: number, productId: number): Promise<boolean> {

        try {

            const ordersql = 'SELECT * FROM orders WHERE id=($1)'
            
            const conn = await client.connect()
      
            const result = await conn.query(ordersql, [orderId])
      
            const order = result.rows[0]

            if (order.status === 'active' ||  order.status ==='Active')
                return true
            else
                return false
      

          } catch (err) {
            throw new Error(`${err}`)
          }

      }


}