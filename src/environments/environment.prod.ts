// Production environment.
// Replace every "REPLACE_ME_*" placeholder with real credentials before deploying.
// In CI/CD, prefer injecting these via a build-time script rather than committing
// real values to source control. See README.md → "Environment setup".
export const environment = {
  production: true,
  appName: 'Fatima Hope Foundation',
  appUrl: 'https://fatimahopefoundation.com',

  firebase: {
    apiKey: 'AIzaSyA-S_WvT0BkrNQ8YJxwaMvxJTIHD1Q4p38',
    authDomain: 'fatimahopefounation.firebaseapp.com',
    projectId: 'fatimahopefounation',
    storageBucket: 'fatimahopefounation.firebasestorage.app',
    messagingSenderId: '317588617940',
    appId: '1:317588617940:web:5ed7f27b05ab9bbba25941',
    measurementId: 'G-BJ3BKZ8S8N',
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
    email: 'helpinghandsfoundation086@gmail.com',
    website: 'https://fatimahopefoundation.com',
  },
};
