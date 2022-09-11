"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../model/orders");
const products_1 = require("../model/products");
const user_1 = require("../model/user");
const store = new orders_1.OrderStore();
const store2 = new products_1.ProductsStore();
const store3 = new user_1.Usernn();
describe('products Model', () => {
    it('should have an index method', () => {
        expect(store2.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store2.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store2.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(store2.delete).toBeDefined();
    });
    it('create method should add a products', async () => {
        const result = await store2.create({
            id: 1,
            name: 'kero',
            price: 300
        });
        expect(result).toEqual({
            id: 1,
            name: 'kero',
            price: 300
        });
    });
    it('index method should return a list of products', async () => {
        const result = await store2.index();
        expect(result).toEqual([{
                id: 1,
                name: 'kero',
                price: 300
            }]);
    });
    it('show method should return the correct products', async () => {
        const result = await store2.show('1');
        expect(result).toEqual({
            id: 1,
            name: 'kero',
            price: 300
        });
    });
    // it('delete method should remove theproducts', async () => {
    //   await store2.delete('1')
    //   const result = await store2.index()
    //   expect(result).toEqual([])
    // })
});
describe('user Model', () => {
    it('should have an index method', () => {
        expect(store3.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store3.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store3.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(store3.delete).toBeDefined();
    });
    it('create method should add a user', async () => {
        const result = await store3.create({
            id: 1,
            username: 'kero',
            password: 'hello',
            firstname: 'kerolos',
            lastname: 'hanna'
        });
        expect(result.id).toEqual(1);
        expect(result.username).toEqual('kero');
        expect(result.password).not.toEqual('hello');
        expect(result.firstname).toEqual('kerolos');
        expect(result.lastname).toEqual('hanna');
    });
    it('index method should return a list of user', async () => {
        const result = await store3.index();
        expect(result[0].id).toEqual(1);
        expect(result[0].username).toEqual('kero');
        expect(result[0].password).not.toEqual('hello');
        expect(result[0].firstname).toEqual('kerolos');
        expect(result[0].lastname).toEqual('hanna');
    });
    it('show method should return the correct user', async () => {
        const result = await store3.show('1');
        expect(result.id).toEqual(1);
        expect(result.username).toEqual('kero');
        expect(result.password).not.toEqual('hello');
        expect(result.firstname).toEqual('kerolos');
        expect(result.lastname).toEqual('hanna');
    });
    // it('delete method should remove theuser', async () => {
    //   await store3.delete('1')
    //   const result = await store3.index()
    //   expect(result).toEqual([])
    // })
});
describe('order Model without delete', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a showcurrent method', () => {
        expect(store.showcurrent).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });
    it('create method should add a order', async () => {
        const result = await store.create({
            id: 1,
            status: 'open',
            user_id: '1',
            products_id: '1',
            quantity: 30
        });
        expect(result).toEqual({
            id: 1,
            status: 'open',
            user_id: '1',
            products_id: '1',
            quantity: 30
        });
    });
    it('index method should return a list of orders', async () => {
        const result = await store.index();
        expect(result).toEqual([{
                id: 1,
                status: 'open',
                user_id: '1',
                products_id: '1',
                quantity: 30
            }]);
    });
    it('show method should return the correct order', async () => {
        const result = await store.showcurrent('1');
        expect(result).toEqual({
            id: 1,
            status: 'open',
            user_id: '1',
            products_id: '1',
            quantity: 30
        });
    });
    // it('delete method should remove the order', async () => {
    //   await store.delete('1')
    //   const result = await store.index()
    //   expect(result).toEqual([])
    // })
});
describe('delete', () => {
    it('should delete orders', async () => {
        await store.delete('1');
        const result = await store.index();
        expect(result).toEqual([]);
    });
    it('should delete user', async () => {
        await store3.delete('1');
        const result = await store3.index();
        expect(result).toEqual([]);
    });
    it('should delete products', async () => {
        await store2.delete('1');
        const result = await store2.index();
        expect(result).toEqual([]);
    });
});
