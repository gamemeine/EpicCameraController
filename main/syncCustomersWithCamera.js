import {
  addMultipleCustomers,
  getAddedCustomers,
} from "../camera/controller.js";
import { getFutureCustomers } from "../db/db.js";
import logger from "../utils/logger.js";

export const syncCustomersWithCamera = async () => {
  const addedCustomers = await getAddedCustomers();
  const futureCustomers = await getFutureCustomers();

  const notAddedCustomers = futureCustomers.filter(
    (x) => !addedCustomers.includes(x.plate)
  );

  if (notAddedCustomers == null) {
    logger.info("No new customers to add");
    return;
  }

  await addMultipleCustomers(notAddedCustomers);

  logger.info("Added customers(Propably):%o", futureCustomers);
};
