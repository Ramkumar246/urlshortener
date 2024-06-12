import { Client, Account, Functions } from 'appwrite';

export const client = new Client();
const functions = new Functions(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('666927680026e4e78388');
    // .setProject('6669272e002ca63a81e4'); // Replace with your project ID
    const data = {
        "originalURL": "https://agilecyber.com",
        "user_id": "66694ad10002a9d51628",
        "custom_alias":null ,
        "expiration_time":"2024-06-12 01:01:10"
    }
    const promise = functions.createExecution(
        '6669622d002e44cf3510',  // functionId
        data,  // body (optional)
        false,  // async (optional)
        '<PATH>',  // path (optional)
        'POST',  // method (optional)
        {} // headers (optional)
    );
    promise.then(function (response) {
        console.log(response); // Success
    }, function (error) {
        console.log(error); // Failure
    });

export const account = new Account(client);
export { ID } from 'appwrite';
