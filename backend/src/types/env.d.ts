declare namespace NodeJS {
  interface ProcessEnv {
    TWILIO_ACCOUNT_SID: string;
    TWILIO_AUTH_TOKEN: string;
    TWILIO_PHONE_NUMBER: string;
    MONGO_URL: string;
    REDIS_URL: string;
    CORS_ORIGIN: string;
    PORT: string;
    SESSION_SECRET: string;
  }
}