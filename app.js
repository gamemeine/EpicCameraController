import dotenv from "dotenv";
import logger from "./utils/logger.js";
import { syncCustomersWithCamera } from "./main/syncCustomersWithCamera.js";

//config
dotenv.config();

const interval = process.env.SYNC_INTERVAL || 30;
setInterval(() => syncCustomersWithCamera(), interval * 60 * 1000);

logger.info("App successfully started!");
