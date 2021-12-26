const { By } = require('selenium-webdriver');
const BasePage = require('./basePage');

class StartPage extends BasePage {
  get findInput() {
    return By.xpath('//input[@aria-label="Search"]');
  }

  async start() {
    await super.start();
  }

  async open() {
    await super.open('https://cloud.google.com/');
  }
}

module.exports = StartPage;
