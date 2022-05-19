import { addUser } from "./camera/controller.js";
import { convertDate } from "./utils/date.js";

const startDate = convertDate(new Date());
const endDate = convertDate(new Date().setDate(new Date().getDate() + 7));
const plateNumber = "LOSOWY_NUMER";
const vehicleOwner = "Robot :~D";

await addUser(plateNumber, vehicleOwner, startDate, endDate)
  .then(() => console.log("Success!"))
  .catch((e) => console.error(e));
