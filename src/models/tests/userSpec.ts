import { StoreUser, User } from "../user";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const { BCRYPT_PASSWORD, SALT_ROUNDS } =   process.env;
const saltRounds = SALT_ROUNDS || '';

const storeUser = new StoreUser()

describe('USER Model', () => {

    let newUserId: Number | undefined;
    let newUser: User;


    beforeAll(async () => {

        storeUser.deleteAllUsers();

        const result = await storeUser.create({
            user_name: 'user1',
            password_digest: 'password123'
        });

        newUserId = result.id;
        newUser = result;
         
    });

    afterAll( async () => {

        storeUser.deleteAllUsers()  

    })

    it('create should insert new user in db', async () => {

        const user: User = { 
                            id: Number(newUserId),
                            user_name: 'user1',
                            password_digest: bcrypt.compareSync('password123' + BCRYPT_PASSWORD, newUser.password_digest)?'password123':''
                        };

        expect(user).toEqual(newUser);
    });

    it('show should display the user with specific id', async () => {
        
        const result =  await storeUser.show(Number(newUserId));

        let user: User = {
            id: newUserId,
            user_name:  'user1',
            password_digest: bcrypt.compareSync('password123'+BCRYPT_PASSWORD, result.password_digest)?'password123':''
        }
        
        expect(result).toEqual(user);
    })



});