const braintree = require('braintree');

const {
    saveToDynamo,
    constructDynamoItem,
    responseWithError
} = require('./utils');

module.exports.mockPayment = async (event) => {

    const gateway = new braintree.BraintreeGateway({
        environment: braintree.Environment.Sandbox,
        merchantId: process.env.BRAINTREE_MERCHANT_ID,
        publicKey: process.env.BRAINTREE_PUBLIC_KEY,
        privateKey: process.env.BRAINTREE_PRIVATE_KEY
    });

    const nonceFromTheClient = 'fake-valid-nonce';

    return gateway.transaction.sale({
        amount: '10.00',
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true
        }
    }).then((result) => {

        const params = constructDynamoItem(result);

        return saveToDynamo(params);

    }).catch((err) => {
        console.error(err);
        responseWithError(err);
    });
};
