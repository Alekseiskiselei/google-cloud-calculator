const { Builder, By, Key, until } = require('selenium-webdriver');
const driver = new Builder().forBrowser('chrome').build();

class BasePage {
  async start() {
    await driver.manage().window().maximize();
    await driver.manage().setTimeouts({ implicit: 10000 });
  }

  async open(url) {
    await driver.get(url);
  }

  async finish() {
    await driver.quit();
  }

  async click(element) {
    await driver.findElement(element).click();
  }

  async enterTextAndSend(element, text) {
    await driver.findElement(element).click();
    await driver.findElement(element).sendKeys(text, Key.RETURN);
  }

  async enterText(element, text) {
    await driver.findElement(element).click();
    await driver.findElement(element).sendKeys(text);
  }

  async pasteText(element) {
    await driver.findElement(element).click();
    await driver.findElement(element).sendKeys(Key.CONTROL + 'V');
  }

  async selectDropdownList(openDropDown, selectItem) {
    await driver.findElement(openDropDown).click();
    await driver.wait(until.elementLocated(selectItem));
    await driver.wait(until.elementLocated(selectItem)).click();
  }

  async switchToFrame(element) {
    await driver.switchTo().frame(await driver.findElement(element));
  }

  async changeWait() {
    await driver.manage().setTimeouts({ implicit: 0 });
  }

  async findDataToCompare(element) {
    return await driver.findElement(element).getText();
  }

  async pause() {
    await driver.sleep(7000);
  }

  async openNewWindow(url) {
    await driver.switchTo().newWindow('tab');
    await driver.get(url);
  }

  async makeWindowHandle() {
    return await driver.getWindowHandle();
  }

  async switchToWindow(window) {
    await driver.switchTo().window(window);
  }
}

module.exports = BasePage;
