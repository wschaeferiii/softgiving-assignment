# Softgiving Assingment: Mock Payment Lambda

## What is it:
A simple lambda that executes a mock transaction from Braintree and saves the results to a DynamoDB Table.  Built using the Serverless framework.

## How to test:
0. Make sure you have NodeJS, Jest, and Serverless installed globally in your shell.
1. Make sure you have a Serverless Account linked to your machine.
2. Make sure have valid AWS credentials saved on your machine (usually in `~/.aws/credentials`) that can spin up DynamoDB Tables and Lambdas.
3. Generate Braintree sandbox credentials and enter them in the `serverless.yml` respectively.
4. Enter a name for your DynamoDB Table in the `serverless.yml` file under functions -> mockPayment -> environment.
5. Enter the same values (Braintree credentials and DyanmoDB table name) in the `test` command in `package.json`.
6. Run `npm install` in a terminal shell.
7. `serverless deploy`
8. Run `npm test`.
9. Once you are done testing you may want to clean up your aws resources by running `sls remove` in your terminal and also delete them off your serverless dashboard.

## Improvements
In the interest of brevity and simplicity, there are a lot of missing pieces that normally go into a project.  Things that I would add:
* A proper event trigger for the lambda such as SNS or API Gateway that accepts parameters such as payment amounts or usernames.
* More defined AWS IAM Roles
* More test cases
