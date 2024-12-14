import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';
import QRCode from 'qrcode';

export const poolData = {
    ClientId: "kruf65ga0thia6633rp3v5sbt",
    UserPoolId: "us-east-1_9Y8Uk5iig",
};

const userPool = new CognitoUserPool(poolData);
AWS.config.region = 'us-east-1';  // replace with your region
const identityPoolId = 'us-east-1:1c7d392d-24f1-4e55-a246-d2195b715bfd'; 

export function signIn(username, password) {
  const user = new CognitoUser({ Username: username, Pool: userPool });
  const authDetails = new AuthenticationDetails({ Username: username, Password: password });

  return new Promise((resolve, reject) => {
    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        resolve({ result, user });
      },
      onFailure: (err) => {
        reject(err);
      },
      mfaSetup: () => {
        resolve({ mfaRequired: true, user });
      },
    });
  });
}

export async function enableTOTP(user) {
  return new Promise((resolve, reject) => {
    user.associateSoftwareToken({
      onSuccess: (secretCode) => {
        const qrData = `otpauth://totp/YourAppName:${user.username}?secret=${secretCode}&issuer=YourAppName`;
        QRCode.toDataURL(qrData)
          .then((qrCode) => resolve({ secretCode, qrCode }))
          .catch(reject);
      },
      onFailure: reject,
    });
  });
}

export async function verifyTOTP(user, otpCode) {
  return new Promise((resolve, reject) => {
    user.verifySoftwareToken(otpCode, 'MyTOTPDevice', {
      onSuccess: resolve,
      onFailure: reject,
    });
  });
}
export function signUp(username, email, password) {
  const attributeList = [
    new CognitoUserAttribute({ Name: 'email', Value: email }),
  ];

  return new Promise((resolve, reject) => {
    userPool.signUp(username, password, attributeList, null, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

export function getCognitoUser(username) {
  return new CognitoUser({
    Username: username,
    Pool: userPool,
  });
}

export function getUserPool() {
  return userPool;
}

export function getCurrentUser() {
  return userPool.getCurrentUser();
}



export async function getGuestCredentials() {
  console.log('here')
  try {
    // Configure the AWS Cognito Identity service
    AWS.config.region = 'us-east-1'; // Replace with your AWS region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: identityPoolId,
    });

    // Refresh credentials to get a new session for the guest user
    await AWS.config.credentials.getPromise();

    // Extract the JWT token (identity ID) from the credentials
    const guestToken = AWS.config.credentials.identityId;

    console.log('Guest Token (Identity ID):', guestToken);

    // You can use the credentials for other AWS services (optional)
    const temporaryCredentials = AWS.config.credentials;
    console.log('Temporary AWS Credentials:', temporaryCredentials);

    return guestToken;
  } catch (error) {
    console.error('Error fetching guest credentials:', error);
    throw error;
  }
}

export function signOut() {
  const currentUser = getCurrentUser();
  if (currentUser) {
    currentUser.signOut();
  }
}

// Request forgot password (send reset code)
export function forgotPassword(username) {
  const user = new CognitoUser({ Username: username, Pool: userPool });

  return new Promise((resolve, reject) => {
    user.forgotPassword({
      onSuccess: (data) => resolve(data),
      onFailure: (err) => reject(err),
    });
  });
}

// Confirm forgot password with the code and new password
export function confirmForgotPassword(username, verificationCode, newPassword) {
  const user = new CognitoUser({ Username: username, Pool: userPool });

  return new Promise((resolve, reject) => {
    user.confirmPassword(verificationCode, newPassword, {
      onSuccess: (data) => resolve(data),
      onFailure: (err) => reject(err),
    });
  });
}

export function getIdToken() {
    const currentUser = getCurrentUser();
    if (currentUser) {
      return new Promise((resolve, reject) => {
        currentUser.getSession((err, session) => {
          if (err) {
            reject(err);
          } else {
            resolve(session.getIdToken().getJwtToken()); // Return the JWT token
            console.log('token', session.getIdToken().getJwtToken())
          }
        });
      });
    }
    return Promise.reject('User is not authenticated');
  }