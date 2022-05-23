import { addMultipleUsers, getAddedUsers } from "./camera/controller.js";
import { getFutureOrders, init } from "./db/db.js";
import dotenv from "dotenv";

//config
dotenv.config();

//db connection
init();

const refreshMinuteInterval = 10;

setTimeout(
  () =>
    getFutureOrders(async (orders) => {
      if (orders == null) return;

      const notAddedUsers = [];
      const addedUsers = await getAddedUsers();

      for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        if (!addedUsers.includes(order.plate)) notAddedUsers.push(order);
      }

      await addMultipleUsers(notAddedUsers);
    }),
  refreshMinuteInterval * 60 * 1000
);
