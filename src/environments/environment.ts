// Development environment.
// Replace every "REPLACE_ME_*" placeholder with real credentials before running
// against a live Firebase project or Stripe account. See README.md → "Environment setup".
export const environment = {
  production: false,
  appName: 'Fatima Hope Foundation',
  appUrl: 'http://localhost:4200',

  firebase: {
    apiKey: 'REPLACE_ME_FIREBASE_API_KEY',
    authDomain: 'REPLACE_ME.firebaseapp.com',
    projectId: 'REPLACE_ME_PROJECT_ID',
    storageBucket: 'REPLACE_ME.appspot.com',
    messagingSenderId: 'REPLACE_ME_SENDER_ID',
    appId: 'REPLACE_ME_APP_ID',
    measurementId: 'REPLACE_ME_MEASUREMENT_ID',
  },

  // Publishable key only — the secret key must NEVER be shipped to the client.
  // It belongs in the Cloud Functions config (see functions/README.md).
  stripe: {
    publishableKey: 'REPLACE_ME_STRIPE_PUBLISHABLE_KEY',
    // Cloud Function HTTPS endpoint that creates a Checkout Session.
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
