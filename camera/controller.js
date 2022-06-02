import puppeteer from "puppeteer";
import { convertDate } from "../utils/date.js";

const elementInteractionTimeout = 2500; //in ms

export const getAddedCustomers = async () => {
  const browser = await puppeteer.launch({
    // headless: false,
  });
  const page = await browser.newPage();
  await page.goto(process.env.CAMERA_DASHBOARD_URL);

  //login
  await page.type("#login_user", process.env.CAMERA_DASHBOARD_LOGIN);
  await page.type("#login_psw", process.env.CAMERA_DASHBOARD_PASSWORD);
  await page.click(
    "#login > div.login-container > div > div.i-nothing.login-inputbox.fn-clear > form > div.ui-button-box.login-btnbox > a:nth-child(1)"
  );
  //settings
  await page.waitForTimeout(elementInteractionTimeout);
  await page.click("#sys_main > li:nth-child(4)");

  //block and allow list
  await page.waitForTimeout(elementInteractionTimeout);
  await page.click("#set-menu > li:nth-child(1) > ul > li:nth-child(5)");

  //allowlist
  await page.waitForTimeout(elementInteractionTimeout);
  await page.click("#page_blackWhiteListsConfig > ul > li:nth-child(2)");

  //refresh list
  await page.waitForTimeout(elementInteractionTimeout);
  await page.click(
    "#page_blackWhiteListsConfig > div > div.tab-panel.ui-form.current > div:nth-child(2) > a"
  );

  //get records
  await page.waitForTimeout(elementInteractionTimeout);
  const data = await page.evaluate(async () => {
    const _data = [];
    const recordsCount = document.querySelectorAll(
      "#bw_tab_white_carList_table > div > div.u-table-main > table > tbody tr"
    ).length;
    for (let i = 1; i <= recordsCount; i++) {
      const plate = document
        .querySelector(
          `#bw_tab_white_carList_table > div > div.u-table-main > table > tbody > tr:nth-child(${i}) > td:nth-child(2) > span`
        )
        .innerHTML.trim()
        .toUpperCase();
      _data.push(plate);
    }
    return await new Promise((resolve) => resolve(_data));
  });

  //leave
  await browser.close();

  return data;
};

export const addCustomer = async (user) => {
  const { date, plate, customer } = user;

  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto(process.env.CAMERA_DASHBOARD_URL);

  //login
  await page.type("#login_user", process.env.CAMERA_DASHBOARD_LOGIN);
  await page.type("#login_psw", process.env.CAMERA_DASHBOARD_PASSWORD);
  await page.click(
    "#login > div.login-container > div > div.i-nothing.login-inputbox.fn-clear > form > div.ui-button-box.login-btnbox > a:nth-child(1)"
  );
  //settings
  await page.waitForTimeout(elementInteractionTimeout);
  await page.click("#sys_main > li:nth-child(4)");

  //block and allow list
  await page.waitForTimeout(elementInteractionTimeout);
  await page.click("#set-menu > li:nth-child(1) > ul > li:nth-child(5)");

  //allowlist
  await page.waitForTimeout(elementInteractionTimeout);
  await page.click("#page_blackWhiteListsConfig > ul > li:nth-child(2)");

  //add
  await page.waitForTimeout(elementInteractionTimeout);
  await page.click(
    "#page_blackWhiteListsConfig > div > div.tab-panel.ui-form.current > div:nth-child(9) > a:nth-child(2)"
  );

  //platenumber
  await page.waitForTimeout(elementInteractionTimeout);
  await page.type("#bw_add_plateNumber", plate);

  //cardId
  await page.type("#bw_add_cardID", "1");

  //startDate
  await page.evaluate(() => {
    const input = document.querySelector("#bw_add_beginTime");
    input.readOnly = false;
    input.value = "";
  });
  await page.type("#bw_add_beginTime", convertDate(new Date(date)));

  //endDate
  await page.evaluate(() => {
    const input = document.querySelector("#bw_add_cancelTime");
    input.readOnly = false;
    input.value = "";
  });
  await page.type(
    "#bw_add_cancelTime",
    convertDate(new Date(date).setDate(new Date(date).getDate() + 7))
  );

  //vehicleOwner
  await page.type("#bw_add_masterOfCar", customer);

  //save
  await page.click("#bw_add_plateNumber");
  await page.waitForTimeout(elementInteractionTimeout);
  await page.click("#bw_add_content > div.u-dialog-foot > a:nth-child(2)");

  //leave
  await browser.close();
};

export const addMultipleCustomers = async (users = []) => {
  const browser = await puppeteer.launch({
    // headless: false,
  });
  const page = await browser.newPage();
  await page.goto(process.env.CAMERA_DASHBOARD_URL);

  //login
  await page.type("#login_user", process.env.CAMERA_DASHBOARD_LOGIN);
  await page.type("#login_psw", process.env.CAMERA_DASHBOARD_PASSWORD);
  await page.click(
    "#login > div.login-container > div > div.i-nothing.login-inputbox.fn-clear > form > div.ui-button-box.login-btnbox > a:nth-child(1)"
  );
  //settings
  await page.waitForTimeout(elementInteractionTimeout);
  await page.click("#sys_main > li:nth-child(4)");

  //block and allow list
  await page.waitForTimeout(elementInteractionTimeout);
  await page.click("#set-menu > li:nth-child(1) > ul > li:nth-child(5)");

  //allowlist
  await page.waitForTimeout(elementInteractionTimeout);
  await page.click("#page_blackWhiteListsConfig > ul > li:nth-child(2)");

  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    //add btn
    await page.waitForTimeout(elementInteractionTimeout);
    await page.click(
      "#page_blackWhiteListsConfig > div > div.tab-panel.ui-form.current > div:nth-child(9) > a:nth-child(2)"
    );

    //platenumber
    await page.waitForTimeout(elementInteractionTimeout);
    await page.evaluate(() => {
      const input = document.querySelector("#bw_add_plateNumber");
      input.value = "";
    });
    await page.type("#bw_add_plateNumber", user.plate);

    //cardId
    await page.evaluate(() => {
      const input = document.querySelector("#bw_add_cardID");
      input.value = "";
    });
    await page.type(
      "#bw_add_cardID",
      Math.ceil(420 + Math.random() * 1000).toString()
    );

    //startDate
    await page.evaluate(() => {
      const input = document.querySelector("#bw_add_beginTime");
      input.readOnly = false;
      input.value = "";
    });
    await page.type("#bw_add_beginTime", convertDate(new Date(user.date)));

    //endDate
    await page.evaluate(() => {
      const input = document.querySelector("#bw_add_cancelTime");
      input.readOnly = false;
      input.value = "";
    });
    await page.type(
      "#bw_add_cancelTime",
      convertDate(
        new Date(user.date).setDate(new Date(user.date).getDate() + 7)
      )
    );

    //vehicleOwner
    await page.evaluate(() => {
      const input = document.querySelector("#bw_add_masterOfCar");
      input.value = "";
    });
    await page.type(
      "#bw_add_masterOfCar",
      user.customer.replace(/[^\w ]/g, "")
    );

    //save
    await page.click("#bw_add_plateNumber");
    await page.waitForTimeout(elementInteractionTimeout);
    await page.click("#bw_add_content > div.u-dialog-foot > a:nth-child(2)");
    await page.waitForTimeout(elementInteractionTimeout * 2);
    await page.click("#bw_add_content > div.u-dialog-foot > a:nth-child(1)");
  }

  //leave
  await browser.close();
};
