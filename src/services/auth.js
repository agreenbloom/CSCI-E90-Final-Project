import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';

const poolData = {
    ClientId: "kruf65ga0thia6633rp3v5sbt",
    UserPoolId: "us-east-1_9Y8Uk5iig",
};

const userPool = new CognitoUserPool(poolData);


export function signIn(username, password) {
  const user = new CognitoUser({ Username: username, Pool: userPool });
  const authDetails = new AuthenticationDetails({ Username: username, Password: password });

  return new Promise((resolve, reject) => {
    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        resolve(result);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
}

export function signUp(username, email, password) {
    return new Promise((resolve, reject) => {
      const attributeList = [];
  
      // Add email attribute
      const emailAttribute = new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      });
  
      attributeList.push(emailAttribute);
  
      // Create the user in Cognito
      userPool.signUp(username, password, attributeList, null, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

export function getCurrentUser() {
  return userPool.getCurrentUser();
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
          }
        });
      });
    }
    return Promise.reject('User is not authenticated');
  }