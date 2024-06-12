import { Client, Account, Functions } from 'appwrite';

export const client = new Client();
const functions = new Functions(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    // .setProject('666927680026e4e78388');
    .setProject('6669272e002ca63a81e4'); // Replace with your project ID
   
    // const promise = functions.createExecution(
    //     '66692e8b0005956f7ba5',  // functionId
    //     '<BODY>',  // body (optional)
    //     false,  // async (optional)
    //     '<PATH>',  // path (optional)
    //     'GET',  // method (optional)
    //     {} // headers (optional)
    // );
    // promise.then(function (response) {
    //     console.log(response); // Success
    // }, function (error) {
    //     console.log(error); // Failure
    // });

export const account = new Account(client);
export { ID } from 'appwrite';
