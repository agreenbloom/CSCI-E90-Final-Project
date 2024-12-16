// import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';

export const poolData = {
    ClientId: "xxxxx",
    UserPoolId: "us-east-1_xxxxx",
};

AWS.config.region = 'us-east-1';  // replace with your region


