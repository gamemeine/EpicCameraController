import sql from "mssql";
import { validatePlate } from "../utils/validators.js";
import { config } from "./dbConfig.js";
import logger from "../utils/logger.js";

const queryString =
  "SELECT DISTINCT TOP (100) [data] As date ,[Pojazdy].nrRejestracyjny As plate,[Kontrahenci].nazwaPelna As customer FROM [integra].[dbo].[ZapisyTerminarzy] INNER JOIN [integra].[dbo].[Pojazdy] ON ZapisyTerminarzy.idPojazdy = Pojazdy.id INNER JOIN [integra].[dbo].[Kontrahenci] ON ZapisyTerminarzy.idKontrahenci = Kontrahenci.id WHERE [data] > GETDATE() AND YEAR([data]) = YEAR(GETDATE()) AND MONTH([data]) = MONTH(GETDATE()) ORDER BY [data]";

sql.on("error", (err) => {
  logger.warn(err);
});

export const getFutureCustomers = async () =>
  await sql
    .connect(config)
    .then((pool) => {
      return pool.request().query(queryString);
    })
    .then((result) => result.recordset)
    .then((result) => result.filter((x) => validatePlate(x.plate)))
    .catch((err) => {
      logger.warn(err);
    });
