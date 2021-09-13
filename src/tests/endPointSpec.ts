import supertest from "supertest";
import app from '../server';

const request = supertest(app);

describe('Product routes Endpoint', () => {

    it('post create product', async done => {
        
        const response =  await request.post('/product');
        expect(response.status).toBe(401);
        done();

    });

    it('get index product', async (done) => {

        const resp = await request.get('/products'); 
        expect(resp.status).toBe(200);
        done();

    });

    it('get show product', async (done) => {

        const resp = await request.get('/product/3'); 
        expect(resp.status).toBe(200);
        done();
        
    });

});

describe('Users routes Endpoint', () => {

    it('post create user', async done => {
        
        const response =  await request.post('/user');
        expect(response.status).toBe(200);
        done();

    });

    it('get index users', async (done) => {

        const resp = await request.get('/users'); 
        expect(resp.status).toBe(401);
        done();

    });

    it('get show user', async (done) => {

        const resp = await request.get('/user/45'); 
        expect(resp.status).toBe(401);
        done();
        
    });

    it('post authenticate user', async done => {
        
        const response =  await request.post('/user/authenticate');
        expect(response.status).toBe(401);
        done();

    });

    

});

