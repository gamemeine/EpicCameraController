import { Request } from "tedious";

export const queryFutureOrders = () => {
  const queryString =
    "SELECT TOP (50) [data] ,[Pojazdy].nrRejestracyjny ,[Kontrahenci].nazwaPelna, startRok, startMiesiac, startDzien FROM [integra].[dbo].[ZapisyTerminarzy] INNER JOIN [integra].[dbo].[Pojazdy] ON ZapisyTerminarzy.idPojazdy = Pojazdy.id INNER JOIN [integra].[dbo].[Kontrahenci] ON ZapisyTerminarzy.idKontrahenci = Kontrahenci.id ORDER BY [ZapisyTerminarzy].id DESC";

  return new Request(queryString, (err) => err && console.log(err));
};
