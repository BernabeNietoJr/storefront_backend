import { Product, StoreProduct } from "../product"

const productStore = new StoreProduct()

describe('Book Model', () => {
    
    it('should have a product index method', () => {
        expect(productStore.index).toBeDefined();
    });

    it('should have a product show method', () => {
        expect(productStore.show).toBeDefined();
    });

});