import 'reflect-metadata';
import { ExampleController } from '../../controllers/ExampleController';
import { expect, test, describe, beforeEach } from "bun:test";

describe('ExampleController', () => {
    let exampleController: ExampleController;

    beforeEach(() => {
        exampleController = new ExampleController();
    });

    test('should return "This is a public route" for publicExample', () => {
        const result = exampleController.publicExample();
        expect(result).toBe('This is a public route');
    });

    test('should return "This is a protected route" for protectedExample', () => {
        const result = exampleController.protectedExample();
        expect(result).toBe('This is a protected route');
    });

    test('should return "This route is for admins only" for adminExample', () => {
        const result = exampleController.adminExample();
        expect(result).toBe('This route is for admins only');
    });





});