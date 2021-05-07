const { it, describe, expect } = require("@jest/globals");

const { mockPayment } = require('../handler');

describe('integration test for mock payment lambda', () => {

    it('should respond with success upon invocation', async () => {

        const event = {};

        const response = await mockPayment(event);

        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body).message).toBe('success');
        expect(JSON.parse(response.body).data.id).toBeDefined();
        expect(JSON.parse(response.body).data.amount).toBeDefined();
        expect(JSON.parse(response.body).data.createdAt).toBeDefined();
        expect(JSON.parse(response.body).data.updatedAt).toBeDefined();
        
    })
});