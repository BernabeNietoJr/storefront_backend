import { Product, StoreProduct } from "../product"

const productStore = new StoreProduct()

describe('PRODUCT Model', () => {

    let current_id: Number | unknown;
    let product_justInserted : Product;

    //need to run this before all test so that
    //show and index method will not fail test
    beforeAll( async () => {
        const result = await productStore.create({
            //id: 'DEFAULT',
            name: 'Soy Sauce',
            price: 1.75,
            category: 'Condiment'
        });

        //current_id = productStore.
        product_justInserted = result;
        current_id =  productStore.getNewlyInsertedProductId; //result.id 
    });

    afterAll( async () => {
         await productStore.deleteAll();
    });
    
    it('should have a product index method', () => {
        expect(productStore.index).toBeDefined();
    });

    it('should have a product show method', () => {
        expect(productStore.show).toBeDefined();
    });

    it('create method should add a product', async () => {
        // const result = await productStore.create({
        //     //id: 'DEFAULT',
        //     name: 'Soy Sauce',
        //     price: 1.75,
        //     category: 'Condiment'
        // });

        //current_id = result.id;

        expect(current_id).toEqual(product_justInserted.id);
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