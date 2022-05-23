import dotenv from "dotenv";
dotenv.config();

export const config = {
  server: process.env.DB_SERVER,
  authentication: {
    type: "default",
    options: {
      userName: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  },
  options: {
    database: "integra",
    port: +process.env.DB_PORT,
    trustServerCertificate: true,
    encrypt: true,
    cryptoCredentialsDetails: {
      minVersion: "TLSv1",
    },
  },
};
