// Production environment.
// Replace every "REPLACE_ME_*" placeholder with real credentials before deploying.
// In CI/CD, prefer injecting these via a build-time script rather than committing
// real values to source control. See README.md → "Environment setup".
export const environment = {
  production: true,
  appName: 'Fatima Hope Foundation',
  appUrl: 'https://fatimahopefoundation.com',

  firebase: {
    apiKey: 'REPLACE_ME_FIREBASE_API_KEY',
    authDomain: 'REPLACE_ME.firebaseapp.com',
    projectId: 'REPLACE_ME_PROJECT_ID',
    storageBucket: 'REPLACE_ME.appspot.com',
    messagingSenderId: 'REPLACE_ME_SENDER_ID',
    appId: 'REPLACE_ME_APP_ID',
    measurementId: 'REPLACE_ME_MEASUREMENT_ID',
  },

  stripe: {
    publishableKey: 'REPLACE_ME_STRIPE_PUBLISHABLE_KEY',
    createCheckoutSessionUrl: 'REPLACE_ME_CLOUD_FUNCTION_URL/createCheckoutSession',
  },

  bankTransfer: {
    bankName: 'Allied Bank',
    accountTitle: 'Muhammad Imran',
    accountNumber: '09580010131306030025',
  },

  contact: {
    phone: '0301-6107018',
    whatsapp: '923016107018',
    email: 'info@fatimahopefoundation.com',
    website: 'https://fatimahopefoundation.com',
  },
};
