import 'dotenv/config';

export const envStripe = {
  apiKey: process.env.STRIPE_API_SECRET_KEY as string,
  appUrl: process.env.WEB_APP_URL as string,
  webhookSecret: process.env.WEB_HOOK_SECRET as string,
};

export const envConfig = {
  port: process.env.PORT || 8080,
};

export const envFirebase = {
  project_id: process.env.GOOGLE_PROJECT_ID,
};
