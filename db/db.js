import { Request } from "tedious";
import { Connection } from "tedious";
import { validPlate } from "../utils/validators.js";
import { config } from "./dbConfig.js";

let connection;
let connected = false;

export const init = () => {
  connection = new Connection(config);

  connection.on("connect", (err) => {
    if (err) {
      console.error(err.message);
    } else {
      connected = true;
    }
  });
  connection.connect();
};

export const getFutureOrders = (onComplete) => {
  if (!connected) return;

  let data = [];

  const queryString =
    "SELECT DISTINCT TOP (100) [data] ,[Pojazdy].nrRejestracyjny ,[Kontrahenci].nazwaPelna FROM [integra].[dbo].[ZapisyTerminarzy] INNER JOIN [integra].[dbo].[Pojazdy] ON ZapisyTerminarzy.idPojazdy = Pojazdy.id INNER JOIN [integra].[dbo].[Kontrahenci] ON ZapisyTerminarzy.idKontrahenci = Kontrahenci.id WHERE [data] > GETDATE() AND YEAR([data]) = YEAR(GETDATE()) AND MONTH([data]) = MONTH(GETDATE()) ORDER BY [data]";
  const request = new Request(queryString, (err) => err && console.log(err));

  request.on("row", (columns) => {
    let row = [];
    columns.forEach((column) => row.push(column.value));
    if (validPlate(row[1])) {
      data.push({
        date: row[0],
        plate: row[1],
        customer: row[2],
      });
    }
  });

  request.on("requestCompleted", () => {
    onComplete(data);
  });

  connection.execSql(request);
};
