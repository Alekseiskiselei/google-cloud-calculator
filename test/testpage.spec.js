const { expect } = require('chai');

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

  const searchText = 'Google Cloud Platform Pricing Calculator';
  const emailCreatorURL = 'https://yopmail.com/en/';
  const numberOfInstances = '4';

  before(async function () {
    await startPage.start();
    await startPage.open();
    await startPage.enterTextAndSend(startPage.findInput, searchText);

    await searchResultPage.click(searchResultPage.chooseSearchResult);

    await calcPage.switchToFrame(calcPage.switchFirstFrame);
    await calcPage.switchToFrame(calcPage.switchSecondFrame);
    await calcPage.changeWait();
    await calcPage.enterText(calcPage.defineNumberOfInstances, numberOfInstances);
    await calcPage.selectDropdownList(calcPage.chooseOperatingSystem, calcPage.selectFirstOption);
    await calcPage.selectDropdownList(calcPage.chooseSeries, calcPage.selectN1Series);
    await calcPage.selectDropdownList(calcPage.chooseMachineType, calcPage.selectN1S8Type);
    await calcPage.click(calcPage.addGPU);
    await calcPage.selectDropdownList(calcPage.chooseGPUType, calcPage.selectV100);
    await calcPage.selectDropdownList(calcPage.chooseNumberOfGPUs, calcPage.selectOneGPU);
    await calcPage.selectDropdownList(calcPage.chooselocalSSD, calcPage.selectSize);
    await calcPage.selectDropdownList(calcPage.chooseDatacenterLocation, calcPage.selectFrankfurt);
    await calcPage.selectDropdownList(calcPage.chooseUsageTerm, calcPage.selectOneYear);
    await calcPage.click(calcPage.addToEstimate);
  });

  it('should final VM class correspond selected VM class', async function () {
    const vmClass = await calcPage.findDataToCompare(calcPage.showVMClass);
    expect(vmClass).to.be.include('regular');
  });

  it('should final Instance type correspond selected Instance type', async function () {
    const type = await calcPage.findDataToCompare(calcPage.showType);
    expect(type).to.be.include('n1-standard-8');
  });

  it('should final Region correspond selected Region', async function () {
    const region = await calcPage.findDataToCompare(calcPage.showRegion);
    expect(region).to.be.include('Frankfurt');
  });

  it('should final Local SSD correspond selected Local SSD', async function () {
    const ssd = await calcPage.findDataToCompare(calcPage.showSSD);
    expect(ssd).to.be.include('2x375 GiB');
  });

  it('should final commitment term correspond selected commitment term', async function () {
    const term = await calcPage.findDataToCompare(calcPage.showTerm);
    expect(term).to.be.include('1 Year');
  });

  it('should final Total estimated cost per one month correspond cost recieved with manual testing', async function () {
    const cost = await calcPage.findDataToCompare(calcPage.showCost);
    expect(cost).to.be.include('USD 1,082.77');
  });

  it('should total cost shown in calculator coincide with cost shown in letter', async function () {
    const calculatorCost = await calcPage.findDataToCompare(calcPage.showCost);
    await calcPage.click(calcPage.emailEstimate);
    const parentWindow = await calcPage.makeWindowHandle();
    await calcPage.openNewWindow(emailCreatorURL);

    await emailCreator.click(emailCreator.makeRandomEmail);
    const childWindow = await emailCreator.makeWindowHandle();
    await createdEmailPage.click(createdEmailPage.copyEmail);

    await createdEmailPage.switchToWindow(parentWindow);
    await calcPage.switchToFrame(calcPage.switchFirstFrame);
    await calcPage.switchToFrame(calcPage.switchSecondFrame);
    await calcPage.pasteText(calcPage.findEmailInput);
    await calcPage.click(calcPage.sendMailBtn);
    await calcPage.switchToWindow(childWindow);
    await createdEmailPage.pause();
    await createdEmailPage.click(createdEmailPage.checkInboxBtn);

    await finalPage.switchToFrame(finalPage.switchFinalFrame);
    const emailCost = await finalPage.findDataToCompare(finalPage.showFinalCost);
    expect(calculatorCost).to.be.include(emailCost);
  });

  after(async function () {
    await finalPage.finish();
  });
});
