import puppeteer from "puppeteer";

export const addUser = async (
  plateNumber,
  vehicleOwner,
  startDate,
  endDate
) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(process.env.CAMERA_DASHBOARD_URL);

  //login
  await page.type("#login_user", process.env.CAMERA_DASHBOARD_LOGIN);
  await page.type("#login_psw", process.env.CAMERA_DASHBOARD_PASSWORD);
  await page.click(
    "#login > div.login-container > div > div.i-nothing.login-inputbox.fn-clear > form > div.ui-button-box.login-btnbox > a:nth-child(1)"
  );
  //settings
  await page.waitForTimeout(1000);
  await page.click("#sys_main > li:nth-child(4)");

  //block and allow list
  await page.waitForTimeout(1000);
  await page.click("#set-menu > li:nth-child(1) > ul > li:nth-child(5)");

  //allowlist
  await page.waitForTimeout(1000);
  await page.click("#page_blackWhiteListsConfig > ul > li:nth-child(2)");

  //add
  await page.waitForTimeout(1000);
  await page.click(
    "#page_blackWhiteListsConfig > div > div.tab-panel.ui-form.current > div:nth-child(9) > a:nth-child(2)"
  );

  //platenumber
  await page.waitForTimeout(1000);
  await page.type("#bw_add_plateNumber", plateNumber);

  //cardId
  await page.type("#bw_add_cardID", "1");

  //startDate
  await page.evaluate(() => {
    const input = document.querySelector("#bw_add_beginTime");
    input.readOnly = false;
    input.value = "";
  });
  await page.type("#bw_add_beginTime", startDate);

  //endDate
  await page.evaluate(() => {
    const input = document.querySelector("#bw_add_cancelTime");
    input.readOnly = false;
    input.value = "";
  });
  await page.type("#bw_add_cancelTime", endDate);

  //vehicleOwner
  await page.type("#bw_add_masterOfCar", vehicleOwner);

  //save
  await page.click("#bw_add_plateNumber");
  await page.waitForTimeout(100);
  await page.click("#bw_add_content > div.u-dialog-foot > a:nth-child(2)");

  //leave
  await browser.close();
};
