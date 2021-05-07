const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

function saveToDynamo(params) {
    return new Promise((resolve, reject) => {
        dynamoDb.put(params, (error) => {
            if (error) {
                console.error(error);
                reject(responseWithError(error));
            }

            resolve(responseWithSuccess(params.Item));
        });
    });
}

function constructDynamoItem(braintreeResult) {

    return braintreeResult && braintreeResult.transaction && braintreeResult.transaction.id ?
        {
            TableName: process.env.DYNAMODB_TABLE,
            Item: {
                id: braintreeResult.transaction.id,
                amount: braintreeResult.transaction.amount,
                createdAt: braintreeResult.transaction.createdAt,
                updatedAt: braintreeResult.transaction.updatedAt,
            }
        }
    : Promise.reject('Not a valid braintree transaction');
}

function responseWithError(err) {

    return {
        statusCode: 400,
        body: JSON.stringify({ message: err})
    };
}

function responseWithSuccess(data) {

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'success', data: data })
    };
}

module.exports = { 
    saveToDynamo,
    constructDynamoItem,
    responseWithSuccess,
    responseWithError
};