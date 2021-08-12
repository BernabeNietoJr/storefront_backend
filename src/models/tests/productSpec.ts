import { Product, StoreProduct } from "../product"

const productStore = new StoreProduct()

describe('Book Model', () => {
    
    it('should have a product index method', () => {
        expect(productStore.index).toBeDefined();
    });

    it('should have a product show method', () => {
        expect(productStore.show).toBeDefined();
    });

    it('create method should add a product', async () => {
        const result = await productStore.create({
            id: 1,
            name: "Soy Sauce",
            price: 1.75,
            category: "Condiment"
        });

        expect(result).toEqual({
            id: 1,
            name: "Soy Sauce",
            price: 1.75,
            category: "Condiment"
        })
    });

});