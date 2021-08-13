import { Product, StoreProduct } from "../product"

const productStore = new StoreProduct()

describe('PRODUCT Model', () => {
    
    it('should have a product index method', () => {
        expect(productStore.index).toBeDefined();
    });

    it('should have a product show method', () => {
        expect(productStore.show).toBeDefined();
    });

    it('create method should add a product', async () => {
        const result = await productStore.create({
            //id: 'DEFAULT',
            name: 'Soy Sauce',
            price: 1.75,
            category: 'Condiment'
        });

        expect(result.name).toEqual('Soy Sauce');
    });

    it('index method should return a list of products', async () => {

        const result = await productStore.index();
        expect(result.length).toBeGreaterThan(0);

      });


      it('show method should return the correct product', async () => {
        const result = await productStore.show("1");
        expect(result).toEqual({
            id: 1,
            name: 'Soy Sauce',
            price: 1.75,
            category: 'Condiment'
        });
      });

      it('should delete all product', async () => {

        const result = await productStore.deleteAll();

        expect(result).toEqual([]);

      });

});