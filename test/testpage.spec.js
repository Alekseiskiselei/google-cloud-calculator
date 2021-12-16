const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');
const driver = new Builder().forBrowser('chrome').build();

const StartPage = require('../pages/startPage');
const SearchResultPage = require('../pages/searchResultPage');
const CalcPage = require('../pages/calcPage');
const EmailCreator = require('../pages/emailCreatorPage');
const CreatedEmailPage = require('../pages/createdEmailPage');
const FinalPage = require('../pages/finalPage');

describe('Google cloud catculator test project', async function () {
  const startPage = new StartPage();
  const searchResultPage = new SearchResultPage();
  const calcPage = new CalcPage();
  const emailCreator = new EmailCreator();
  const createdEmailPage = new CreatedEmailPage();
  const finalPage = new FinalPage();

  const googleCloudURL = 'https://cloud.google.com/';
  const searchText = 'Google Cloud Platform Pricing Calculator';
  const emailCreatorURL = 'https://yopmail.com/en/';
  const numberOfInstances = '4';

  before(async function () {
    await driver.get(googleCloudURL);
    await driver.manage().window().maximize();
    await driver.manage().setTimeouts({ implicit: 10000 });

    await driver.findElement(startPage.findInput).click();
    await driver.findElement(startPage.findInput).sendKeys(searchText, Key.RETURN);
    await driver.findElement(searchResultPage.chooseSearchResult).click();

    await driver.switchTo().frame(await driver.findElement(calcPage.switchFirstFrame));
    await driver.switchTo().frame(await driver.findElement(calcPage.switchSecondFrame));
    await driver.manage().setTimeouts({ implicit: 0 });
    await driver.findElement(calcPage.defineNumberOfInstances).click();
    await driver.findElement(calcPage.defineNumberOfInstances).sendKeys(numberOfInstances);

    await driver.findElement(calcPage.chooseOperatingSystem).click();
    await driver.findElement(calcPage.selectFirstOption).click();

    await driver.findElement(calcPage.chooseSeries).click();
    await driver.wait(until.elementIsVisible(await driver.findElement(calcPage.selectN1Series)));
    await driver.findElement(calcPage.selectN1Series).click();

    await driver.findElement(calcPage.chooseMachineType).click();
    await driver.wait(until.elementIsVisible(await driver.findElement(calcPage.selectN1S8Type)));
    await driver.findElement(calcPage.selectN1S8Type).click();

    await driver.findElement(calcPage.addGPU).click();
    await driver.findElement(calcPage.chooseGPUType).click();
    await driver.wait(until.elementIsVisible(await driver.findElement(calcPage.selectV100)));
    await driver.findElement(calcPage.selectV100).click();

    await driver.findElement(calcPage.chooseNumberOfGPUs).click();
    await driver.wait(until.elementIsVisible(await driver.findElement(calcPage.selectOneGPU)));
    await driver.findElement(calcPage.selectOneGPU).click();

    await driver.findElement(calcPage.chooselocalSSD).click();
    await driver.wait(until.elementLocated(calcPage.selectSize));
    await driver.wait(until.elementLocated(calcPage.selectSize)).click();

    await driver.findElement(calcPage.chooseDatacenterLocation).click();
    await driver.wait(until.elementIsVisible(await driver.findElement(calcPage.selectFrankfurt)));
    await driver.findElement(calcPage.selectFrankfurt).click();

    await driver.findElement(calcPage.chooseUsageTerm).click();
    await driver.wait(until.elementLocated(calcPage.selectOneYear));
    await driver.wait(until.elementLocated(calcPage.selectOneYear)).click();

    await driver.findElement(calcPage.addToEstimate).click();
  });

  it('should final VM class correspond selected VM class', async function () {
    const vmClass = await driver.findElement(calcPage.showVMClass).getText();
    expect(vmClass).to.be.include('regular');
  });

  it('should final Instance type correspond selected Instance type', async function () {
    const type = await driver.findElement(calcPage.showType).getText();
    expect(type).to.be.include('n1-standard-8');
  });

  it('should final Region correspond selected Region', async function () {
    const region = await driver.findElement(calcPage.showRegion).getText();
    expect(region).to.be.include('Frankfurt');
  });

  it('should final Local SSD correspond selected Local SSD', async function () {
    const ssd = await driver.findElement(calcPage.showSSD).getText();
    expect(ssd).to.be.include('2x375 GiB');
  });

  it('should final commitment term correspond selected commitment term', async function () {
    const term = await driver.findElement(calcPage.showTerm).getText();
    expect(term).to.be.include('1 Year');
  });

  it('should final Total estimated cost per one month correspond cost recieved with manual testing', async function () {
    const cost = await driver.findElement(calcPage.showCost).getText();
    expect(cost).to.be.include('USD 1,082.77');
  });

  it('should total cost shown in calculator coincide with cost shown in letter', async function () {
    const calculatorCost = await driver.findElement(calcPage.showCost).getText();
    await driver.findElement(calcPage.emailEstimate).click();

    const parentWindow = await driver.getWindowHandle();
    await driver.switchTo().newWindow('tab');
    await driver.get(emailCreatorURL);

    const childWindow = await driver.getWindowHandle();
    await driver.findElement(emailCreator.makeRandomEmail).click();
    await driver.findElement(createdEmailPage.copyEmail).click();

    await driver.switchTo().window(parentWindow);
    await driver.switchTo().frame(await driver.findElement(calcPage.switchFirstFrame));
    await driver.switchTo().frame(await driver.findElement(calcPage.switchSecondFrame));
    await driver.findElement(calcPage.findEmailInput).click();
    await driver.findElement(calcPage.findEmailInput).sendKeys(Key.CONTROL + 'V');
    await driver.findElement(calcPage.sendMailBtn).click();

    await driver.switchTo().window(childWindow);
    await driver.sleep(7000);

    await driver.findElement(createdEmailPage.checkInboxBtn).click();
    await driver.switchTo().frame(await driver.findElement(finalPage.switchFinalFrame));
    const emailCost = await driver.findElement(finalPage.showFinalCost).getText();
    expect(calculatorCost).to.be.include(emailCost);
  });
});
