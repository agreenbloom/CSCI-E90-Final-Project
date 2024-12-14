<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>

    <div v-if="step === 'totp-setup'">
      <p>Scan this QR code in your OTP app:</p>
      <img :src="qrCode" alt="QR Code" />
      <p>Or enter this key manually: {{ secretCode }}</p>
      <input v-model="otp" placeholder="Enter OTP to verify" />
      <button @click="confirmTOTP">Verify OTP</button>
    </div>

    <div v-if="step === 'mfa'">
      <input v-model="otp" placeholder="Enter OTP" />
      <button @click="confirmOTP">Submit OTP</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { signIn, enableTOTP, verifyTOTP } from '../services/auth';

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const otp = ref('');
    const step = ref(''); // '' | 'totp-setup' | 'mfa'
    const secretCode = ref('');
    const qrCode = ref('');
    let cognitoUser = null;

    const handleLogin = async () => {
      try {
        const { result, user, mfaRequired } = await signIn(username.value, password.value);
        if (mfaRequired) {
          step.value = 'mfa';
          cognitoUser = user;
        } else if (result) {
          console.log('Logged in:', result);
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
