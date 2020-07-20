import { Given, When, Then } from 'cucumber';
import 'expect-webdriverio';
import sharepointPage from 'src/pageobjects/sharepoint.page';
import Page from 'src/pageobjects/page';
import homePage from 'src/pageobjects/home.page';
import testtaskPage from 'src/pageobjects/testtask.page';

type Pages = Record<string, Page>;

let before, after;

const pages: Pages = {
  home: homePage,
  sharepoint: sharepointPage,
  testtask: testtaskPage,
};

Given(/^I am on the (\w+) page$/, (page) => {
  pages[page].open();
  expect(pages[page].title).toBeDisplayedInViewport();
});

Given(/^I click on "(.*)" button$/, (buttonText) => {
  const elt = $(`=${buttonText}`);
  elt.waitForClickable();
  elt.click();
});

Then(/^I shoulbe be redirected to (\w+) page in new tab$/, (page) => {
  pages[page].title.waitUntil(
    () => {
      return browser.getWindowHandles().length > 1;
    },
    {
      timeout: 5000,
      timeoutMsg: 'expected page opens in new tab with in 5s',
    }
  );
  browser.switchToWindow(browser.getWindowHandles()[1]);
  expect(pages[page].title).toBeDisplayedInViewport();
});

Then(/^I should see a (\w+) page title$/, (page) => {
  expect(pages[page].title).toBeDisplayedInViewport();
});

Given(/^I login to SharePoint with given credentials$/, () => {
  const res = sharepointPage
    .open()
    .login(process.env.SP_USER_NAME, process.env.SP_PASSWORD);
  expect(res).toBeTruthy();
});

When(/^slideshow element is displayed$/, () => {
  testtaskPage.slideShow.waitForDisplayed();
});

When(/^I click on rightarrow button$/, () => {
  testtaskPage.slideshowRighArrow.click();
});

When(/^I wait a bit$/, () => {
  browser.pause(3000);
});

Then(
  /^element with text "(.*)" (is not|is) displayed$/,
  (text: string, condition: string) => {
    condition.includes('not')
      ? expect($(`=${text}`)).not.toBeDisplayed()
      : expect($(`=${text}`)).toBeDisplayed;
  }
);

When(/^I hover on (.*) Tile$/, (tileName: string) => {
  const elt = testtaskPage.tiles.filter((x) =>
    x.getText().toUpperCase().includes(tileName.toUpperCase())
  )[0];
  expect(elt).not.toBeUndefined();
  this.before = browser.takeElementScreenshot(elt.elementId);
  elt.moveTo();
  browser.pause(500);
  this.after = browser.takeElementScreenshot(elt.elementId);
});

Then(/^animation hover is displayed$/, () => {
  expect(this.before).not.toEqual(this.after);
});
