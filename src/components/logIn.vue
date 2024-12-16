<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin" class="login-form">
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit" class="login-button">Login</button>
    </form>

    <div v-if="step === 'totp-setup'" class="totp-setup">
      <p>Scan this QR code in your OTP app:</p>
      <img :src="qrCode" alt="QR Code" class="qr-code" />
      <p>Or enter this key manually: {{ secretCode }}</p>
      <input v-model="otp" placeholder="Enter OTP to verify" />
      <button @click="confirmTOTP">Verify OTP</button>
    </div>

    <div v-if="step === 'mfa'" class="mfa">
      <input v-model="otp" placeholder="Enter OTP" />
      <button @click="confirmOTP">Submit OTP</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { signIn, enableTOTP, verifyTOTP } from '../services/auth';
import { provide } from 'vue';
import { useRouter } from 'vue-router';


export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const otp = ref('');
    const step = ref(''); // '' | 'totp-setup' | 'mfa'
    const secretCode = ref('');
    const qrCode = ref('');
    let cognitoUser = null;
    const router = useRouter();

    const handleLogin = async () => {
      try {
        const { result, user, mfaRequired } = await signIn(username.value, password.value);
        if (mfaRequired) {
          step.value = 'mfa';
          cognitoUser = user;
        } else if (result) {

          provide('currentUser', user);
          console.log('user', user)
          router.push({name: 'Trivia'})
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    };

    const enableTOTPSetup = async () => {
      try {
        const { secretCode: code, qrCode: qr } = await enableTOTP(cognitoUser);
        secretCode.value = code;
        qrCode.value = qr;
        step.value = 'totp-setup';
      } catch (error) {
        console.error('TOTP setup error:', error);
      }
    };

    const confirmTOTP = async () => {
      try {
        await verifyTOTP(cognitoUser, otp.value);
        console.log('TOTP setup complete!');
      } catch (error) {
        console.error('TOTP verification error:', error);
      }
    };

    const confirmOTP = async () => {
      try {
        cognitoUser.sendMFACode(otp.value, {
          onSuccess: (session) => {
            console.log('MFA successful, session:', session);
          },
          onFailure: (err) => {
            console.error('MFA failed:', err);
          },
        });
      } catch (error) {
        console.error('MFA confirmation error:', error);
      }
    };

    return {
      username,
      password,
      otp,
      step,
      secretCode,
      qrCode,
      handleLogin,
      enableTOTPSetup,
      confirmTOTP,
      confirmOTP,
    };
  },
};
</script>
<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  font-family: Arial, sans-serif;
}

.login-form,
.totp-setup,
.mfa {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

input[type="text"],
input[type="password"],
input[type="number"] {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

button {
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #4CAF50;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.qr-code {
  max-width: 100%;
  height: auto;
}

p {
  font-size: 14px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>