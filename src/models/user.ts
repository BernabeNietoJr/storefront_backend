import client from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } =   process.env;

const saltRounds  = SALT_ROUNDS || '';

export type User = {
    id ?: Number;
    user_name: string;
    password_digest: string;
}

export class StoreUser {
   
    async index(): Promise<User[]> {
        
        try {

            const conn = await client.connect();
            const sql = 'SELECT * FROM users';
            const result = await  conn.query(sql);

            conn.release();

            return result.rows;

        }
        catch(err) {
            throw new Error(`Cannot get Store Users ${err}`);
        }
    }


    async show(id: string): Promise<User> {

        try {
            const sql = 'SELECT * FROM users WHERE id =($1)';

            const conn = await client.connect();
            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        
        }catch (err) {
            throw new Error(`Could not find specific Store User ${id}. Error: ${err}`);
        }

    }


    async create(user: User): Promise<User> {
        try {
            
            const sql = 'INSERT INTO users ( user_name, password_digest ) VALUES($1, $2, $3) RETURNING *';

            const conn = await client.connect();

            const hash = bcrypt.hashSync(
                user.password_digest + BCRYPT_PASSWORD,
                parseInt(saltRounds)
            );

            const result = await conn.query(sql, [user.user_name, hash]);

            const u = result.rows[0];

            conn.release();
            
            return u;

        } catch (err) {
            throw new Error(`Could not create new user ${user.user_name}. Error ${err}`);
        }
    }

    async authenticateUser(username: string, password: string): Promise<User | null> {

        const conn = await client.connect();
        const sql = 'SELECT password_digest FROM users WHERE username=($1)';
    
        const result = await conn.query(sql, [username]);
    
        console.log(password+BCRYPT_PASSWORD);
    
        if(result.rows.length) {
    
          const user = result.rows[0];
    
          console.log(user);
    
          if (bcrypt.compareSync(password+BCRYPT_PASSWORD, user.password_digest)) {
            return user;
          }
        }
    
        return null;
    }

}