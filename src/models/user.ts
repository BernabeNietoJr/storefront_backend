import client from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } =   process.env;

const saltRounds  = SALT_ROUNDS || '';
const pepper = BCRYPT_PASSWORD || '';

export type User = {
    id ?: Number;
    user_name: string;
    password_digest: string;
}

export class StoreUser {
   
    async index(): Promise<User[]> {
        
        try {

            const conn = await client.connect();
            const sql = 'SELECT * FROM store_users';
            const result = await  conn.query(sql);

            conn.release();

            return result.rows;

        }
        catch(err) {
            throw new Error(`Cannot get Store Users ${err}`);
        }
    }


    async show(id: Number): Promise<User> {

        try {
            const sql = 'SELECT * FROM store_users WHERE id =($1)';

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
            
            const sql = 'INSERT INTO store_users ( user_name, password_digest ) VALUES($1, $2) RETURNING *';

            const conn = await client.connect();

            // const hash: string = bcrypt.hashSync(
            //     user.password_digest + BCRYPT_PASSWORD,
            //     parseInt(saltRounds)
            // );

            const hash = this.createHash(user.password_digest, pepper, parseInt(saltRounds))

            const result = await conn.query(sql, [user.user_name, hash]);

            const u = result.rows[0];

            conn.release();
            
            return u;

        } catch (err) {
            throw new Error(`Could not create new user ${user.user_name}. Error ${err}`);
        }
    }

    async authenticateUser(userLoggIn: User): Promise<User | null> {

        try {

            const conn = await client.connect();
            const sql = 'SELECT * FROM store_users WHERE user_name=($1)';

            // const user: User = {
            //     user_name: username,
            //     password_digest: password
            // } 
            
            const result = await conn.query(sql, [userLoggIn.user_name]);
        
            console.log(userLoggIn.password_digest+pepper);
    
            if(result.rows.length) {
    
                const user = result.rows[0];
    
                console.log(user);
    
                if (this.comparePasswordHash(userLoggIn.password_digest, pepper, user.password_digest)) {
                    return user;
                }
            }

            return null;

        }catch (err){
          throw new Error(`Unauthorize User ${err}`);
        }
        
    }

    async deleteAllUsers(): Promise<User[]> {

        try {

            const deleteSql = 'DELETE FROM store_users WHERE id > 0';

            const conn = await client.connect();

            const result = await conn.query(deleteSql);

            const user = result.rows;

            conn.release();

            return user;

        }
        catch (err) {
            throw new Error(`Could not delete all user.  ${err}`);
        }
        
    }  

     createHash(password: string, tok_secret: string, saltSize: number): string {
        
        try {

            const hash: string = bcrypt.hashSync(
                password + tok_secret,
                saltSize
            );

            return hash
            
        } catch (err) {
            throw new Error(`Could not create a hash. ${err}`)
        }

    }

    comparePasswordHash( password: string, pepper: string, pword_digest: string): boolean {

        if (bcrypt.compareSync(password+pepper, pword_digest)) 
            return true
        else
            return false
    }


}