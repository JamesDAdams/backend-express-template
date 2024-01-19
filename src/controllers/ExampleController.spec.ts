import 'reflect-metadata';
import { ExampleController } from './ExampleController';
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

});