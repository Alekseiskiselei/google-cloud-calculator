const { By } = require('selenium-webdriver');

class StartPage {
  get findInput() {
    return By.xpath('//input[@aria-label="Search"]');
  }
}

module.exports = StartPage;
