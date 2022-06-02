import dotenv from "dotenv";

//config
dotenv.config();

export const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    port: +process.env.DB_PORT, //as number
    encrypt: false, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
    cryptoCredentialsDetails: {
      minVersion: "TLSv1",
    },
  },
};
